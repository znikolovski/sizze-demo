/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-category-page.js
  var import_category_page_exports = {};
  __export(import_category_page_exports, {
    default: () => import_category_page_default
  });

  // tools/importer/parsers/cards-listing.js
  function parse(element, { document: document2 }) {
    const cells = [];
    let items = Array.from(element.querySelectorAll('ul[data-testid="plp-grid"] > li'));
    if (items.length === 0) {
      items = Array.from(element.querySelectorAll('[data-testid="plp-grid"] li, ul > li'));
    }
    items.forEach((item) => {
      const img = item.querySelector('img[data-testid="product-image"], img');
      const productLink = item.querySelector('a[data-testid="product-link"][href], a[href]');
      const href = productLink ? productLink.getAttribute("href") : null;
      const linkContainer = item.querySelector('[data-testid="link-container"]');
      let nameText = "";
      if (linkContainer) {
        const namePara = linkContainer.querySelector(":scope > p, p");
        if (namePara) nameText = (namePara.textContent || "").replace(/\s+/g, " ").trim();
      }
      const priceEl = item.querySelector('[data-testid="product-price"]');
      const priceText = priceEl ? (priceEl.textContent || "").replace(/\s+/g, " ").trim() : "";
      const ratingEl = item.querySelector('[data-testid="rating-score"]');
      const reviewsEl = item.querySelector('[data-testid="reviews-count"]');
      let ratingText = "";
      if (ratingEl) {
        ratingText = (ratingEl.textContent || "").trim();
        if (reviewsEl) ratingText += ` ${(reviewsEl.textContent || "").trim()}`;
        ratingText = ratingText.replace(/\s+/g, " ").trim();
      }
      const textParts = [];
      if (nameText) {
        const h = document2.createElement("h3");
        if (href) {
          const a = document2.createElement("a");
          a.setAttribute("href", href);
          a.textContent = nameText;
          h.appendChild(a);
        } else {
          h.textContent = nameText;
        }
        textParts.push(h);
      }
      if (priceText) {
        const p = document2.createElement("p");
        p.textContent = priceText;
        textParts.push(p);
      }
      if (ratingText) {
        const p = document2.createElement("p");
        p.textContent = ratingText;
        textParts.push(p);
      }
      if (textParts.length === 0) {
        const promoText = (item.textContent || "").replace(/\s+/g, " ").trim();
        if (promoText) {
          const p = document2.createElement("p");
          p.textContent = promoText;
          textParts.push(p);
        }
      }
      const textCell = textParts.length ? textParts : "";
      const imageCell = img || "";
      if (img || textCell && textCell !== "") cells.push([imageCell, textCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-listing", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/kmart-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        'header[role="banner"]',
        // Homepage saved capture keeps styled-component class but drops role attr.
        'header[class*="Headerstyled"]',
        'nav[data-testid="drawer"]',
        "nav.mainnav",
        'footer[data-testid="page-footer"]',
        "footer.Footerstyled-sc-1pchiw0-0",
        'footer[class*="Footerstyled"]',
        "footer",
        // SEO footer mega-nav: thousands of category links, not page content.
        'div[class*="SeoNavLinks"]',
        'nav[data-testid="pagination"]',
        ".skip-to-content-button"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "script",
        "style",
        "link",
        "noscript",
        "iframe"
      ]);
      const noiseAttrs = [
        "data-testid",
        "data-nimg",
        "data-index",
        "data-key",
        "data-swiper-slide-index",
        "data-source",
        "data-media-type",
        "data-type",
        "data-cnstrc-search-input",
        "data-cnstrc-search-form",
        "onclick"
      ];
      element.querySelectorAll("*").forEach((el) => {
        noiseAttrs.forEach((attr) => {
          if (el.hasAttribute(attr)) el.removeAttribute(attr);
        });
      });
    }
  }

  // tools/importer/transformers/kmart-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      const sections = template && Array.isArray(template.sections) ? template.sections : [];
      if (sections.length < 2) return;
      const doc = element.ownerDocument || document;
      const resolved = sections.map((section) => {
        let el = null;
        if (section.selector) {
          try {
            el = element.querySelector(section.selector);
          } catch (e) {
            el = null;
          }
        }
        return { section, el };
      });
      for (let i = resolved.length - 1; i >= 0; i -= 1) {
        const { section, el } = resolved[i];
        if (!el) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (el.parentNode) {
            el.parentNode.insertBefore(metaBlock, el.nextSibling);
          }
        }
        if (i > 0 && el.parentNode) {
          const hr = doc.createElement("hr");
          el.parentNode.insertBefore(hr, el);
        }
      }
    }
  }

  // tools/importer/import-category-page.js
  var PAGE_TEMPLATE = {
    "name": "category-page",
    "description": "Category product listing page (PLP) with breadcrumbs, category name/description, and a paginated product grid. Same Kmart PLP structure as collection-page; reuses the cards-listing parser.",
    "urls": [
      "https://www.kmart.com.au/category/home-and-living/furniture/"
    ],
    "blocks": [
      {
        "name": "cards-listing",
        "instances": [
          'main div[data-testid="plp-result"]',
          "#mainContent-discovery-ui"
        ]
      }
    ],
    "sections": [
      {
        "id": "sec-plp-header",
        "name": "Listing header",
        "selector": "#__next > div > main > div.full-bleed",
        "style": null,
        "blocks": [],
        "defaultContent": [
          'main nav[aria-label="Breadcrumbs"]',
          'main div[data-testid="plp-header"]'
        ]
      },
      {
        "id": "sec-plp-result",
        "name": "Product listing",
        "selector": "#mainContent-discovery-ui",
        "style": null,
        "blocks": [
          "cards-listing"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "cards-listing": parse
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let elements = [];
        try {
          elements = document2.querySelectorAll(selector);
        } catch (e) {
          console.warn(`Invalid selector for "${blockDef.name}": ${selector}`);
          return;
        }
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_category_page_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_category_page_exports);
})();
