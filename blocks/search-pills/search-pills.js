import { decorateIcons } from '../../scripts/aem.js';

/**
 * Search Pills Block
 * Renders a horizontal row of rounded pill links with a search icon,
 * matching the real Kmart homepage's "Everyone's looking for" section.
 *
 * Authoring model: one row, each cell is one pill (link text).
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'search-pills-list';

  const cells = block.querySelectorAll(':scope > div > div');
  cells.forEach((cell) => {
    const li = document.createElement('li');
    li.className = 'search-pills-item';
    const link = cell.querySelector('a');
    const a = document.createElement('a');
    a.className = 'search-pills-link';
    a.href = link ? link.href : '#';
    a.innerHTML = `<span>${cell.textContent.trim()}</span><span class="icon icon-search"></span>`;
    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
  decorateIcons(block);
}
