/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: columns-promo
 * Base block: columns
 * Source instance (authoritative cache): the postcode / delivery banner
 *   div[data-testid="post-code-banner"].postCodeBanner (homepage section 1).
 *   A second homepage instance (a generic Section child) is handled generically.
 * Generated: 2026-06-19
 *
 * Block-library convention (Columns): multiple columns + rows. Row 1 = block
 *   name. Subsequent rows hold one cell per visual column; every row must have
 *   the same number of cells.
 *
 * Source structure (Next.js postcode banner):
 *   div.postCodeBanner
 *     > button.skip-to-content-button         (non-content chrome — skipped;
 *                                              also removed by kmart-cleanup transformer)
 *     > button[data-testid="store-button"]    -> "Shop at <Broadway>"
 *     > button[data-testid="suburb-button"]   -> "Deliver to <sydney 2000>"
 *
 * Each meaningful banner button becomes a column. We extract the icon-adjacent
 *   label text (.banner-text) and the highlighted value (.postcode-text) into a
 *   single paragraph per column so authors get clean, editable text.
 */
export default function parse(element, { document }) {
  // Candidate column sources: the postcode-action buttons (exclude skip link),
  // falling back to direct child elements for the generic homepage instance.
  let columnSources = Array.from(
    element.querySelectorAll(':scope > button.postcode-banner-buttons, :scope > button[data-testid="store-button"], :scope > button[data-testid="suburb-button"]'),
  );

  if (columnSources.length === 0) {
    columnSources = Array.from(element.children).filter(
      (child) => !child.classList || !child.classList.contains('skip-to-content-button'),
    );
  }

  const rowCells = [];

  columnSources.forEach((src) => {
    // Prefer the banner label + highlighted postcode value when present.
    const bannerText = src.querySelector('.banner-text');
    const postcode = src.querySelector('.postcode-text');

    let label = '';
    if (bannerText) {
      // .banner-text holds the prefix text plus a nested .postcode-text value.
      const prefix = Array.from(bannerText.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent)
        .join(' ')
        .trim();
      const value = postcode ? postcode.textContent.trim() : '';
      label = [prefix, value].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
    }
    if (!label) label = (src.textContent || '').replace(/\s+/g, ' ').trim();

    const p = document.createElement('p');
    p.textContent = label;
    rowCells.push(label ? p : '');
  });

  // Empty-block guard.
  if (rowCells.length === 0 || rowCells.every((c) => c === '')) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [rowCells]; // single content row, one cell per column
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
