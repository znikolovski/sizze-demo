/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: cards-listing
 * Base block: cards
 * Source instance (authoritative cache): the PLP result region
 *   div[data-testid="plp-result"] / #mainContent-discovery-ui (collection-page).
 * Generated: 2026-06-19
 *
 * Block-library convention (Cards): 2 columns, multiple rows. Row 1 = block
 *   name. Each subsequent row is one card:
 *     cell 1 = Image (mandatory)
 *     cell 2 = Text content: title (heading), description, optional CTA
 *
 * Source structure (PLP grid — Next.js markup, data-driven):
 *   ul[data-testid="plp-grid"]
 *     > li[data-testid="plp-grid-item"]                 (product tile)
 *         a[data-testid="product-link"][href] > img[data-testid="product-image"]
 *         a[href] > div[data-testid="link-container"]
 *             p (product name)
 *             div[data-testid="product-price"] (price)
 *         div[data-testid="ratings-container"] (rating, optional)
 *     > li[data-testid="plp-grid-advantage-promo-card"] (interspersed promo tile)
 *
 * The grid is data-driven; only the tiles present in the captured DOM are parsed.
 *   Promo tiles (no product image/name) are handled generically: their text is
 *   placed in the text cell with an empty image cell.
 */
export default function parse(element, { document }) {
  const cells = [];

  // All grid tiles (product tiles + interspersed promo tiles).
  let items = Array.from(element.querySelectorAll('ul[data-testid="plp-grid"] > li'));
  if (items.length === 0) {
    items = Array.from(element.querySelectorAll('[data-testid="plp-grid"] li, ul > li'));
  }

  items.forEach((item) => {
    const img = item.querySelector('img[data-testid="product-image"], img');

    // Product link (first product/anchor link in the tile).
    const productLink = item.querySelector('a[data-testid="product-link"][href], a[href]');
    const href = productLink ? productLink.getAttribute('href') : null;

    // Name: the product name paragraph inside the link container.
    const linkContainer = item.querySelector('[data-testid="link-container"]');
    let nameText = '';
    if (linkContainer) {
      const namePara = linkContainer.querySelector(':scope > p, p');
      if (namePara) nameText = (namePara.textContent || '').replace(/\s+/g, ' ').trim();
    }

    // Price.
    const priceEl = item.querySelector('[data-testid="product-price"]');
    const priceText = priceEl ? (priceEl.textContent || '').replace(/\s+/g, ' ').trim() : '';

    // Rating (optional).
    const ratingEl = item.querySelector('[data-testid="rating-score"]');
    const reviewsEl = item.querySelector('[data-testid="reviews-count"]');
    let ratingText = '';
    if (ratingEl) {
      ratingText = (ratingEl.textContent || '').trim();
      if (reviewsEl) ratingText += ` ${(reviewsEl.textContent || '').trim()}`;
      ratingText = ratingText.replace(/\s+/g, ' ').trim();
    }

    // Build the text cell. Heading carries the product link (heading wraps the
    // anchor) so md serializes as "### [name](href)" not a literal "### name".
    const textParts = [];
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
    if (priceText) {
      const p = document.createElement('p');
      p.textContent = priceText;
      textParts.push(p);
    }
    if (ratingText) {
      const p = document.createElement('p');
      p.textContent = ratingText;
      textParts.push(p);
    }

    // Promo / non-product tile fallback: capture its visible text.
    if (textParts.length === 0) {
      const promoText = (item.textContent || '').replace(/\s+/g, ' ').trim();
      if (promoText) {
        const p = document.createElement('p');
        p.textContent = promoText;
        textParts.push(p);
      }
    }

    const textCell = textParts.length ? textParts : '';

    const imageCell = img || '';

    // Only add a card if it has an image or some text.
    if (img || (textCell && textCell !== '')) cells.push([imageCell, textCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-listing', cells });
  element.replaceWith(block);
}
