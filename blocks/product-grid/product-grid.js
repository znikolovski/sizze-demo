import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Product Grid Block
 * Renders a grid of product cards (image, name, price, link).
 * Authoring model: one row per product.
 *   Cell 1: Product image
 *   Cell 2: Product name (may include a link)
 *   Cell 3: Price (text, e.g. "$39.00")
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'product-grid-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [imageCell, nameCell, priceCell] = cells;

    const li = document.createElement('li');
    li.className = 'product-grid-item';

    // Determine link target: prefer an explicit <a> in the name cell
    const existingLink = nameCell ? nameCell.querySelector('a') : null;
    const href = existingLink ? existingLink.href : '#';

    const a = document.createElement('a');
    a.className = 'product-grid-link';
    a.href = href;

    // Image
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '400' }]);
        const imageWrap = document.createElement('div');
        imageWrap.className = 'product-grid-image';
        imageWrap.append(picture);
        a.append(imageWrap);
      }
    }

    // Body: name + price
    const body = document.createElement('div');
    body.className = 'product-grid-body';

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

    a.append(body);
    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
