/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: hero-promo
 * Base block: hero
 * Source instance (authoritative cache): section.half-banner (eofy-landing).
 *   Homepage uses a Next.js MiddleComponent banner instance — handled via
 *   fallback selectors.
 * Generated: 2026-06-19
 *
 * Block-library convention (Hero): 1 column, 3 rows. Row 1 = block name.
 *   Row 2 single cell = background image (optional).
 *   Row 3 single cell = title (heading) + subheading + CTA (optional).
 *
 * Source structure (section.half-banner):
 *   p > img                       (banner image)
 *   p.banner-title                (title)
 *   p.banner-description          (subheading / description)
 *   p > a[href]                   (CTA link)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Background / banner image.
  const img = element.querySelector('img');

  // Title, description, CTA.
  const title = element.querySelector('.banner-title, h1, h2');
  const description = element.querySelector('.banner-description');
  const cta = element.querySelector('a[href]');

  // Empty-block guard: need at least an image, a title, or a CTA.
  if (!img && !title && !cta) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Row 2: background image (only if present).
  if (img) cells.push([img]);

  // Row 3: content cell with heading, description, CTA — all in one cell.
  const contentCell = [];
  if (title) {
    const heading = document.createElement('h2');
    heading.textContent = (title.textContent || '').trim();
    contentCell.push(heading);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = (description.textContent || '').trim();
    contentCell.push(p);
  }
  if (cta) {
    const p = document.createElement('p');
    p.appendChild(cta);
    contentCell.push(p);
  }
  if (contentCell.length) cells.push([contentCell]);

  // OnePass "Supercharge your shop" promo carries an `onepass` modifier so CSS
  // can render it with the purple OnePass background.
  const name = element.classList.contains('onepass') ? 'hero-promo (onepass)' : 'hero-promo';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
