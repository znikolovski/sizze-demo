/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: tabs-trending
 * Base block: tabs
 * Source instance (authoritative cache): div.tab-container (homepage). The
 *   tab-container holds the tab labels; the rendered panel for the active tab is
 *   a following sibling carousel region (data-testid="shop-trending").
 * Generated: 2026-06-19
 *
 * Block-library convention (Tabs): 2 columns, multiple rows. Row 1 = block name.
 *   Each subsequent row is one tab:
 *     cell 1 = Tab label (mandatory)
 *     cell 2 = Tab content (panel shown when selected)
 *
 * Source structure (.tab-container):
 *   h1.product-carousel-title                 (region title — default content)
 *   div[role="tablist"] > button[role="tab"]  (the tab labels)
 * The panel content (active tab only, since the widget is data-driven) lives in
 *   the next sibling region: .ShopTrendingstyled / [data-testid="shop-trending"]
 *   containing a heading/description and a swiper carousel of cards. Inactive
 *   tabs have no statically-rendered panel, so they receive an empty cell.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Tab labels.
  const tabButtons = Array.from(element.querySelectorAll('[role="tablist"] button[role="tab"], button[role="tab"]'));

  // The active tab's panel content is rendered as a sibling region after the
  // tab-container. Locate the nearest following shop-trending widget.
  let panelSource = null;
  let sib = element.nextElementSibling;
  while (sib && !panelSource) {
    panelSource = sib.querySelector
      ? (sib.matches && sib.matches('[data-testid="shop-trending"], .ShopTrendingstyled-sc-11re4qn-0')
        ? sib
        : sib.querySelector('[data-testid="shop-trending"], .ShopTrendingstyled-sc-11re4qn-0'))
      : null;
    sib = sib.nextElementSibling;
  }
  // Fallback: a shop-trending region nested anywhere reachable from the element.
  if (!panelSource && element.parentElement) {
    panelSource = element.parentElement.querySelector('[data-testid="shop-trending"], .ShopTrendingstyled-sc-11re4qn-0');
  }

  const activeIndex = tabButtons.findIndex(
    (b) => b.getAttribute('aria-selected') === 'true' || (b.className || '').includes('Mui-selected'),
  );

  tabButtons.forEach((btn, idx) => {
    const label = (btn.textContent || '').replace(/\s+/g, ' ').trim();
    if (!label) return;

    const labelCell = document.createElement('p');
    labelCell.textContent = label;

    // Content cell: the active tab gets the rendered panel; others get empty.
    let contentCell = '';
    const isActive = idx === activeIndex || (activeIndex === -1 && idx === 0);
    if (isActive && panelSource) {
      contentCell = panelSource;
    }

    cells.push([labelCell, contentCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-trending', cells });
  element.replaceWith(block);
}
