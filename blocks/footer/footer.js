import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-top-band';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);

  const stripe = document.createElement('div');
  stripe.className = 'footer-rainbow-stripe';
  block.append(stripe);

  const copyright = document.createElement('div');
  copyright.className = 'footer-copyright-band';
  copyright.innerHTML = `<div class="footer-copyright-inner">&copy; Kmart ${new Date().getFullYear()}</div>`;
  block.append(copyright);
}
