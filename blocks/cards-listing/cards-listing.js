import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Product-listing (PLP) variant of the cards block.
 *
 * Renders a paginated, filterable product grid. Authored content is the static
 * scaffold (toolbar labels, an initial set of product tiles, an optional
 * interspersed promo tile, and pagination); the live product data on the source
 * site is populated at runtime from a commerce catalog API. This decoration only
 * structures the authored markup into a grid + body/image cells like the other
 * cards variants.
 *
 * Expected authored structure (per row -> tile):
 *   row > [ image cell ] [ body cell: badges, title, price, CTA ]
 */
export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-listing-card-image';
      else div.className = 'cards-listing-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    // Only optimise EDS-hosted images; external CDN images (Kmart/Contentful)
    // reject EDS query params and would break.
    let local = false;
    try { local = new URL(img.src, window.location.href).origin === window.location.origin; } catch (e) { local = false; }
    if (!local) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
