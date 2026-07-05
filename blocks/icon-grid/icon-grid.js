import { decorateIcons } from '../../scripts/aem.js';

/**
 * Icon Grid Block
 * Renders a row of icon + label items, matching the real Kmart homepage's
 * help/services strip (Track my order, Returns & Exchange, Free Delivery,
 * etc.) near the footer.
 *
 * Authoring model: one row per item.
 *   Cell 1: icon name (e.g. "track" — becomes class="icon icon-track")
 *   Cell 2: label text (may include a link)
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'icon-grid-list';

  [...block.children].forEach((row) => {
    const [iconCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'icon-grid-item';

    const iconName = iconCell ? iconCell.textContent.trim() : '';
    if (iconName) {
      const iconWrap = document.createElement('span');
      iconWrap.className = `icon icon-${iconName}`;
      li.append(iconWrap);
    }

    if (labelCell) {
      const link = labelCell.querySelector('a');
      const label = document.createElement('p');
      label.className = 'icon-grid-label';
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        label.append(a);
      } else {
        label.textContent = labelCell.textContent.trim();
      }
      li.append(label);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
  decorateIcons(block);
}
