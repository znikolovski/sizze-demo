/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: cards-product
 * Base block: cards
 * Source instances (authoritative cache): section.category-tiles /
 *   section.mosaic-categories (homepage, eofy-landing). Homepage also exposes
 *   Next.js category-tile widgets — handled via fallback selectors.
 * Generated: 2026-06-19
 *
 * Block-library convention (Cards): 2 columns, multiple rows. Row 1 = block
 *   name. Each subsequent row is one card:
 *     cell 1 = Image / icon (mandatory)
 *     cell 2 = Text content: title (heading), optional description, optional CTA
 *
 * Source structure (section.category-tiles):
 *   h2                          (section title — default content, not a card)
 *   ul > li > a[href]
 *     > img[alt]
 *     > (label text node)
 *
 * Each <li> becomes a card: the tile image in cell 1, the tile label (wrapped in
 *   the category link) in cell 2.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Card items: prefer the semantic list items, fall back to common tile wrappers.
  let items = Array.from(element.querySelectorAll(':scope > ul > li'));
  if (items.length === 0) {
    items = Array.from(element.querySelectorAll('ul > li, .category-tile, .mosaic-tile'));
  }

  items.forEach((item) => {
    const link = item.querySelector('a[href]');
    const href = link ? link.getAttribute('href') : null;
    const img = item.querySelector('img');

    // Label text: prefer the link's own text, else the item's text content.
    let label = '';
    if (link) label = (link.textContent || '').trim();
    if (!label) label = (item.textContent || '').trim();
    if (!label && img) label = img.getAttribute('alt') || '';

    // Image cell (cell 1).
    const imageCell = img || '';

    // Text cell (cell 2): label as a heading containing the category link.
    // Heading wraps the anchor (not vice-versa) so md serialization yields
    // "### [label](href)" rather than a link whose text is a literal "### label".
    let textCell = '';
    if (label) {
      const heading = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.textContent = label;
        heading.appendChild(a);
      } else {
        heading.textContent = label;
      }
      textCell = heading;
    }

    // Only add a card if it has an image or a label.
    if (img || label) cells.push([imageCell, textCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
