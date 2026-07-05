import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';

/**
 * Product Grid Block
 * Renders a grid of product cards matching the real Kmart Australia ProductCard
 * component (spec §4.4): image, seller/brand chip, quick-add button, name,
 * price, and an optional star-rating + review-count row.
 *
 * Authoring model: one row per product.
 *   Cell 1: Product image
 *   Cell 2: Product name (may include a link)
 *   Cell 3: Price (text, e.g. "$39.00")
 *   Cell 4 (optional): Seller/brand text (e.g. "Kmart", "anko", "Kmart Target")
 *   Cell 5 (optional): Rating in the format "4.4 (904)" — number before the
 *     space is the star rating, parenthesized number is the review count.
 *
 * Backward compatible with existing 3-cell rows (image, name, price) — cells
 * 4 and 5 simply won't exist and their UI is omitted, matching real-site
 * behavior for products without seller/rating data.
 */

function buildRating(ratingCell) {
  const text = ratingCell ? ratingCell.textContent.trim() : '';
  if (!text) return null;

  const match = text.match(/^([\d.]+)\s*\(([\d,]+)\)/);
  if (!match) return null;

  const [, ratingValue, reviewCount] = match;

  const ratingWrap = document.createElement('div');
  ratingWrap.className = 'product-grid-rating';

  const starsWrap = document.createElement('span');
  starsWrap.className = 'product-grid-stars';
  for (let i = 0; i < 5; i += 1) {
    starsWrap.innerHTML += '<span class="icon icon-star"></span>';
  }
  ratingWrap.append(starsWrap);

  const ratingNum = document.createElement('span');
  ratingNum.className = 'product-grid-rating-value';
  ratingNum.textContent = ratingValue;
  ratingWrap.append(ratingNum);

  const reviews = document.createElement('span');
  reviews.className = 'product-grid-review-count';
  reviews.textContent = `(${reviewCount})`;
  ratingWrap.append(reviews);

  return ratingWrap;
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'product-grid-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [imageCell, nameCell, priceCell, sellerCell, ratingCell] = cells;

    const li = document.createElement('li');
    li.className = 'product-grid-item';

    // Determine link target: prefer an explicit <a> in the name cell
    const existingLink = nameCell ? nameCell.querySelector('a') : null;
    const href = existingLink ? existingLink.href : '#';

    const a = document.createElement('a');
    a.className = 'product-grid-link';
    a.href = href;

    // Image + quick-add button overlay
    const imageWrap = document.createElement('div');
    imageWrap.className = 'product-grid-image';

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '400' }]);
        imageWrap.append(picture);
      }
    }

    const quickAdd = document.createElement('button');
    quickAdd.type = 'button';
    quickAdd.className = 'product-grid-quick-add';
    quickAdd.setAttribute('aria-label', 'Add to bag');
    quickAdd.innerHTML = '<span class="icon icon-plus"></span><span class="product-grid-quick-add-label">Add</span>';
    quickAdd.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    imageWrap.append(quickAdd);

    a.append(imageWrap);

    // Body: seller chip + name + price + rating
    const body = document.createElement('div');
    body.className = 'product-grid-body';

    if (sellerCell && sellerCell.textContent.trim()) {
      const seller = document.createElement('p');
      seller.className = 'product-grid-seller';
      seller.textContent = sellerCell.textContent.trim();
      body.append(seller);
    }

    if (nameCell) {
      const name = document.createElement('p');
      name.className = 'product-grid-name';
      name.textContent = nameCell.textContent.trim();
      body.append(name);
    }

    if (priceCell && priceCell.textContent.trim()) {
      const price = document.createElement('p');
      price.className = 'product-grid-price';
      price.textContent = priceCell.textContent.trim();
      body.append(price);
    }

    const rating = buildRating(ratingCell);
    if (rating) body.append(rating);

    a.append(body);
    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
  decorateIcons(block);
}
