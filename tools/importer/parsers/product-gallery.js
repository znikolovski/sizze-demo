/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: product-gallery
 * Base block: product-gallery (custom — no matching block-library convention,
 *   structure inferred from source HTML)
 * Source instance: section.product-gallery (product-page)
 * Generated: 2026-06-19
 *
 * Source structure:
 *   section.product-gallery
 *     > div.gallery-main > img           (primary/hero image)
 *     > ul.gallery-thumbs > li > img     (thumbnail images)
 *
 * Output: 1-column block. Row 2 = main image. Each subsequent row = one
 *   thumbnail image. Authors may omit the main image or thumbnails; rows are
 *   only added when content is present.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Main / hero image (first cell). Fall back to the first image found.
  const mainImg = element.querySelector('.gallery-main img')
    || element.querySelector(':scope > div img')
    || element.querySelector('img');
  if (mainImg) cells.push([mainImg]);

  // Thumbnail images — one row each, image only.
  const thumbs = Array.from(element.querySelectorAll('.gallery-thumbs img, ul li img'));
  thumbs.forEach((img) => {
    // Avoid re-adding the main image if it also appears in the thumb list.
    if (img !== mainImg) cells.push([img]);
  });

  // Empty-block guard: nothing usable extracted.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'product-gallery', cells });
  element.replaceWith(block);
}
