/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Kmart Australia section breaks + section metadata.
 *
 * Generic, template-agnostic: reads sections from payload.template.sections
 * (populated from tools/importer/page-templates.json) and, for the matching
 * template, inserts an <hr> section break before every non-first section and a
 * "Section Metadata" block after every section that declares a `style`.
 *
 * Section selectors come from page-templates.json (which were derived from the
 * captured DOM during analysis). Runs in afterTransform only.
 *
 * Templates with 2+ sections: homepage (4), collection-page (2), product-page (3).
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload && payload.template;
    const sections = template && Array.isArray(template.sections) ? template.sections : [];
    if (sections.length < 2) return;

    const doc = element.ownerDocument || document;

    // Resolve the first matching DOM element for each section's selector.
    const resolved = sections.map((section) => {
      let el = null;
      if (section.selector) {
        try {
          el = element.querySelector(section.selector);
        } catch (e) {
          el = null;
        }
      }
      return { section, el };
    });

    // Process in reverse order so insertions do not shift earlier anchors.
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
      const { section, el } = resolved[i];
      if (!el) continue;

      // Section Metadata block after the section element when a style is set.
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        if (el.parentNode) {
          el.parentNode.insertBefore(metaBlock, el.nextSibling);
        }
      }

      // Section break before every section except the first.
      if (i > 0 && el.parentNode) {
        const hr = doc.createElement('hr');
        el.parentNode.insertBefore(hr, el);
      }
    }
  }
}
