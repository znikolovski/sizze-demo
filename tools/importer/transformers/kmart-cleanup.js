/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Kmart Australia site-wide DOM cleanup.
 *
 * Removes non-authorable site chrome (sticky header/nav, footer, PLP pagination)
 * and strips Next.js / styled-components / MUI / swiper scaffolding noise so the
 * import contains only page-level authorable content. The header/footer regions
 * are handled by EDS header/footer auto-blocks, so they are removed here.
 *
 * ALL selectors below were verified against the captured DOM in
 *   migration-work/templates/{homepage,collection-page,eofy-landing,product-page}/cleaned.html
 *
 * Explicitly PRESERVED (do NOT remove):
 *   - Postcode / delivery banner ([data-testid="post-code-banner"] / .postCodeBanner)
 *       -> authorable "columns-promo" block (homepage section 1).
 *   - Breadcrumbs (nav[aria-label="Breadcrumbs"], nav.breadcrumbs)
 *       -> authorable defaultContent on collection-page / product-page.
 *   - Carousel tab header (<header class="MuiAppBar-root ...">)
 *       -> lives inside the authorable Tabs/RoundelCarousel widget, NOT site chrome.
 *       This is why we never use the bare `header` selector.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Nothing here blocks block parsing (no modals/overlays/cookie banners were
    // found in the captured DOM). Chrome removal and attribute cleanup happen in
    // afterTransform so parsers can still read <img>/data-* while extracting cells.
  }

  if (hookName === TransformHook.afterTransform) {
    // --- Non-authorable site chrome ---------------------------------------
    // Found in homepage cleaned.html:
    //   <header role="banner" class="Headerstyled-sc-1cx3mhf-1 ... sticky js-enabled">
    //   <nav data-testid="drawer" class="mainnav">
    //   <footer class="Footerstyled-sc-1pchiw0-0 ..." data-testid="page-footer">
    // Found in eofy-landing cleaned.html: bare <footer>
    // Found in collection-page cleaned.html:
    //   <nav aria-label="pagination navigation" data-testid="pagination">
    // NOTE: We target the site header by role/class, NEVER bare `header`, because
    // an authorable MUI carousel tab <header> exists inside content.
    WebImporter.DOMUtils.remove(element, [
      'header[role="banner"]',
      // Homepage saved capture keeps styled-component class but drops role attr.
      'header[class*="Headerstyled"]',
      'nav[data-testid="drawer"]',
      'nav.mainnav',
      'footer[data-testid="page-footer"]',
      'footer.Footerstyled-sc-1pchiw0-0',
      'footer[class*="Footerstyled"]',
      'footer',
      // SEO footer mega-nav: thousands of category links, not page content.
      'div[class*="SeoNavLinks"]',
      'nav[data-testid="pagination"]',
      '.skip-to-content-button',
    ]);

    // --- Scaffolding / noise elements (safe, non-authorable) --------------
    // Stray script/style/link/noscript/iframe rarely survive the scrape but are
    // removed defensively. SVG icons are intentionally left for parsers to handle.
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'link',
      'noscript',
      'iframe',
    ]);

    // --- Attribute cleanup -------------------------------------------------
    // Next.js / styled-components / MUI / swiper / testing attributes. Run after
    // parsing so any parser that relied on these has already executed.
    const noiseAttrs = [
      'data-testid',
      'data-nimg',
      'data-index',
      'data-key',
      'data-swiper-slide-index',
      'data-source',
      'data-media-type',
      'data-type',
      'data-cnstrc-search-input',
      'data-cnstrc-search-form',
      'onclick',
    ];
    element.querySelectorAll('*').forEach((el) => {
      noiseAttrs.forEach((attr) => {
        if (el.hasAttribute(attr)) el.removeAttribute(attr);
      });
    });
  }
}
