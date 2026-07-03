/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import productGalleryParser from './parsers/product-gallery.js';
import productBuyboxParser from './parsers/product-buybox.js';
import accordionProductParser from './parsers/accordion-product.js';
import carouselRailParser from './parsers/carousel-rail.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/kmart-cleanup.js';
import sectionsTransformer from './transformers/kmart-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
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

// PARSER REGISTRY
const parsers = {
  'product-gallery': productGalleryParser,
  'product-buybox': productBuyboxParser,
  'accordion-product': accordionProductParser,
  'carousel-rail': carouselRailParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements = [];
      try {
        elements = document.querySelectorAll(selector);
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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
