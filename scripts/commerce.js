/*
 * Commerce integration utilities, ported from the Adobe Commerce EDS
 * boilerplate (hlxsites/aem-boilerplate-commerce) to work alongside this
 * project's existing scripts.js / aem.js rather than replacing them.
 *
 * Only the functions needed for the Product Details (PDP) drop-in are
 * exercised today; the rest (cart/wishlist helpers, link localization,
 * history tracking) are kept intact for future use since other Commerce
 * blocks in this same upstream project depend on them.
 */
import { getCookie } from '@dropins/tools/lib.js';
import {
  getHeaders,
  getConfigValue,
  getRootPath,
  initializeConfig,
  getListOfRootPaths,
} from '@dropins/tools/lib/aem/configs.js';
import { FetchGraphQL } from '@dropins/tools/fetch-graphql.js';
import {
  getMetadata,
  readBlockConfig,
} from './aem.js';
import initializeDropins from './initializers/index.js';

/**
 * Sanitizes the given string by:
 * - convert to lower case
 * - normalize all unicode characters
 * - replace all non-alphanumeric characters with a dash
 * - remove all consecutive dashes
 * - remove all leading and trailing dashes
 *
 * @param {string} name
 * @returns {string} sanitized name
 */
function sanitizeName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Fetch GraphQL Instances
 */

// Core Fetch GraphQL Instance
export const CORE_FETCH_GRAPHQL = new FetchGraphQL();

// Catalog Service Fetch GraphQL Instance
export const CS_FETCH_GRAPHQL = new FetchGraphQL();

/**
 * Constants
 */

// Environment checks
export const IS_UE = window.location.hostname.includes('ue.da.live');
export const IS_DA = new URL(window.location.href).searchParams.has('dapreview');

/**
 * Product template paths - pages that are templates and should use
 * default/fake SKUs. Should be relative to root path, ie "/" , "/fr/" , etc.
 */
export const PRODUCT_TEMPLATE_PATHS = [
  'products/default',
];

/**
 * Preloads a file with specified attributes
 * @param {string} href - The URL to preload
 * @param {string} as - The type of resource being preloaded
 */
export function preloadFile(href, as) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Notifies dropins about the current loading state.
 * @param {string} event The loading state to notify
 */
async function notifyUI(event) {
  const { events } = await import('@dropins/tools/event-bus.js');
  // skip if the event was already sent
  if (events.lastPayload(`aem/${event}`) === event) return;
  // notify dropins about the current loading state
  const handleEmit = () => events.emit(`aem/${event}`);
  // listen for prerender event
  document.addEventListener('prerenderingchange', handleEmit, { once: true });
  // emit the event immediately
  handleEmit();
}

/**
 * Detects the page type based on DOM elements
 * @returns {string} The detected page type
 */
function detectPageType() {
  if (document.body.querySelector('main .commerce-product-details')) {
    return 'Product';
  } if (document.body.querySelector('main .product-list-page')) {
    return 'Category';
  } if (document.body.querySelector('main .commerce-cart')) {
    return 'Cart';
  } if (document.body.querySelector('main .commerce-checkout')) {
    return 'Checkout';
  }
  return 'CMS';
}

/**
 * Handles commerce-specific page type initialization
 * @param {string} pageType - The detected page type
 */
async function handleCommercePageType(pageType) {
  if (pageType === 'Product') {
    // initialize pdp
    await import('./initializers/pdp.js');
  }
}

/**
 * Loads commerce-specific eager content
 */
export async function loadCommerceEager() {
  const pageType = detectPageType();
  await handleCommercePageType(pageType);

  // notify that the page is ready for eager loading
  await notifyUI('lcp');
}

/**
 * Decorates links in the main element.
 * @param {Element} main - The main element
 */
export function decorateLinks(main) {
  const root = getRootPath();
  const roots = getListOfRootPaths();

  main.querySelectorAll('a').forEach((a) => {
    // If we are in the root, do nothing
    if (roots.length === 0) return;

    try {
      const url = new URL(a.href);
      const {
        origin,
        pathname,
        search,
        hash,
      } = url;

      // Skip localization if #nolocal flag is present
      if (hash === '#nolocal') {
        url.hash = '';
        a.href = url.toString();
        return;
      }

      // if the links belongs to another store, do nothing
      if (roots.some((r) => r !== root && pathname.startsWith(r))) return;

      // If the link is already localized, do nothing
      if (origin !== window.location.origin || pathname.startsWith(root)) return;
      a.href = new URL(`${origin}${root}${pathname.replace(/^\//, '')}${search}${hash}`);
    } catch {
      console.warn('Could not make localized link');
    }
  });
}

/**
 * Loads commerce-specific lazy content
 */
export async function loadCommerceLazy() {
  // Track history (best-effort; no-op if consent helper says no)
  trackHistory();
}

/**
 * Initializes commerce configuration
 */
export async function initializeCommerce() {
  // Initialize Config
  initializeConfig(await getConfigFromSession());

  // Set Fetch GraphQL (Core)
  CORE_FETCH_GRAPHQL.setEndpoint(getConfigValue('commerce-core-endpoint') || await getConfigValue('commerce-endpoint'));
  CORE_FETCH_GRAPHQL.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('all') }));

  // Set Fetch GraphQL (Catalog Service)
  CS_FETCH_GRAPHQL.setEndpoint(await commerceEndpointWithQueryParams());
  CS_FETCH_GRAPHQL.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  return initializeDropins();
}

/**
 * Decorates links.
 * @param {string} [link] url to be localized
 * @returns {string} - The localized link
 */
export function rootLink(link) {
  const root = getRootPath().replace(/\/$/, '');

  // If the link is already localized, do nothing
  if (link.startsWith(root)) return link;
  return `${root}${link}`;
}

/**
 * Fetches and merges placeholder data from multiple sources with intelligent caching.
 *
 * @param {string} [path] - Optional path to a specific placeholders file to include in the merge.
 * @returns {Promise<Object>} A promise that resolves the merged placeholders object.
 */
export async function fetchPlaceholders(path) {
  const rootPath = getRootPath();
  const fallback = getMetadata('placeholders');
  window.placeholders = window.placeholders || {};

  window.placeholders._pending = window.placeholders._pending || {};
  window.placeholders._merged = window.placeholders._merged || {};

  if (!path) {
    return Promise.resolve(window.placeholders._merged || {});
  }

  const cacheKey = [path, fallback].filter(Boolean).join('|');

  if (!cacheKey) {
    return Promise.resolve({});
  }

  if (window.placeholders._pending[cacheKey]) {
    return window.placeholders._pending[cacheKey];
  }

  const fetchPromise = new Promise((resolve) => {
    const promises = [];

    const getOrCreateFetch = (url, resourceCacheKey) => {
      if (window.placeholders[resourceCacheKey]) {
        return Promise.resolve(window.placeholders[resourceCacheKey]);
      }

      if (window.placeholders._pending[resourceCacheKey]) {
        return window.placeholders._pending[resourceCacheKey];
      }

      // Single-sheet DA documents (our placeholders/*.html sheets) are served
      // at the bare `<path>.json` — appending `?sheet=data` 404s even though
      // the sheet's own internal tab is named "data". The `?sheet=<name>`
      // query param is only for multi-sheet workbooks with more than one tab.
      const resourceFetchPromise = fetch(url, { cache: 'force-cache' }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          window.placeholders[resourceCacheKey] = data;
          return data;
        }
        console.warn(`Failed to fetch placeholders from ${url}: HTTP ${response.status} ${response.statusText}`);
        return {};
      }).catch((error) => {
        console.error(`Error fetching placeholders from ${url}:`, error);
        return {};
      }).finally(() => {
        delete window.placeholders._pending[resourceCacheKey];
      });

      window.placeholders._pending[resourceCacheKey] = resourceFetchPromise;
      return resourceFetchPromise;
    };

    if (path) {
      const pathUrl = rootPath.replace(/\/$/, `/${path}`);
      promises.push(getOrCreateFetch(pathUrl, path));
    }

    if (fallback) {
      promises.push(getOrCreateFetch(fallback, fallback));
    }

    Promise.all(promises)
      .then((jsons) => {
        const hasData = jsons.some((json) => json.data?.length > 0);
        if (!hasData) {
          console.warn(`No placeholder data found for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`);
          resolve({});
          return;
        }

        const data = {};

        jsons.forEach((json) => {
          if (json.data?.length) {
            json.data.forEach(({ Key, Value }) => {
              if (Key && Value !== undefined) {
                data[Key] = Value;
              }
            });
          }
        });

        if (Object.keys(data).length === 0) {
          console.warn(`No valid placeholder data found after processing for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`);
          resolve({});
          return;
        }

        const placeholders = {};

        Object.entries(data).forEach(([Key, Value]) => {
          const keys = Key.split('.');
          const lastKey = keys.pop();
          let target = placeholders;

          keys.forEach((key) => {
            target[key] = target[key] || {};
            target = target[key];
          });

          target[lastKey] = Value;
        });

        const merged = Object.assign(window.placeholders._merged, placeholders);

        resolve(merged);
      })
      .catch((error) => {
        console.error(`Error loading placeholders for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`, error);
        resolve({});
      });
  });

  window.placeholders._pending[cacheKey] = fetchPromise;

  fetchPromise.finally(() => {
    delete window.placeholders._pending[cacheKey];
  });

  return fetchPromise;
}

/**
 * Fetches config from remote and saves in session, then returns it, otherwise
 * returns if it already exists.
 *
 * @returns {Promise<Object>} - The config JSON from session storage
 */
export async function getConfigFromSession() {
  const configURL = `${window.location.origin}/config.json`;

  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (
      !parsedConfig[':expiry']
      || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)
    ) {
      throw new Error('Config expired');
    }
    return parsedConfig;
  } catch (e) {
    const config = await fetch(configURL);
    if (!config.ok) throw new Error('Failed to fetch config');
    const configJSON = await config.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    return configJSON;
  }
}

/**
 * Creates a short hash from an object by sorting its entries and hashing them.
 * @param {Object} obj - The object to hash
 * @param {number} [length=5] - Length of the resulting hash
 * @returns {string} A short hash string
 */
function createHashFromObject(obj, length = 5) {
  const objString = Object.entries(obj)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');

  return objString
    .split('')
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 2147483647, 0)
    .toString(36)
    .slice(0, length);
}

/**
 * Creates a commerce endpoint URL with query parameters including a cache-busting hash.
 * @returns {Promise<URL>} A promise that resolves to the endpoint URL with query parameters
 */
export async function commerceEndpointWithQueryParams() {
  const urlWithQueryParams = new URL(getConfigValue('commerce-endpoint'));
  const headers = getHeaders('cs');
  const shortHash = createHashFromObject(headers);
  urlWithQueryParams.searchParams.append('cb', shortHash);
  return urlWithQueryParams;
}

/**
 * Extracts the SKU from the current URL path.
 * @returns {string|null} The SKU extracted from the URL, or null if not found
 */
function getSkuFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/products\/[\w|-]+\/([\w|-]+)$/);
  return result?.[1];
}

/**
 * Extracts the defaultSku property from the product-details block element.
 * @returns {string|null} The defaultSku value from the block, or null if not found
 */
function getDefaultSkuFromBlock() {
  const productDetailsBlock = document.querySelector('.commerce-product-details.block');
  if (!productDetailsBlock) {
    console.warn('No commerce-product-details block found');
    return null;
  }

  const config = readBlockConfig(productDetailsBlock);
  if (!config.defaultsku) {
    console.warn('No defaultSku found in commerce-product-details block');
    return null;
  }
  return config.defaultsku;
}

/**
 * Checks if the current page is a product template page.
 * @returns {boolean} True if the current page matches a product template path
 */
export function isProductTemplate() {
  const root = getRootPath();
  const { pathname } = window.location;

  return PRODUCT_TEMPLATE_PATHS.some((templatePath) => {
    const fullPath = root ? `${root}${templatePath}` : templatePath;
    return pathname === fullPath || pathname === fullPath.replace(/\/$/, '');
  });
}

export function getProductLink(urlKey, sku) {
  if (!urlKey) {
    console.warn('getProductLink: urlKey is missing or empty', { urlKey, sku });
  }
  if (!sku) {
    console.warn('getProductLink: sku is missing or empty', { urlKey, sku });
  }
  const sanitizedUrlKey = urlKey ? sanitizeName(urlKey) : '';
  const sanitizedSku = sku ? sanitizeName(sku) : '';
  return rootLink(`/products/${sanitizedUrlKey}/${sanitizedSku}`);
}

/**
 * Gets the product SKU from metadata or URL fallback.
 * @returns {string|null} The SKU from metadata or URL, or null if not found
 */
export function getProductSku() {
  if (isProductTemplate() && (IS_UE || IS_DA)) {
    return getDefaultSkuFromBlock();
  }

  return getMetadata('sku') || getSkuFromUrl() || getDefaultSkuFromBlock();
}

/**
 * Extracts option UIDs from the URL search parameters.
 * @returns {string[]|undefined} Array of option UIDs, or undefined if not found
 */
export function getOptionsUIDsFromUrl() {
  return new URLSearchParams(window.location.search).get('optionsUIDs')?.split(',');
}

/**
 * Tracks user browsing and purchase history for recommendations.
 * Stores product view history and purchase history in localStorage.
 * No-op in this project: Adobe Client Data Layer is not wired up yet.
 */
function trackHistory() {
  // Intentionally not implemented: this project has not integrated the
  // Adobe Client Data Layer (acdl). Wire this up if/when that lands.
}

/**
 * Sets JSON-LD structured data in the document head.
 * @param {Object} data - The JSON-LD data object
 * @param {string} name - The name identifier for the script element
 */
export function setJsonLd(data, name) {
  const existingScript = document.head.querySelector(`script[data-name="${name}"]`);
  if (existingScript) {
    existingScript.innerHTML = JSON.stringify(data);
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';

  script.innerHTML = JSON.stringify(data);
  script.dataset.name = name;
  document.head.appendChild(script);
}

/**
 * Loads and displays an error page (e.g., 418) by replacing the current page
 * content. If the code is a 404, we redirect to a non-existant page which
 * causes the 404.html from this repo to be loaded.
 * @param {number} [code=404] - The HTTP error code for the error page
 */
export async function loadErrorPage(code = 404) {
  if (code === 404) {
    window.location.replace('/notfound');
    return;
  }
  const htmlText = await fetch(`/${code}.html`).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error(`Error getting ${code} page`);
  });
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  document.body.innerHTML = doc.body.innerHTML;
  document.head.querySelectorAll('style[data-dropin]').forEach((style) => {
    doc.head.appendChild(style);
  });
  document.head.innerHTML = doc.head.innerHTML;

  const notImportMap = (c) => c.textContent && c.type !== 'importmap';
  Array.from(document.head.querySelectorAll('script'))
    .filter(notImportMap)
    .forEach((c) => c.remove());
  Array.from(doc.head.querySelectorAll('script'))
    .filter(notImportMap)
    .forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(({ name, value }) => {
        newScript.setAttribute(name, value);
      });
      const scriptText = document.createTextNode(oldScript.innerHTML);
      newScript.appendChild(scriptText);
      document.head.appendChild(newScript);
    });
}

/**
 * Checks if the user is authenticated
 * @returns {boolean} - true if the user is authenticated
 */
export function checkIsAuthenticated() {
  return !!getCookie('auth_dropin_user_token') ?? false;
}

/**
 * Check if consent was given for a specific topic.
 * @param {*} topic Topic identifier
 * @returns {boolean} True if consent was given
 */
export function getConsent(_topic) {
  return true;
}
