/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPromoParser from './parsers/hero-promo.js';
import carouselRailParser from './parsers/carousel-rail.js';
import cardsProductParser from './parsers/cards-product.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/kmart-cleanup.js';
import sectionsTransformer from './transformers/kmart-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
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

// PARSER REGISTRY
const parsers = {
  'hero-promo': heroPromoParser,
  'carousel-rail': carouselRailParser,
  'cards-product': cardsProductParser,
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
