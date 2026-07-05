/*
 * Product Details Block
 * Renders a product gallery + buy box (price, rating, SKU, online-only tag,
 * CTA + wishlist, sold-and-shipped-by module) + description/features, matching
 * the real Kmart Australia product-detail page (spec §5).
 *
 * Authoring model:
 *   Row 1: Gallery images (one cell per image, each containing a picture)
 *   Row 2: Price (text, e.g. "$159")
 *   Row 3: SKU (text, e.g. "SKU : P_110068089")
 *   Row 4: CTA label (text, e.g. "Add to Bag")
 *   Row 5: Description (rich text, may include a heading + list = Features)
 *   Row 6 (optional): Rating in the format "4.4 (904)" — if absent, defaults
 *     to the real-site zero-state "0 Stars (0)".
 */
import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';

function buildGallery(cells) {
  const gallery = document.createElement('div');
  gallery.className = 'product-details-gallery';

  const images = [];
  cells.forEach((cell) => {
    const img = cell.querySelector('img');
    if (img) images.push(img);
  });

  images.forEach((img, i) => {
    const picture = createOptimizedPicture(img.src, img.alt || '', i === 0, [{ width: '750' }]);
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'product-details-gallery-item';
    if (i === 0) item.classList.add('is-active');
    if (i === 0) item.classList.add('product-details-gallery-main-item');
    item.setAttribute('role', 'radio');
    item.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
    item.setAttribute('aria-label', `Image ${i + 1} of ${images.length}`);
    item.append(picture);
    item.addEventListener('click', () => {
      gallery.querySelectorAll('.product-details-gallery-item').forEach((el) => {
        el.classList.remove('is-active');
        el.setAttribute('aria-checked', 'false');
      });
      item.classList.add('is-active');
      item.setAttribute('aria-checked', 'true');
    });
    gallery.append(item);
  });

  return gallery;
}

function buildRating(ratingRow) {
  const text = ratingRow ? ratingRow.textContent.trim() : '';
  const match = text.match(/^([\d.]+)\s*\(([\d,]+)\)/);

  const ratingWrap = document.createElement('div');
  ratingWrap.className = 'product-details-rating';

  if (match) {
    const [, ratingValue, reviewCount] = match;
    const starsWrap = document.createElement('span');
    starsWrap.className = 'product-details-stars';
    for (let i = 0; i < 5; i += 1) {
      starsWrap.innerHTML += '<span class="icon icon-star"></span>';
    }
    ratingWrap.append(starsWrap);

    const ratingNum = document.createElement('span');
    ratingNum.className = 'product-details-rating-value';
    ratingNum.textContent = ratingValue;
    ratingWrap.append(ratingNum);

    const reviews = document.createElement('span');
    reviews.className = 'product-details-review-count';
    reviews.textContent = `(${reviewCount})`;
    ratingWrap.append(reviews);
  } else {
    // Real-site zero-state placeholder (spec §5.3): "0 Stars (0)"
    const zeroState = document.createElement('span');
    zeroState.className = 'product-details-rating-zero';
    zeroState.textContent = '0 Stars (0)';
    ratingWrap.append(zeroState);
  }

  return ratingWrap;
}

export default function decorate(block) {
  const rows = [...block.children];
  const [galleryRow, priceRow, skuRow, ctaRow, descRow, ratingRow] = rows;

  const wrapper = document.createElement('div');
  wrapper.className = 'product-details-wrapper';

  // Gallery
  if (galleryRow) {
    const cells = [...galleryRow.children];
    wrapper.append(buildGallery(cells));
  }

  // Buy box
  const buyBox = document.createElement('div');
  buyBox.className = 'product-details-buybox';

  if (priceRow) {
    const price = document.createElement('p');
    price.className = 'product-details-price';
    price.textContent = priceRow.textContent.trim();
    buyBox.append(price);
  }

  // Rating + SKU row: rating on the left, SKU on the right (spec §5.3/§5.4)
  const infoRow = document.createElement('div');
  infoRow.className = 'product-details-info-row';
  infoRow.append(buildRating(ratingRow));

  if (skuRow && skuRow.textContent.trim()) {
    const sku = document.createElement('p');
    sku.className = 'product-details-sku';
    sku.textContent = skuRow.textContent.trim();
    infoRow.append(sku);
  }
  buyBox.append(infoRow);

  // "Online only" tag (spec §5.5) — always rendered, all migrated products
  // are in-scope for online-only for this demo.
  const onlineOnly = document.createElement('p');
  onlineOnly.className = 'product-details-online-only';
  onlineOnly.innerHTML = '<span class="icon icon-info"></span><span>Online only</span>';
  buyBox.append(onlineOnly);

  // Add to bag + wishlist row
  const ctaRowWrap = document.createElement('div');
  ctaRowWrap.className = 'product-details-cta-row';

  if (ctaRow && ctaRow.textContent.trim()) {
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'product-details-cta-button';
    cta.textContent = ctaRow.textContent.trim();
    ctaRowWrap.append(cta);
  }

  const wishlist = document.createElement('button');
  wishlist.type = 'button';
  wishlist.className = 'product-details-wishlist-button';
  wishlist.setAttribute('aria-label', 'Add to wishlist');
  wishlist.innerHTML = '<span class="icon icon-wishlist"></span>';
  ctaRowWrap.append(wishlist);

  buyBox.append(ctaRowWrap);

  // "Sold and shipped by" module (spec §5.7) — hardcoded to Kmart for now
  const soldBy = document.createElement('div');
  soldBy.className = 'product-details-sold-by';
  soldBy.innerHTML = '<span class="icon icon-delivery"></span><span>Sold and shipped by <a href="/">Kmart</a></span>';
  buyBox.append(soldBy);

  if (descRow) {
    const desc = document.createElement('div');
    desc.className = 'product-details-description';
    desc.append(...descRow.childNodes);
    buyBox.append(desc);
  }

  wrapper.append(buyBox);
  block.replaceChildren(wrapper);
  decorateIcons(block);
}
