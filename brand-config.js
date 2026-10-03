(() => {
  const SOURCE_BRAND_NAME = 'Hōlus Nutrition Counselling';

  const BRAND_CONFIG = Object.freeze({
    name: 'hōlus.',
    formalName: 'Hōlus Nutrition Counselling',
    descriptor: 'Nutrition Counselling',
    tagline: 'Nutrition that begins with you.',
    digestName: 'Hōlus Digest',
    favicon: 'assets/holus-favicon.svg'
  });

  const wordmarkMarkup = (includeDescriptor = true) => `
    <span class="brand-lockup">
      <span class="brand-wordmark" aria-label="${BRAND_CONFIG.name}">${BRAND_CONFIG.name}</span>
      ${includeDescriptor ? `<span class="brand-descriptor">${BRAND_CONFIG.descriptor}</span>` : ''}
    </span>`;

  const applyProjectPageLinks = (root = document) => {
    const projectPath = '/biome-nutrition';
    const isProjectPage = window.location.hostname.endsWith('.github.io')
      && window.location.pathname.startsWith(`${projectPath}/`);

    if (!isProjectPage) return;

    root.querySelectorAll('a[href^="/"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href.startsWith(`${projectPath}/`)) return;
      link.setAttribute('href', `${projectPath}${href}`);
    });
  };

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
      element.setAttribute(attribute, element.getAttribute(attribute).replaceAll(SOURCE_BRAND_NAME, BRAND_CONFIG.formalName));
    });

    applyProjectPageLinks(root);
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
