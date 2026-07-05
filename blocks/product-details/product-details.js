/*
 * Product Details Block
 * Renders a product gallery + buy box (price, CTA) + description/features.
 * Authoring model:
 *   Row 1: Gallery images (one cell per image, each containing a picture)
 *   Row 2: Price (text, e.g. "$159")
 *   Row 3: SKU (text)
 *   Row 4: CTA label (text, e.g. "Add to Bag")
 *   Row 5: Description (rich text, may include a heading + list = Features)
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

function buildGallery(cells) {
  const gallery = document.createElement('div');
  gallery.className = 'product-details-gallery';

  const mainWrap = document.createElement('div');
  mainWrap.className = 'product-details-gallery-main';

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'product-details-gallery-thumbs';

  const images = [];
  cells.forEach((cell) => {
    const img = cell.querySelector('img');
    if (img) images.push(img);
  });

  images.forEach((img, i) => {
    const picture = createOptimizedPicture(img.src, img.alt || '', i === 0, [{ width: '750' }]);
    if (i === 0) {
      mainWrap.append(picture);
    }
    const thumbBtn = document.createElement('button');
    thumbBtn.type = 'button';
    thumbBtn.className = 'product-details-thumb';
    if (i === 0) thumbBtn.classList.add('is-active');
    const thumbPic = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '150' }]);
    thumbBtn.append(thumbPic);
    thumbBtn.addEventListener('click', () => {
      mainWrap.textContent = '';
      mainWrap.append(createOptimizedPicture(img.src, img.alt || '', true, [{ width: '750' }]));
      thumbWrap.querySelectorAll('.product-details-thumb').forEach((b) => b.classList.remove('is-active'));
      thumbBtn.classList.add('is-active');
    });
    thumbWrap.append(thumbBtn);
  });

  gallery.append(mainWrap, thumbWrap);
  return gallery;
}

export default function decorate(block) {
  const rows = [...block.children];
  const [galleryRow, priceRow, skuRow, ctaRow, descRow] = rows;

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

  if (skuRow && skuRow.textContent.trim()) {
    const sku = document.createElement('p');
    sku.className = 'product-details-sku';
    sku.textContent = skuRow.textContent.trim();
    buyBox.append(sku);
  }

  if (ctaRow && ctaRow.textContent.trim()) {
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'product-details-cta';
    cta.textContent = ctaRow.textContent.trim();
    buyBox.append(cta);
  }

  if (descRow) {
    const desc = document.createElement('div');
    desc.className = 'product-details-description';
    desc.append(...descRow.childNodes);
    buyBox.append(desc);
  }

  wrapper.append(buyBox);
  block.replaceChildren(wrapper);
}
