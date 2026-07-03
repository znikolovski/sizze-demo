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

  // tools/importer/import-product-page.js
  var import_product_page_exports = {};
  __export(import_product_page_exports, {
    default: () => import_product_page_default
  });

  // tools/importer/parsers/product-gallery.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const mainImg = element.querySelector(".gallery-main img") || element.querySelector(":scope > div img") || element.querySelector("img");
    if (mainImg) cells.push([mainImg]);
    const thumbs = Array.from(element.querySelectorAll(".gallery-thumbs img, ul li img"));
    thumbs.forEach((img) => {
      if (img !== mainImg) cells.push([img]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "product-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/product-buybox.js
  function parse2(element, { document: document2 }) {
    const contentCell = [];
    const badges = element.querySelector(":scope > p.badges");
    const title = element.querySelector(":scope > h1, :scope > h2");
    const price = element.querySelector(":scope > p.price");
    const rating = element.querySelector(":scope > p.rating");
    const variant = element.querySelector(":scope > p.variant");
    const cta = element.querySelector(":scope > p.cta");
    const seller = element.querySelector(":scope > p.seller");
    const fulfilment = element.querySelector(":scope > div.fulfilment, :scope > .fulfilment");
    if (badges) contentCell.push(badges);
    if (title) contentCell.push(title);
    if (price) contentCell.push(price);
    if (rating) contentCell.push(rating);
    if (variant) contentCell.push(variant);
    if (cta) contentCell.push(cta);
    if (seller) contentCell.push(seller);
    if (fulfilment) contentCell.push(fulfilment);
    if (contentCell.length === 0) {
      Array.from(element.children).forEach((child) => contentCell.push(child));
    }
    if (contentCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [[contentCell]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "product-buybox", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-product.js
  function parse3(element, { document: document2 }) {
    let sections = Array.from(
      element.querySelectorAll(":scope > section.product-description, :scope > section.product-delivery, :scope > section.product-reviews")
    );
    if (sections.length === 0) {
      sections = [element];
    }
    const cells = [];
    sections.forEach((section) => {
      const heading = section.querySelector(":scope > h2, :scope > h3, h2, h3");
      const contentCell = [];
      Array.from(section.children).forEach((child) => {
        if (child === heading) return;
        contentCell.push(child);
      });
      const titleCell = heading || document2.createTextNode("");
      if (!heading && contentCell.length === 0) return;
      cells.push([titleCell, contentCell.length ? contentCell : ""]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-rail.js
  function parse4(element, { document: document2 }) {
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

  // tools/importer/import-product-page.js
  var PAGE_TEMPLATE = {
    "name": "product-page",
    "description": "Product detail page (PDP) with image gallery, product title/price, buy box, variant selectors, description, specifications and related products. Grouped by URL pattern (live pages blocked by bot protection).",
    "urls": [
      "https://www.kmart.com.au/product/larvik-1200mm-2-drawer-desk-oakwhite-desks-tables-and-workstations-110068089/",
      "https://www.kmart.com.au/product/stevie-2-drawer-desk-sage-43684298/",
      "https://www.kmart.com.au/product/wharf-2-drawer-desk-43633012/",
      "https://www.kmart.com.au/product/kodu-desk-study-table-2-doors-120w-black-110150018/",
      "https://www.kmart.com.au/product/studymate-vinci-2-drawer-desk-oak-and-white-desks-tables-and-workstations-110068042/",
      "https://www.kmart.com.au/product/advwin-armless-cross-legged-office-chair-swivel-vanity-chair-beige-110011130/",
      "https://www.kmart.com.au/product/boucle-home-office-chair-43228386/",
      "https://www.kmart.com.au/product/artiss-massage-office-chair-executive-computer-gaming-chairs-pu-leather-brown-110063816/",
      "https://www.kmart.com.au/product/alfordson-boucle-office-chair-computer-swivel-armchair-work-adult-kids-green-110077843/",
      "https://www.kmart.com.au/product/alfordson-mesh-office-chair-executive-seat-tilt-fabric-gaming-racing-computer-white-grey-110049636/",
      "https://www.kmart.com.au/product/desk-lamp-black-43573400/",
      "https://www.kmart.com.au/product/cantilever-desk-lamp-white-43029174/",
      "https://www.kmart.com.au/product/anais-table-lamp-43150717/",
      "https://www.kmart.com.au/product/amiri-portable-rechargeable-lamp-43455706/",
      "https://www.kmart.com.au/product/nico-portable-rechargeable-lamp-olive-43556281/"
    ],
    "blocks": [
      {
        "name": "product-gallery",
        "instances": [
          "section.product-gallery"
        ]
      },
      {
        "name": "product-buybox",
        "instances": [
          "section.product-buybox"
        ]
      },
      {
        "name": "accordion-product",
        "instances": [
          "section.product-description",
          "section.product-delivery",
          "section.product-reviews"
        ]
      },
      {
        "name": "carousel-rail",
        "instances": [
          "section.related-products"
        ]
      }
    ],
    "sections": [
      {
        "id": "sec-breadcrumbs",
        "name": "Breadcrumbs",
        "selector": "nav.breadcrumbs",
        "style": null,
        "blocks": [],
        "defaultContent": [
          "nav.breadcrumbs"
        ]
      },
      {
        "id": "sec-product-detail",
        "name": "Product detail",
        "selector": "#mainContent-discovery-ui",
        "style": null,
        "blocks": [
          "product-gallery",
          "product-buybox",
          "accordion-product"
        ],
        "defaultContent": []
      },
      {
        "id": "sec-related",
        "name": "Related products",
        "selector": "section.related-products",
        "style": null,
        "blocks": [
          "carousel-rail"
        ],
        "defaultContent": [
          "section.related-products > h2"
        ]
      }
    ]
  };
  var parsers = {
    "product-gallery": parse,
    "product-buybox": parse2,
    "accordion-product": parse3,
    "carousel-rail": parse4
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
  var import_product_page_default = {
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
  return __toCommonJS(import_product_page_exports);
})();
