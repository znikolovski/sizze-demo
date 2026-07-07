# API Mesh — Bodea Commerce CORS fix

## Why this exists

The Commerce GraphQL endpoint (`https://bodea-com548.adobedemo.com/graphql`)
does not return CORS response headers on its `OPTIONS` preflight when the
request includes the Catalog Service headers our `commerce-product-details`
block sends (`Magento-Store-Code`, `Magento-Store-View-Code`,
`Magento-Website-Code`, `x-api-key`, `Magento-Environment-Id`). Verified via:

```bash
curl -X OPTIONS https://bodea-com548.adobedemo.com/graphql \
  -H "Origin: https://main--sizze-demo--znikolovski.aem.page" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type,magento-environment-id,magento-store-code,magento-store-view-code,magento-website-code,store,x-api-key"
# -> 204 No Content, but NO Access-Control-Allow-* headers in the response
```

Browsers correctly refuse to send the real request without those headers.
API Mesh solves this by sitting in front of the Commerce endpoint: the
browser talks to the mesh (which we control the CORS config for), and the
mesh forwards to Commerce server-to-server (where CORS doesn't apply at
all — it's a browser-only mechanism).

## What's in this folder

`mesh.json` — the mesh configuration:
- One GraphQL source (`BodeaCommerce`) pointing at the real Commerce
  endpoint, with the Catalog Service headers baked in as
  `operationHeaders` — the mesh injects them server-side on every
  forwarded request, so **the front-end no longer needs to send them**.
- A `responseConfig.CORS` block allowlisting our two site origins
  (`.aem.page` preview and `.aem.live` production) explicitly (API Mesh
  does not allow `*` for `origin` — every allowed origin must be listed).

## Why I couldn't deploy this myself

Creating a live mesh from `mesh.json` requires either the `aio` CLI or a
direct authenticated call to
`https://adobe.io/{ORG_ID}/projects/{PROJECT_ID}/workspaces/{WORKSPACE_ID}/meshes`,
both of which need:
1. An Adobe Developer Console **project + workspace** (create one, or
   point at an existing one, in https://developer.adobe.com/console)
2. The API Mesh service subscribed on that workspace
3. OAuth credentials scoped to that workspace

None of that exists in the sandbox this was authored in, and provisioning
it requires a real Adobe org login — the sandbox's `npm install -g
@adobe/aio-cli` cannot complete (limited npm shim, can't resolve the
CLI's real dependency tree), so there is no CLI available here to run the
deploy step even after the Console side is set up.

## Deploy steps (run these yourself, or hand this file to whoever has Adobe Developer Console access)

```bash
npm install -g @adobe/aio-cli
aio login
aio console org select <your-org>
aio console project select <your-project>      # or `aio console project create` first
aio console workspace select <your-workspace>  # or `aio console workspace create` first
aio console workspace api add --service-code GraphqlServiceSDK   # subscribes API Mesh if not already
aio api-mesh:create ./tools/api-mesh/mesh.json
```

The last command prints the mesh endpoint URL
(`https://edge-sandbox-graph.adobe.io/api/<mesh-id>/graphql` or similar —
exact host depends on environment). That URL is what changes in this
project's `config.json`.

## What changes in this project once the mesh URL exists

In `config.json`, replace `commerce-endpoint` (the one the PDP drop-in
uses) with the new mesh URL, and drop the `cs` header group entirely
since the mesh now injects those headers itself:

```diff
   "commerce-core-endpoint": "https://bodea-com548.adobedemo.com/graphql",
-  "commerce-endpoint": "https://bodea-com548.adobedemo.com/graphql",
+  "commerce-endpoint": "https://<your-mesh-endpoint>/graphql",
   "commerce-assets-enabled": false,
   "headers": {
     "all": {
       "Store": "bodea_us"
     },
-    "cs": {
-      "Magento-Store-Code": "bodea_store",
-      "Magento-Store-View-Code": "bodea_us",
-      "Magento-Website-Code": "bodea",
-      "x-api-key": "search_gql",
-      "Magento-Environment-Id": "539925ad-37a7-45a3-8039-02864790c736"
-    }
   },
```

No other code changes needed — `scripts/commerce.js`,
`scripts/initializers/pdp.js`, and `blocks/commerce-product-details/` all
read the endpoint from config, not hardcoded, so pointing `config.json` at
the mesh is the only change required once it's live.

## If you'd rather not stand up API Mesh

The alternative fix is simpler if anyone has admin access to the Bodea
Commerce/Fastly configuration directly: add the missing
`Access-Control-Allow-Origin` / `Access-Control-Allow-Headers` response
headers on the existing `/graphql` endpoint for our origins. Either fix
resolves the same underlying problem; API Mesh is the right call if you
don't have (or don't want to touch) that server-side config, since it
keeps the fix entirely within Adobe I/O infrastructure you already
control.
