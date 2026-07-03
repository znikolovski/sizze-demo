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

  // tools/importer/import-eofy-landing.js
  var import_eofy_landing_exports = {};
  __export(import_eofy_landing_exports, {
    default: () => import_eofy_landing_default
  });

  // tools/importer/parsers/hero-promo.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const img = element.querySelector("img");
    const title = element.querySelector(".banner-title, h1, h2");
    const description = element.querySelector(".banner-description");
    const cta = element.querySelector("a[href]");
    if (!img && !title && !cta) {
      element.replaceWith(...element.childNodes);
      return;
    }
    if (img) cells.push([img]);
    const contentCell = [];
    if (title) {
      const heading = document2.createElement("h2");
      heading.textContent = (title.textContent || "").trim();
      contentCell.push(heading);
    }
    if (description) {
      const p = document2.createElement("p");
      p.textContent = (description.textContent || "").trim();
      contentCell.push(p);
    }
    if (cta) {
      const p = document2.createElement("p");
      p.appendChild(cta);
      contentCell.push(p);
    }
    if (contentCell.length) cells.push([contentCell]);
    const name = element.classList.contains("onepass") ? "hero-promo (onepass)" : "hero-promo";
    const block = WebImporter.Blocks.createBlock(document2, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-rail.js
  function parse2(element, { document: document2 }) {
    const cells = [];
    let items = Array.from(element.querySelectorAll(":scope > ul.product-slides > li"));
    if (items.length === 0) {
      items = Array.from(element.querySelectorAll("ul.product-slides > li, .related-rail > .related-item, .swiper-slide"));
    }
    items.forEach((item) => {
      const link = item.querySelector("a[href]");
      const href = link ? link.getAttribute("href") : null;
      const img = item.querySelector("img");
      const imageCell = img || "";
      const name2 = item.querySelector(".name");
      const price = item.querySelector(".price");
      const seller = item.querySelector(".seller");
      const rating = item.querySelector(".rating");
      const textParts = [];
      const nameText = name2 ? name2.textContent.trim() : img ? img.getAttribute("alt") || "" : "";
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
      if (seller && seller.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = seller.textContent.trim();
        textParts.push(p);
      }
      if (price && price.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = price.textContent.trim();
        textParts.push(p);
      }
      if (rating && rating.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = rating.textContent.trim();
        textParts.push(p);
      }
      const textCell = textParts.length ? textParts : "";
      if (img || Array.isArray(textParts) && textParts.length) {
        cells.push([imageCell, textCell]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const name = element.classList.contains("hero") ? "carousel-rail (hero)" : "carousel-rail";
    const block = WebImporter.Blocks.createBlock(document2, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    let items = Array.from(element.querySelectorAll(":scope > ul > li"));
    if (items.length === 0) {
      items = Array.from(element.querySelectorAll("ul > li, .category-tile, .mosaic-tile"));
    }
    items.forEach((item) => {
      const link = item.querySelector("a[href]");
      const href = link ? link.getAttribute("href") : null;
      const img = item.querySelector("img");
      let label = "";
      if (link) label = (link.textContent || "").trim();
      if (!label) label = (item.textContent || "").trim();
      if (!label && img) label = img.getAttribute("alt") || "";
      const imageCell = img || "";
      let textCell = "";
      if (label) {
        const heading = document2.createElement("h3");
        if (href) {
          const a = document2.createElement("a");
          a.setAttribute("href", href);
          a.textContent = label;
          heading.appendChild(a);
        } else {
          heading.textContent = label;
        }
        textCell = heading;
      }
      if (img || label) cells.push([imageCell, textCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-product", cells });
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

  // tools/importer/import-eofy-landing.js
  var PAGE_TEMPLATE = {
    "name": "eofy-landing",
    "description": "EOFY campaign landing page with banner hero, promotional category tiles and footer.",
    "urls": [
      "https://www.kmart.com.au/eofy/"
    ],
    "blocks": [
      {
        "name": "hero-promo",
        "instances": [
          "section.half-banner"
        ]
      },
      {
        "name": "carousel-rail",
        "instances": [
          "section.product-carousel"
        ]
      },
      {
        "name": "cards-product",
        "instances": [
          "section.mosaic-categories",
          "section.category-tiles"
        ]
      }
    ],
    "sections": [
      {
        "id": "sec-eofy-content",
        "name": "EOFY content",
        "selector": "#__next > div.Layoutstyled-sc-111fio1-0.dfUnQl > div.Sectionstyled__StyledBox-sc-fe2iw2-1.fuKEFf",
        "style": null,
        "blocks": [
          "hero-promo",
          "carousel-rail",
          "cards-product"
        ],
        "defaultContent": [
          "main.eofy-content > h1"
        ]
      }
    ]
  };
  var parsers = {
    "hero-promo": parse,
    "carousel-rail": parse2,
    "cards-product": parse3
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
  var import_eofy_landing_default = {
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
  return __toCommonJS(import_eofy_landing_exports);
})();
