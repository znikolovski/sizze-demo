/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: accordion-product
 * Base block: accordion
 * Source instances: section.product-description, section.product-delivery,
 *   section.product-reviews (product-page)
 * Generated: 2026-06-19
 *
 * Block-library convention (Accordion): 2 columns, multiple rows. Row 1 is the
 *   block name. Each subsequent row is an accordion item:
 *     cell 1 = Title (the clickable label)
 *     cell 2 = Content (body shown when expanded)
 *
 * Source structure: the instance selectors resolve to one or more sibling
 *   <section> elements, each with a heading (h2) followed by body content
 *   (paragraphs, lists, sub-headings). The parser is invoked per matched
 *   element; each call may receive a single section. We build one accordion row
 *   for the section the parser is given, moving its heading into the title cell
 *   and the remaining content into the content cell.
 */
export default function parse(element, { document }) {
  // Support both: (a) the element being a single product-* section, and
  // (b) the element being a wrapper that contains several such sections.
  let sections = Array.from(
    element.querySelectorAll(':scope > section.product-description, :scope > section.product-delivery, :scope > section.product-reviews'),
  );
  if (sections.length === 0) {
    // The element itself is the section (most common case for these instances).
    sections = [element];
  }

  const cells = [];

  sections.forEach((section) => {
    // Title: the section heading.
    const heading = section.querySelector(':scope > h2, :scope > h3, h2, h3');

    // Content: everything in the section except the title heading.
    const contentCell = [];
    Array.from(section.children).forEach((child) => {
      if (child === heading) return;
      contentCell.push(child);
    });

    // Title cell — fall back to a text label if no heading found.
    const titleCell = heading || document.createTextNode('');

    // Skip a section that has neither a title nor content.
    if (!heading && contentCell.length === 0) return;

    cells.push([titleCell, contentCell.length ? contentCell : '']);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-product', cells });
  element.replaceWith(block);
}
