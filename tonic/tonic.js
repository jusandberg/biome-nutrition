const BRAND_NAME = 'hōlus';
const BRAND_DESCRIPTOR = 'Nutrition Counselling';
const shellFrame = document.querySelector('#tonic-site');

function wordmarkMarkup(includeDescriptor = true) {
  return `
    <span class="brand-lockup">
      <span class="brand-wordmark" aria-label="${BRAND_NAME}">${BRAND_NAME}</span>
      ${includeDescriptor ? `<span class="brand-descriptor">${BRAND_DESCRIPTOR}</span>` : ''}
    </span>`;
}

function replaceBrandText(doc) {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    if (node.parentElement?.closest('script, style')) return;
    node.nodeValue = node.nodeValue.replaceAll('somaē', BRAND_NAME);
  });
}

function applyConnectedWho(doc) {
  const who = doc.querySelector('#who');
  if (!who || who.dataset.tonicConnected === 'true') return;

  if (!doc.querySelector('#tonic-who-connected-styles')) {
    const styles = doc.createElement('style');
    styles.id = 'tonic-who-connected-styles';
    styles.textContent = `
      .tonic-who-connected { overflow: hidden; background: var(--white); }
      .tonic-who-connected .tonic-who-heading { margin-bottom: clamp(2.5rem, 5vw, 4.5rem); }
      .tonic-who-connected .tonic-who-heading h2 { max-width: 13ch; }
      .tonic-who-path { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 2rem); margin: 0; padding: 0; list-style: none; }
      .tonic-who-item { position: relative; min-width: 0; }
      .tonic-who-item::after { content: ""; position: absolute; z-index: 0; top: 1.2rem; left: 2.75rem; width: calc(100% + clamp(1rem, 2vw, 2rem) - 2.75rem); height: 1px; background: var(--sage-light); }
      .tonic-who-item:last-child::after { display: none; }
      .tonic-who-icon { position: relative; z-index: 1; display: block; width: 2.45rem; height: 2.45rem; margin-bottom: 1.65rem; padding-right: .35rem; color: var(--ink); background: var(--white); }
      .tonic-who-icon svg { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.45; stroke-linecap: round; stroke-linejoin: round; }
      .tonic-who-icon .accent { stroke: var(--sage); }
      .tonic-who-item p { max-width: 15rem; margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.55; }
      .tonic-who-item strong { color: var(--ink); font-weight: 750; }
      .tonic-who-swipe { display: none; }
      @media (max-width: 900px) {
        .tonic-who-path { grid-template-columns: repeat(3, 1fr); gap: 2.75rem 1.5rem; }
        .tonic-who-item:nth-child(3)::after { display: none; }
        .tonic-who-item:nth-child(4)::before { content: ""; position: absolute; top: -1.4rem; left: 1.2rem; width: 1px; height: 1.35rem; background: var(--sage-light); }
      }
      @media (max-width: 600px) {
        .tonic-who-connected .section-shell { padding-right: 0; }
        .tonic-who-connected .tonic-who-heading { padding-right: var(--gutter); margin-bottom: 1.25rem; }
        .tonic-who-connected .tonic-who-heading h2 { max-width: 11ch; }
        .tonic-who-swipe { display: flex; align-items: center; gap: .45rem; margin: 0 0 1.4rem; color: var(--sage-deep); font: 700 .72rem/1.2 Manrope, sans-serif; letter-spacing: .09em; text-transform: uppercase; }
        .tonic-who-swipe::after { content: "\u2192"; font-size: 1rem; }
        .tonic-who-path { display: flex; gap: 0; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: x mandatory; scrollbar-width: none; padding: .2rem var(--gutter) .8rem 0; }
        .tonic-who-path::-webkit-scrollbar { display: none; }
        .tonic-who-item { flex: 0 0 72vw; max-width: 18rem; min-height: 11.5rem; padding-right: 2rem; scroll-snap-align: start; }
        .tonic-who-item::after { display: block; left: 2.8rem; width: calc(100% - 2.8rem); }
        .tonic-who-item:last-child::after { display: none; }
        .tonic-who-item:nth-child(4)::before { display: none; }
        .tonic-who-icon { width: 2.55rem; height: 2.55rem; margin-bottom: 1.5rem; }
        .tonic-who-item p { max-width: 14rem; font-size: .94rem; }
      }
    `;
    doc.head.append(styles);
  }

  who.dataset.tonicConnected = 'true';
  who.className = 'tonic-who-connected section-pad';
  who.innerHTML = `
    <div class="section-shell">
      <header class="tonic-who-heading">
        <h2 id="who-title">Who I help.</h2>
      </header>
      <div class="tonic-who-swipe" aria-hidden="true">Swipe to explore</div>
      <ul class="tonic-who-path" aria-label="Nutrition support areas">
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="m9 23 11-11m-7-4 11 11M16 5l11 11-5 5L11 10l5-5ZM6 26l5-2-3-3-2 5Z"/><path class="accent" d="M22.5 5.5 26.5 9.5"/></svg></span><p><strong>GLP-1 support</strong> alongside your healthcare provider.</p></li>
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M25.5 6.5C14 7 7.5 13 7.5 21c0 3 2 5 5 5 8 0 13-7.5 13-19.5Z"/><path class="accent" d="M8.5 25c4-6 8-10 14-14"/><path d="m14 19 1-5m2 2 4 .5"/></svg></span><p><strong>Midlife nutrition</strong> for changing priorities.</p></li>
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M5 7.5h15a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-8l-5 4v-4a3 3 0 0 1-2-3v-6a3 3 0 0 1 3-3Z"/><path class="accent" d="M11 12h7m-7 4h4"/><path d="M24 14.5h1a2 2 0 0 1 2 2v7l-3-2h-5"/></svg></span><p><strong>Conflicting advice</strong> made clearer.</p></li>
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><path class="accent" d="M16 9v7l5 3"/><path d="M16 5V3m11 13h2"/></svg></span><p><strong>Habits and routines</strong> built for real life.</p></li>
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M11 5v6c0 4 12 3 12 8s-12 4-12 8M21 5v3M11 27v1"/><path class="accent" d="M11 12c3 1 7 0 9-2m-8 14c3-1 7 0 9 2"/></svg></span><p><strong>Digestion and sensitivities</strong> explored carefully.</p></li>
        <li class="tonic-who-item"><span class="tonic-who-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="20" cy="6" r="2.5"/><path d="m9 28 5-9 5 4 1 6M9 15l6-5 5 3 3 5M15 10l1.5 8"/><path class="accent" d="m5 21 5-2m14 2 4 2"/></svg></span><p><strong>Active lifestyles</strong> supported through nutrition.</p></li>
      </ul>
    </div>`;
}

function applyLivingNetwork(doc, pageWindow) {
  const method = doc.querySelector('.method');
  if (!method || method.dataset.tonicNetwork === 'true') return;

  if (!doc.querySelector('#tonic-network-styles')) {
    const styles = doc.createElement('style');
    styles.id = 'tonic-network-styles';
    styles.textContent = `
      .tonic-network-section { overflow: hidden; color: white; background: var(--ink); }
      .tonic-network-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: clamp(3rem, 8vw, 7rem); }
      .tonic-network-visual { min-width: 0; }
      .tonic-network-visual svg { width: 100%; height: auto; }
      .tonic-network-visual line { stroke: rgba(255,255,255,.24); stroke-width: 1.3; }
      .tonic-network-visual circle { fill: var(--ink-deep); stroke: none; }
      .tonic-network-visual .tn-core { fill: var(--sage); stroke: none; }
      .tonic-network-visual text { fill: white; font: 600 13px Manrope, sans-serif; text-anchor: middle; }
      .tonic-network-visual .tn-core-text { fill: white; font-weight: 700; }
      .tonic-network-copy .eyebrow { color: var(--sage-light); }
      .tonic-network-copy h2 { max-width: 10ch; color: white; }
      .tonic-network-copy > p:not(.eyebrow) { max-width: 36rem; margin: 1.35rem 0 0; color: rgba(255,255,255,.72); font-size: 1.04rem; }
      .tonic-network-copy .text-link { color: white; }
      .tonic-network-points { display: flex; flex-wrap: wrap; gap: .35rem; margin: 1.6rem 0 2rem; padding: 0; color: var(--sage-light); list-style: none; font: 700 .88rem/1.5 Manrope, sans-serif; }
      .tonic-network-points li:not(:last-child)::after { content: " ·"; margin-left: .35rem; color: rgba(255,255,255,.48); }
      .tonic-network-visual .tn-lines line { stroke-dasharray: 420; stroke-dashoffset: 420; }
      .tonic-network-visual .tn-signals line { opacity: 0; stroke: white; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 18 500; stroke-dashoffset: 0; }
      .tonic-network-visual .tn-nodes circle { opacity: 0; transform: scale(.78); transform-box: fill-box; transform-origin: center; }
      .tonic-network-visual .tn-labels { opacity: 0; }
      .tonic-network-visual.is-visible .tn-lines line { animation: tonic-net-draw .9s ease-out forwards; }
      .tonic-network-visual.is-visible .tn-lines line:nth-child(2n) { animation-delay: .08s; }
      .tonic-network-visual.is-visible .tn-lines line:nth-child(3n) { animation-delay: .16s; }
      .tonic-network-visual.is-visible .tn-signals line { animation: tonic-net-signal .78s ease-out 1s forwards; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(2) { animation-delay: 1.09s; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(3) { animation-delay: 1.18s; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(4) { animation-delay: 1.27s; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(5) { animation-delay: 1.36s; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(6) { animation-delay: 1.45s; }
      .tonic-network-visual.is-visible .tn-signals line:nth-child(7) { animation-delay: 1.54s; }
      .tonic-network-visual.is-visible .tn-nodes circle { animation: tonic-net-node-in .42s cubic-bezier(.2,.8,.2,1.25) forwards; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(2) { animation-delay: .12s; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(3) { animation-delay: .2s; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(4) { animation-delay: .28s; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(5) { animation-delay: .36s; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(6) { animation-delay: .44s; }
      .tonic-network-visual.is-visible .tn-nodes circle:nth-child(7) { animation-delay: .52s; }
      .tonic-network-visual.is-visible .tn-nodes .tn-core { animation: tonic-net-node-in .5s cubic-bezier(.2,.8,.2,1.2) .62s forwards, tonic-net-core-breathe 5s ease-in-out 1.5s infinite; }
      .tonic-network-visual.is-visible .tn-labels { animation: tonic-net-label-in .5s ease-out .78s forwards; }
      @keyframes tonic-net-draw { to { stroke-dashoffset: 0; } }
      @keyframes tonic-net-signal { 0% { opacity: 0; stroke-dashoffset: 0; } 12% { opacity: .95; } 78% { opacity: .8; } 100% { opacity: 0; stroke-dashoffset: -230; } }
      @keyframes tonic-net-node-in { to { opacity: 1; transform: scale(1); } }
      @keyframes tonic-net-label-in { to { opacity: 1; } }
      @keyframes tonic-net-core-breathe { 0%, 12%, 100% { transform: scale(1); } 6% { transform: scale(1.045); } }
      @media (max-width: 800px) {
        .tonic-network-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        .tonic-network-copy { order: -1; }
        .tonic-network-copy h2 { max-width: 12ch; }
        .tonic-network-visual { width: min(100%, 34rem); margin-inline: auto; }
      }
      @media (prefers-reduced-motion: reduce) {
        .tonic-network-visual .tn-lines line { stroke-dashoffset: 0; }
        .tonic-network-visual .tn-signals { display: none; }
        .tonic-network-visual .tn-nodes circle { opacity: 1; transform: none; }
        .tonic-network-visual .tn-labels { opacity: 1; }
        .tonic-network-visual.is-visible :is(.tn-lines line, .tn-nodes circle, .tn-labels) { animation: none; }
      }
    `;
    doc.head.append(styles);
  }

  method.dataset.tonicNetwork = 'true';
  method.classList.add('tonic-network-section');
  method.innerHTML = `
    <div class="section-shell tonic-network-grid">
      <div class="tonic-network-visual" aria-label="A network connects nutrition science with the many factors that shape eating">
        <svg viewBox="0 0 520 520" role="img" aria-hidden="true">
          <g class="tn-lines">
            <line x1="260" y1="260" x2="260" y2="70"/><line x1="260" y1="260" x2="405" y2="125"/>
            <line x1="260" y1="260" x2="445" y2="280"/><line x1="260" y1="260" x2="380" y2="415"/>
            <line x1="260" y1="260" x2="205" y2="450"/><line x1="260" y1="260" x2="78" y2="340"/>
            <line x1="260" y1="260" x2="85" y2="155"/><line x1="260" y1="70" x2="405" y2="125"/>
            <line x1="445" y1="280" x2="380" y2="415"/><line x1="205" y1="450" x2="78" y2="340"/>
            <line x1="85" y1="155" x2="260" y2="70"/>
          </g>
          <g class="tn-signals" aria-hidden="true">
            <line x1="260" y1="260" x2="260" y2="70"/><line x1="260" y1="260" x2="405" y2="125"/>
            <line x1="260" y1="260" x2="445" y2="280"/><line x1="260" y1="260" x2="380" y2="415"/>
            <line x1="260" y1="260" x2="205" y2="450"/><line x1="260" y1="260" x2="78" y2="340"/>
            <line x1="260" y1="260" x2="85" y2="155"/>
          </g>
          <g class="tn-nodes">
            <circle cx="260" cy="70" r="45"/><circle cx="405" cy="125" r="45"/><circle cx="445" cy="280" r="45"/>
            <circle cx="380" cy="415" r="45"/><circle cx="205" cy="450" r="45"/><circle cx="78" cy="340" r="45"/>
            <circle cx="85" cy="155" r="45"/><circle class="tn-core" cx="260" cy="260" r="74"/>
          </g>
          <g class="tn-labels">
            <text x="260" y="74">needs</text><text x="405" y="129">energy</text><text x="445" y="284">routines</text>
            <text x="380" y="419">culture</text><text x="205" y="454">access</text><text x="78" y="344">habits</text>
            <text x="85" y="159">goals</text><text class="tn-core-text" x="260" y="252">practical</text>
            <text class="tn-core-text" x="260" y="272">nutrition</text>
          </g>
        </svg>
      </div>
      <div class="tonic-network-copy">
        <p class="eyebrow">How we work together</p>
        <h2>Everything connects.</h2>
        <p>Eating is shaped by a network of biological, personal and environmental factors. We identify which connections matter most for you right now.</p>
        <ul class="tonic-network-points" aria-label="How we work together">
          <li>See the whole picture</li><li>Choose priorities</li><li>Adapt over time</li>
        </ul>
        <a class="text-link" href="/nutrition-behaviour-change/">Explore nutrition &amp; behaviour change</a>
      </div>
    </div>`;

  const network = method.querySelector('.tonic-network-visual');
  const reduceMotion = pageWindow.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in pageWindow)) {
    network.classList.add('is-visible');
    return;
  }

  const observer = new pageWindow.IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    network.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: .3 });
  observer.observe(network);
}

function applyTonicBrand(pageFrame) {
  const doc = pageFrame?.contentDocument;
  if (!doc?.body) return;

  doc.title = doc.title.replaceAll('somaē', BRAND_NAME);

  doc.querySelectorAll('.brand').forEach((brand) => {
    brand.setAttribute('aria-label', `${BRAND_NAME} ${BRAND_DESCRIPTOR} home`);
    brand.innerHTML = wordmarkMarkup(true);
  });

  doc.querySelectorAll('[data-brand-wordmark]').forEach((element) => {
    element.innerHTML = wordmarkMarkup(element.getAttribute('data-brand-wordmark') !== 'name-only');
  });

  doc.querySelectorAll('.brand-wordmark').forEach((wordmark) => {
    wordmark.setAttribute('aria-label', BRAND_NAME);
    wordmark.textContent = BRAND_NAME;
  });

  replaceBrandText(doc);

  applyConnectedWho(doc);

  const nutritionEducationTitle = [...doc.querySelectorAll('main h2')]
    .find((heading) => heading.textContent.trim() === 'Nutrition education you can use.');
  nutritionEducationTitle?.closest('section')?.remove();

  doc.querySelectorAll('[aria-label]').forEach((element) => {
    element.setAttribute('aria-label', element.getAttribute('aria-label').replaceAll('somaē', BRAND_NAME));
  });

  applyLivingNetwork(doc, pageFrame.contentWindow);

  document.documentElement.classList.add('ready');
}

function connectToCurrentSite() {
  const shellDocument = shellFrame.contentDocument;
  const pageFrame = shellDocument?.querySelector('#brand-site');
  if (!pageFrame) return;

  shellDocument.title = shellDocument.title.replaceAll('somaē', BRAND_NAME);
  pageFrame.setAttribute('title', `${BRAND_NAME} ${BRAND_DESCRIPTOR} website`);

  const rebrand = () => requestAnimationFrame(() => applyTonicBrand(pageFrame));
  pageFrame.addEventListener('load', rebrand);
  rebrand();
}

shellFrame.addEventListener('load', connectToCurrentSite);
