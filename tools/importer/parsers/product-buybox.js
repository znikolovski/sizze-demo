/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: product-buybox
 * Base block: product-buybox (custom — no matching block-library convention,
 *   structure inferred from source HTML)
 * Source instance: section.product-buybox (product-page)
 * Generated: 2026-06-19
 *
 * Source structure (section.product-buybox):
 *   p.badges            (promo badges, optional)
 *   h1                  (product title, mandatory)
 *   p.price             (price, optional)
 *   p.rating            (rating summary, optional)
 *   p.variant           (selected variant/colour, optional)
 *   p.cta > a           (add-to-bag CTA, optional)
 *   p.seller            (seller line, optional)
 *   div.fulfilment      (delivery / click & collect block, optional)
 *
 * Output: 1-column block. All product detail elements are collected, in source
 *   order, into a single cell so the buybox decoration can read them. Any field
 *   the author omits is simply skipped.
 */
export default function parse(element, { document }) {
  const contentCell = [];

  // Preserve source order: iterate direct children and keep authorable nodes.
  const badges = element.querySelector(':scope > p.badges');
  const title = element.querySelector(':scope > h1, :scope > h2');
  const price = element.querySelector(':scope > p.price');
  const rating = element.querySelector(':scope > p.rating');
  const variant = element.querySelector(':scope > p.variant');
  const cta = element.querySelector(':scope > p.cta');
  const seller = element.querySelector(':scope > p.seller');
  const fulfilment = element.querySelector(':scope > div.fulfilment, :scope > .fulfilment');

  if (badges) contentCell.push(badges);
  if (title) contentCell.push(title);
  if (price) contentCell.push(price);
  if (rating) contentCell.push(rating);
  if (variant) contentCell.push(variant);
  if (cta) contentCell.push(cta);
  if (seller) contentCell.push(seller);
  if (fulfilment) contentCell.push(fulfilment);

  // Fallback: if the known classes were not present, keep all element children.
  if (contentCell.length === 0) {
    Array.from(element.children).forEach((child) => contentCell.push(child));
  }

  // Empty-block guard.
  if (contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [[contentCell]]; // 1 column: one row, one cell holding all elements
  const block = WebImporter.Blocks.createBlock(document, { name: 'product-buybox', cells });
  element.replaceWith(block);
}
