(() => {
  const SOURCE_BRAND_NAME = 'somaē';

  const BRAND_CONFIG = Object.freeze({
    name: 'somaē',
    descriptor: 'Nutrition Counselling',
    tagline: 'Nutrition that begins with you.',
    digestName: 'somaē Digest',
    favicon: 'assets/somae-favicon.svg'
  });

  const wordmarkBase = 'soma';
  const wordmarkMarkup = (includeDescriptor = true) => `
    <span class="brand-lockup">
      <span class="brand-wordmark" aria-label="${BRAND_CONFIG.name}"><span>${wordmarkBase}</span><span class="brand-accent" aria-hidden="true">e</span></span>
      ${includeDescriptor ? `<span class="brand-descriptor">${BRAND_CONFIG.descriptor}</span>` : ''}
    </span>`;

  const applyBranding = (root = document) => {
    root.querySelectorAll('.brand').forEach((brand) => {
      brand.setAttribute('aria-label', `${BRAND_CONFIG.name} ${BRAND_CONFIG.descriptor} home`);
      brand.innerHTML = wordmarkMarkup(true);
    });

    root.querySelectorAll('[data-brand-wordmark]').forEach((element) => {
      element.innerHTML = wordmarkMarkup(element.getAttribute('data-brand-wordmark') !== 'name-only');
    });

    if (root.title) root.title = root.title.replaceAll(SOURCE_BRAND_NAME, BRAND_CONFIG.name);
    root.querySelectorAll('meta[content], [aria-label]').forEach((element) => {
      const attribute = element.hasAttribute('content') ? 'content' : 'aria-label';
      element.setAttribute(attribute, element.getAttribute(attribute).replaceAll(SOURCE_BRAND_NAME, BRAND_CONFIG.name));
    });
  };

  window.BRAND_CONFIG = BRAND_CONFIG;
  window.brandWordmarkMarkup = wordmarkMarkup;
  window.applyBranding = applyBranding;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyBranding(document), { once: true });
  } else {
    applyBranding(document);
  }
})();
