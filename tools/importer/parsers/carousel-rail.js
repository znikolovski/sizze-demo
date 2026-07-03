/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: carousel-rail
 * Base block: carousel
 * Source instance (authoritative cache): section.product-carousel (eofy-landing
 *   / product-page). Also used on homepage (Next.js widget instances) and as the
 *   product-page related-products rail — handled via fallback selectors.
 * Generated: 2026-06-19
 *
 * Block-library convention (Carousel): 2 columns, multiple rows. Row 1 = block
 *   name. Each subsequent row is one slide:
 *     cell 1 = Image (mandatory, image only)
 *     cell 2 = Text content (optional): title (heading), description, CTA link
 *
 * Source structure (section.product-carousel):
 *   h2                                  (rail title — kept as default content, not a slide)
 *   ul.product-slides > li > a[href]
 *     > img
 *     > span.seller, span.name, span.price, span.rating
 *
 * Each <li> becomes a slide. The product image goes in cell 1; the product
 *   name/price/seller/rating text plus the product link go in cell 2.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Slide items: prefer the semantic list, fall back to common rail containers.
  let items = Array.from(element.querySelectorAll(':scope > ul.product-slides > li'));
  if (items.length === 0) {
    items = Array.from(element.querySelectorAll('ul.product-slides > li, .related-rail > .related-item, .swiper-slide'));
  }

  items.forEach((item) => {
    const link = item.querySelector('a[href]');
    const href = link ? link.getAttribute('href') : null;
    const img = item.querySelector('img');

    // Image cell (cell 1) — image only.
    const imageCell = img || '';

    // Text cell (cell 2): name as heading, then price/seller/rating, wrapped so
    // the slide remains clickable when a product link is present.
    const name = item.querySelector('.name');
    const price = item.querySelector('.price');
    const seller = item.querySelector('.seller');
    const rating = item.querySelector('.rating');

    // Heading carries the product link (heading wraps anchor, so md serializes
    // as "### [name](href)" instead of a link with literal "### name" text).
    const textParts = [];
    const nameText = name ? name.textContent.trim() : (img ? (img.getAttribute('alt') || '') : '');
    if (nameText) {
      const h = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.textContent = nameText;
        h.appendChild(a);
      } else {
        h.textContent = nameText;
      }
      textParts.push(h);
    }
    if (seller && seller.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = seller.textContent.trim();
      textParts.push(p);
    }
    if (price && price.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = price.textContent.trim();
      textParts.push(p);
    }
    if (rating && rating.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = rating.textContent.trim();
      textParts.push(p);
    }

    const textCell = textParts.length ? textParts : '';

    // Only add a slide if it has at least an image or text.
    if (img || (Array.isArray(textParts) && textParts.length)) {
      cells.push([imageCell, textCell]);
    }
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Full-width hero rail (homepage top banner) carries a `hero` modifier in the
  // source section; emit it as a block variant so CSS can style it differently.
  const name = element.classList.contains('hero') ? 'carousel-rail (hero)' : 'carousel-rail';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
