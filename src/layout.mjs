import { SITE, SCHEDULE, OFFICE_HOURS_TIME } from './config.mjs';
import { STATS, CREDENTIALS } from './data.mjs';
import { icon, stars } from './icons.mjs';

export const YEAR = new Date().getFullYear();
export const ASSET_VERSION = Date.now().toString(36);

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/program/', label: 'Program' },
  { href: '/results/', label: 'Results' },
  { href: '/about/', label: 'About' },
  { href: '/faq/', label: 'FAQ' },
];

const fullAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`;
export const ADDRESS = fullAddress;

// ── Structured data ─────────────────────────────────────────────────────────
export const ORG_ID = `${SITE.url}/#org`;
export const PERSON_ID = `${SITE.url}/#patrick`;

function sameAs() {
  return [SITE.youtube, ...Object.values(SITE.social)].filter(Boolean);
}

export function baseGraph() {
  return [
    {
      '@type': 'EducationalOrganization',
      '@id': ORG_ID,
      name: SITE.company,
      alternateName: ['SAT Blueprint Method', 'SAT Blueprint'],
      description: 'Gradeful Test Prep runs the SAT Blueprint Method™, a structured, live online SAT coaching program for high schoolers.',
      url: `${SITE.url}/`,
      logo: `${SITE.url}/assets/img/logo-footer-600.png`,
      image: `${SITE.url}/assets/img/og-image.jpg`,
      telephone: SITE.phoneE164,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postal,
        addressCountry: SITE.address.country,
      },
      areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'State', name: 'Florida' }],
      founder: [{ '@id': PERSON_ID }, { '@id': `${SITE.url}/#alex` }],
      sameAs: sameAs(),
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE.founder,
      jobTitle: 'Co-founder, SAT Blueprint Method',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yale University' },
      worksFor: { '@id': ORG_ID },
      image: `${SITE.url}/assets/img/patrick-headshot.jpg`,
    },
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#alex`,
      name: 'Alex Torres',
      jobTitle: 'Co-founder, SAT Blueprint Method',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yale University' },
      worksFor: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: 'SAT Blueprint Method',
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

// ── <head> ──────────────────────────────────────────────────────────────────
export function head(page) {
  const canonical = `${SITE.url}${page.path}`;
  const ogImage = `${SITE.url}${page.ogImage || '/assets/img/og-image.jpg'}`;
  const graph = { '@context': 'https://schema.org', '@graph': [...baseGraph(), ...(page.schema || [])] };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<meta name="theme-color" content="#0C1A2A">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="SAT Blueprint Method™ · Gradeful Test Prep">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="SAT Blueprint — Strategy. Skills. Confidence. Results.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon-48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/img/favicon-192.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap">
${page.preload || ''}
<link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_VERSION}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
${page.headExtra || ''}
</head>`;
}

// ── Header ──────────────────────────────────────────────────────────────────
function navLinks(current, cls) {
  return NAV.map(
    (n) =>
      `<li><a class="${cls}" href="${n.href}"${isCurrent(current, n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`,
  ).join('');
}

function isCurrent(current, href) {
  if (href === '/') return current === '/';
  return current.startsWith(href);
}

export function header(current) {
  return `
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" data-header>
  <div class="hdr">
    <div class="wrap hdr-inner">
      <a class="brand" href="/">
        <img class="brand-mark" src="/assets/img/logo-mark-96.png" width="48" height="39" alt="">
        <span class="brand-text">
          <span class="brand-name">SAT Blueprint<sup>™</sup></span>
          <span class="brand-tag">by Gradeful Test Prep</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="Main">
        <ul>${navLinks(current, 'nav-link')}</ul>
      </nav>
      <a class="hdr-phone" href="${SITE.phoneHref}">${icon('phone', { size: 16 })}<span>${SITE.phoneDisplay}</span></a>
      <a class="btn btn-dark btn-sm hdr-cta" href="/book/"><span class="cta-long">Book a Free Roadmap Session</span><span class="cta-short">Free Roadmap Session</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
        <span class="sr-only">Menu</span>
        <span class="nt-open">${icon('menu', { size: 24 })}</span><span class="nt-close">${icon('close', { size: 24 })}</span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <nav aria-label="Mobile">
      <ul>${navLinks(current, 'mm-link')}</ul>
    </nav>
    <a class="btn btn-primary btn-block" href="/book/">Book a Free Roadmap Session</a>
    <a class="mm-phone" href="${SITE.phoneHref}">${icon('phone', { size: 18 })} Call ${SITE.phoneDisplay}</a>
    <a class="mm-phone" href="/contact/">${icon('mail', { size: 18 })} Contact Patrick</a>
  </div>
</header>`;
}

// ── Footer ──────────────────────────────────────────────────────────────────
function socialLinks() {
  const items = [['youtube', SITE.youtube, 'YouTube']];
  for (const [k, label] of [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['tiktok', 'TikTok'], ['x', 'X']]) {
    if (SITE.social[k]) items.push([k, SITE.social[k], label]);
  }
  return items
    .map(([k, url, label]) => `<li><a class="social" href="${url}" target="_blank" rel="noopener">${icon(k, { size: 20 })}<span class="sr-only">${label} (opens in a new tab)</span></a></li>`)
    .join('');
}

export function footer({ hideMobileBar = false } = {}) {
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="ft-grid">
      <div class="ft-brand">
        <a href="/" class="ft-logo"><picture><source srcset="/assets/img/logo-footer-600.webp" type="image/webp"><img src="/assets/img/logo-footer-600.png" width="240" height="162" alt="SAT Blueprint" loading="lazy"></picture></a>
        <p>The SAT Blueprint Method™ is the signature SAT program of Gradeful Test Prep.</p>
        <p class="ft-area">${icon('globe', { size: 16 })} Live online · Based in Deerfield Beach, FL</p>
        <p class="stepup-badge">${icon('shield', { size: 18 })}<span><strong>Approved Provider</strong> Step Up For Students</span></p>
        <ul class="ft-social" aria-label="Social media">${socialLinks()}</ul>
      </div>
      <nav class="ft-col" aria-label="Footer">
        <h2 class="ft-h">Explore</h2>
        <ul>
          ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </nav>
      <div class="ft-col">
        <h2 class="ft-h">The Program</h2>
        <ul>
          <li><a href="/program/">The 12-Week SAT Blueprint Program</a></li>
          <li><a href="/book/">Book a Free Roadmap Session</a></li>
          <li><a href="/results/">Student Results</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="ft-col">
        <h2 class="ft-h">Contact</h2>
        <ul class="ft-contact">
          <li><a href="${SITE.phoneHref}">${icon('phone', { size: 16 })} ${SITE.phoneDisplay}</a></li>
          <li><a href="mailto:${SITE.email}">${icon('mail', { size: 16 })} ${SITE.email}</a></li>
          <li><span>${icon('pin', { size: 16 })} <span>${SITE.address.street}<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}</span></span></li>
        </ul>
      </div>
    </div>
    <div class="ft-bottom">
      <p>© <span data-year>${YEAR}</span> SAT Blueprint Method™ · Gradeful Test Prep · Patrick Spano · All Rights Reserved.</p>
      <p class="ft-legal"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms</a></p>
    </div>
    <p class="ft-disclaimer">SAT® is a registered trademark of the College Board, which is not affiliated with and does not endorse this website or program.</p>
    <p class="ft-disclaimer">Results shown are examples of past students’ outcomes, not typical or future results. Individual results depend on each student’s starting point, effort, and consistency. Bright Futures and scholarship eligibility are determined solely by their administering organizations.</p>
  </div>
</footer>
${hideMobileBar ? '' : `<div class="mobile-bar" role="region" aria-label="Quick actions">
  <a class="btn btn-primary mb-book" href="/book/">${icon('calendar', { size: 18 })}<span>Book a Free Roadmap Session</span></a>
  <a class="mb-call" href="${SITE.phoneHref}">${icon('phone', { size: 18 })}<span>Call</span></a>
</div>`}`;
}

export function scripts(extra = '') {
  return `<script src="/assets/js/site.js?v=${ASSET_VERSION}" defer></script>${extra}`;
}

export function page(p) {
  return `${head(p)}
<body class="${p.bodyClass || ''}">
${header(p.path)}
<main id="main" tabindex="-1">
${p.body}
</main>
${footer(p)}
${scripts(p.scripts || '')}
</body>
</html>
`;
}

// ── Reusable components ─────────────────────────────────────────────────────
export const RISK_REDUCER = 'You’ll leave with a clear plan, whether you join or not.';
export const reassure = (cls = '', { plan = true, extra = '' } = {}) =>
  `<p class="reassure ${cls}">Free · 45 minutes · No pressure · No obligation${plan ? `<span class="reassure-plan">${RISK_REDUCER}${extra ? ` ${extra}` : ''}</span>` : ''}</p>`;

export function ctaPair({ secondary = 'call', dark = true } = {}) {
  const sec =
    secondary === 'email'
      ? `<a class="btn ${dark ? 'btn-ghost-light' : 'btn-ghost'}" href="mailto:${SITE.email}">${icon('mail', { size: 18 })} Email Patrick Directly</a>`
      : `<a class="btn ${dark ? 'btn-ghost-light' : 'btn-ghost'}" href="${SITE.phoneHref}">${icon('phone', { size: 18 })} Call Patrick</a>`;
  return `<div class="cta-row">
    <a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>
    ${sec}
  </div>`;
}

export function eyebrow(text, tone = '') {
  return `<p class="eyebrow ${tone}">${text}</p>`;
}

export function pageHero({ eyebrow: ey, title, sub, crumbs = [], ctas = true, extra = '' }) {
  const bc = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li><span aria-current="page">${c.name}</span></li>` : `<li><a href="${c.path}">${c.name}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  return `<section class="page-hero">
  <div class="wrap">
    ${bc}
    ${ey ? eyebrow(ey) : ''}
    <h1 class="ph-title">${title}</h1>
    ${sub ? `<p class="ph-sub">${sub}</p>` : ''}
    ${ctas ? `${ctaPair({ dark: false })}${reassure()}` : ''}
    ${extra}
  </div>
</section>`;
}

export function trustBar() {
  return `<section class="proof-row" aria-label="Why families trust SAT Blueprint">
  <div class="wrap pr-inner">
    ${STATS.map((s) => `<div class="pr-stat"><p class="pr-num">${s.num}</p><p class="pr-lbl">${s.label}</p></div>`).join('')}
  </div>
</section>`;
}

export function ticker(results) {
  const items = results
    .filter((r) => r.score || r.delta)
    .map((r) => `<li><span class="tk-name">${r.name}</span><span class="tk-score">${r.before ? `${r.before} → ` : ''}${r.score || `+${r.delta}`}</span></li>`)
    .join('');
  return `<section class="ticker" aria-label="Recent student scores">
  <ul class="tk-track">${items}</ul>
  <ul class="tk-track" aria-hidden="true">${items}</ul>
</section>`;
}

export function statsBand(cls = '') {
  return `<div class="stats-band ${cls}">${STATS.map(
    (s) => `<div class="stat"><p class="stat-num">${s.num}</p><p class="stat-lbl">${s.label}</p></div>`,
  ).join('')}</div>`;
}

export function testimonialCard(t, { schema = false } = {}) {
  const meta = [t.role, t.location, t.outcome].filter(Boolean).join(' · ');
  const initials = t.name.replace(/[^A-Za-z ]/g, '').split(' ').map((w) => w[0]).join('').slice(0, 2);
  return `<figure class="t-card">
    ${stars(5)}
    <blockquote><p>“${t.quote}”</p></blockquote>
    <figcaption><span class="t-avatar" aria-hidden="true">${initials}</span><span><strong>${t.name}</strong><span class="t-meta">${meta}</span></span></figcaption>
  </figure>`;
}

export function resultCard(r) {
  let score;
  if (r.before && r.score) {
    score = `<span class="sc-before">${r.before}</span><span class="sc-arrow" aria-hidden="true">${icon('arrow', { size: 22 })}</span><span class="sc-after">${r.score}</span><span class="sr-only"> (from ${r.before} to ${r.score})</span>`;
  } else if (r.score) {
    score = `<span class="sc-after">${r.score}</span>`;
  } else {
    score = `<span class="sc-after">+${r.delta}</span><span class="sc-unit">points</span>`;
  }
  const badge = r.delta && r.score ? `<span class="sc-delta">+${r.delta}</span>` : '';
  return `<article class="score-card${r.score === 1600 ? ' is-perfect' : ''}">
    <p class="sc-tag">${r.tag}</p>
    <p class="sc-score">${score}</p>
    <h3 class="sc-name">${r.name} ${badge}</h3>
    <p class="sc-detail">${r.detail}</p>
  </article>`;
}

export function proofNote(n) {
  const initial = n.from.replace('Parent of ', '')[0];
  return `<figure class="note">
    <figcaption class="note-head">
      <span class="note-avatar" aria-hidden="true">${initial}</span>
      <span class="note-from">${n.from}${n.date ? `<span class="note-date">${n.date}</span>` : ''}</span>
      <span class="note-score">${n.score}</span>
    </figcaption>
    <div class="note-thread">
      ${n.msgs.map((m) => `<p class="msg ${m.in ? 'in' : 'out'}"><span class="sr-only">${m.in ? n.from : 'Patrick'}: </span>${m.text}</p>`).join('')}
    </div>
  </figure>`;
}

export function videoCard(v) {
  return `<figure class="video-card">
    <div class="video" data-yt="${v.id}" data-title="${esc(v.title)}">
      <button type="button" class="video-play" aria-label="Play video: ${esc(v.title)}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy">
        <span class="vp-btn">${icon('play', { size: 28 })}</span>
      </button>
      <noscript><a href="https://www.youtube.com/watch?v=${v.id}">Watch “${esc(v.title)}” on YouTube</a></noscript>
    </div>
    <figcaption><strong>${v.title}</strong><span>${v.outcome}</span></figcaption>
  </figure>`;
}

export function scheduleModule() {
  const sections = SCHEDULE.length
    ? `<ul class="sch-list">${SCHEDULE.map((s) => `<li><span class="sch-label">${s.label}</span><span class="sch-days">${s.days}</span><span class="sch-time">${s.time}</span></li>`).join('')}</ul>`
    : `<p class="sch-big">Weekday evenings</p><p>Eastern Time. 3–6 students max. Class days and times are confirmed on your Roadmap Session, so we can fit your teen around school, sports, and activities.</p>`;
  return `<div class="schedule reveal">
    <div class="sch-card sch-main">
      <p class="sch-kicker">${icon('live', { size: 18 })} Live small-group classes</p>
      ${sections}
    </div>
    <div class="sch-card">
      <p class="sch-kicker">${icon('office', { size: 18 })} Weekly office hours</p>
      <p class="sch-big">${OFFICE_HOURS_TIME || 'Every week'}</p>
      <p>Live time to ask questions and review mistakes — so nothing stays stuck between classes.</p>
    </div>
    <div class="sch-card">
      <p class="sch-kicker">${icon('calendar', { size: 18 })} Your Roadmap Session</p>
      <p class="sch-big">Mon–Fri · 8–5 ET</p>
      <p>Free, 45 minutes, over Google Meet with Patrick. Start here.</p>
    </div>
  </div>
  <p class="sch-note">${icon('users', { size: 16 })} All classes are live online over Google Meet and kept to 3–6 students. Exact times are confirmed on your Roadmap Session.</p>`;
}

export function parentBlock() {
  const items = [
    ['compass', 'Clarity from day one', 'You’ll know the plan, the target test date, and what “good” looks like for your teen — in plain numbers, not vague encouragement.'],
    ['eye', 'Progress you can actually see', 'The portal tracks progress and time studied. You get a portal login and a weekly progress report, so you always know where your teen stands without having to nag.'],
    ['bell', 'Reminders that keep prep on track', 'Homework is assigned in the portal, and weekly checks keep prep from slipping behind practice, games, and AP deadlines — so you’re not the one nagging.'],
    ['users', 'A first conversation built for both of you', 'The Roadmap Session is designed for parents and their teen together. If anyone else helps make this decision, bring them too, so everyone hears the same plan at the same time.'],
    ['scholar', 'Scholarship math, done for you', 'For Florida families, we plan around the score thresholds that unlock Bright Futures — and talk honestly about what’s realistic.'],
  ];
  return `<section class="section parents">
  <div class="wrap parents-grid">
    <div class="parents-head reveal">
      ${eyebrow('For parents', 'gold')}
      <h2 class="h2">You’re part of the plan — <span>not left on the sidelines</span></h2>
      <p class="lead">Your teen does the work. You make the decisions. You get a portal login and a weekly progress report, so you always know where your teen stands without having to nag.</p>
      <a class="btn btn-primary" href="/book/">Book a Free Roadmap Session</a>
      ${reassure()}
    </div>
    <ul class="parents-list">
      ${items.map(([ic, t, b]) => `<li class="reveal"><span class="pl-ico">${icon(ic, { size: 22 })}</span><div><h3>${t}</h3><p>${b}</p></div></li>`).join('')}
    </ul>
  </div>
</section>`;
}

export function trustAside({ quote } = {}) {
  return `<aside class="trust-aside" aria-label="Why families choose SAT Blueprint">
    <div class="ta-head">
      <picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img src="/assets/img/patrick-headshot.jpg" alt="Patrick Spano — SAT Blueprint Coach, Yale Graduate" width="72" height="86" loading="lazy"></picture>
      <div><p class="ta-name">Patrick Spano</p><p class="ta-role">Co-founder</p></div>
    </div>
    <ul class="ta-list">
      <li>${icon('check', { size: 16 })}<span><strong>2,000+</strong> families helped</span></li>
      <li>${icon('check', { size: 16 })}<span><strong>$1,500,000+</strong> in scholarships earned</span></li>
      <li>${icon('check', { size: 16 })}<span>Yale graduate · Perfect SAT Scorer</span></li>
      <li>${icon('check', { size: 16 })}<span>Approved Step Up For Students provider</span></li>
    </ul>
    ${quote ? `<figure class="ta-quote">${stars(5)}<blockquote><p>“${quote.quote}”</p></blockquote><figcaption>— ${quote.name}, ${quote.role}</figcaption></figure>` : ''}
  </aside>`;
}

export function finalCta() {
  return `<section class="final-cta">
  <div class="wrap"><div class="fc-panel reveal"><div class="fc-inner">
    <p class="badge-gold">Groups fill before each SAT</p>
    <h2 class="fc-title">Ready to build your <span>blueprint?</span></h2>
    <p class="fc-sub">If your teen is motivated and serious about their SAT score, they don’t need more random practice. They need the right structure, the right plan, and a coach who starts with the tape — where the points are actually being lost. Let’s map that out together.</p>
    ${ctaPair({ secondary: 'email' })}
    ${reassure('on-dark', { extra: 'Patrick runs every Roadmap Session.' })}
    <p class="fc-lock">SAT dates fill the calendar fast, and scholarship deadlines don’t move. Starting sooner gives your teen more room to improve — and if you’re already close to a test date, we’ll be honest about what’s realistic.</p>
  </div>
  <div class="fc-photo" aria-hidden="true"><picture><source srcset="/assets/img/patrick-portrait-640.webp" type="image/webp"><img src="/assets/img/patrick-portrait-640.jpg" alt="" width="640" height="800" loading="lazy"></picture></div>
  </div></div>
</section>`;
}

export function faqAccordion(faqs, { idPrefix = 'faq' } = {}) {
  return `<div class="accordion">${faqs
    .map(
      (f, i) => `<div class="acc-item"${f.live ? '' : ' data-review="new-copy"'}>
      <h3 class="acc-h"><button type="button" class="acc-btn" aria-expanded="false" aria-controls="${idPrefix}-${i}" id="${idPrefix}-btn-${i}">
        <span>${f.q}</span><span class="acc-ico" aria-hidden="true">${icon('plus', { size: 20 })}</span>
      </button></h3>
      <div class="acc-panel" id="${idPrefix}-${i}" role="region" aria-labelledby="${idPrefix}-btn-${i}" hidden>
        <p>${f.a || f.text}</p>
      </div>
    </div>`,
    )
    .join('')}</div>`;
}

export function blogCard(p) {
  return `<article class="blog-card reveal" data-cat="${p.categorySlug}">
    <a class="bc-link" href="/blog/${p.slug}/">
      <div class="bc-cover">${p.cover}</div>
      <div class="bc-body">
        <p class="bc-meta"><span class="cat-tag">${p.category}</span><time datetime="${p.date}">${p.dateDisplay}</time></p>
        <h3 class="bc-title">${p.title}</h3>
        <p class="bc-excerpt">${p.excerpt}</p>
        <span class="bc-more">Read article ${icon('arrow', { size: 16 })}</span>
      </div>
    </a>
  </article>`;
}

export { icon, stars };
