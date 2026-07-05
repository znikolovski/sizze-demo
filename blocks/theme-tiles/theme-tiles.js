import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Theme Tiles Block
 * Renders a horizontal row of wide lifestyle-image tiles with a label
 * below each, matching the real Kmart homepage's "Create spaces made for
 * living" / themed-category-carousel pattern (spec §3.3).
 *
 * Authoring model: one row per tile.
 *   Cell 1: Image
 *   Cell 2: Label text (may include a link)
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'theme-tiles-list';

  [...block.children].forEach((row) => {
    const [imageCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'theme-tiles-item';

    const existingLink = labelCell ? labelCell.querySelector('a') : null;
    const href = existingLink ? existingLink.href : '#';

    const a = document.createElement('a');
    a.className = 'theme-tiles-link';
    a.href = href;

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '400' }]);
        const imageWrap = document.createElement('div');
        imageWrap.className = 'theme-tiles-image';
        imageWrap.append(picture);
        a.append(imageWrap);
      }
    }

    if (labelCell) {
      const label = document.createElement('p');
      label.className = 'theme-tiles-label';
      label.textContent = labelCell.textContent.trim();
      a.append(label);
    }

    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
