import { existsSync, readFileSync } from 'node:fs';
import { SITE, SCHEDULE, OFFICE_HOURS_TIME, SAT_DATES } from './config.mjs';
import { STATS, CREDENTIALS, ADMITS } from './data.mjs';
import { icon, stars } from './icons.mjs';

export const YEAR = new Date().getFullYear();
export const ASSET_VERSION = Date.now().toString(36);

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/method/', label: 'How It Works' },
  { href: '/results/', label: 'Real Results' },
  { href: '/faq/', label: 'FAQ' },
]

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
      jobTitle: 'Founder, SAT Blueprint Method',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yale University' },
      worksFor: { '@id': ORG_ID },
      image: `${SITE.url}/assets/img/patrick-headshot.jpg`,
    },
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#alex`,
      name: 'Alex Torres',
      jobTitle: 'Educational Director, SAT Blueprint Method',
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
      `<li><a class="${cls}" href="${n.href}"${n.title ? ` title="${n.title}"` : ''}${isCurrent(current, n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`,
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
        <p class="stepup-badge">${icon('shield', { size: 18 })}<span><strong>For Florida families</strong> Approved Step Up For Students provider</span></p>
        <ul class="ft-social" aria-label="Social media">${socialLinks()}</ul>
      </div>
      <nav class="ft-col" aria-label="Footer">
        <h2 class="ft-h">Explore</h2>
        <ul>
          ${NAV.map((n) => `<li><a href="${n.href}">${n.title || n.label}</a></li>`).join('')}
          <li><a href="/book/">Book a Free Roadmap Session</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </nav>
      <nav class="ft-col" aria-label="Scholarships and Admissions">
        <h2 class="ft-h">Scholarships &amp; Admissions</h2>
        <ul>
          <li><a href="/scholarships-by-state/">SAT Scholarships by State</a></li>
          <li><a href="/sat-scores-by-college/">SAT Scores by College</a></li>
        </ul>
      </nav>
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

// Use a real logo file if one exists in assets/img/logos/<slug>.(svg|png|webp|jpg)
function logoFile(slug) {
  if (!slug) return '';
  for (const ext of ['svg', 'png', 'webp', 'jpg']) {
    if (existsSync(new URL(`../assets/img/logos/${slug}.${ext}`, import.meta.url))) return `/assets/img/logos/${slug}.${ext}`;
  }
  return '';
}

// Size each logo to the same visual area so wide wordmarks and tall crests balance.
function logoSize(file) {
  let w = 40, h = 40;
  if (file.endsWith('.png')) {
    const b = readFileSync(new URL(`..${file}`, import.meta.url));
    w = b.readUInt32BE(16); h = b.readUInt32BE(20);
  }
  const area = 4200, r = w / h;
  const dh = Math.min(46, Math.round(Math.sqrt(area / r)));
  return { w: Math.round(dh * r), h: dh };
}

export function satCountdown() {
  if (!SAT_DATES.length) return '';
  return `<section class="countdown" data-countdown='${JSON.stringify(SAT_DATES)}' hidden>
  <div class="wrap cd-inner">
    <div class="cd-copy">
      <p class="cd-kick">Next SAT</p>
      <p class="cd-date" data-cd-date></p>
      <p class="cd-reg" data-cd-reg></p>
    </div>
    <ol class="cd-clock" aria-label="Time until the next SAT">
      <li><span data-cd-d>0</span><em>Days</em></li>
      <li><span data-cd-h>0</span><em>Hours</em></li>
      <li><span data-cd-m>0</span><em>Minutes</em></li>
      <li><span data-cd-s>0</span><em>Seconds</em></li>
    </ol>
    <div class="cd-cta"><a class="btn btn-primary" href="/book/">Book a Free Roadmap Session</a>${reassure('on-dark', { plan: false })}</div>
  </div>
</section>`;
}

export function admitsTicker({ link = true } = {}) {
  const items = ADMITS.map((a) => {
    const f = logoFile(a.logo);
    const sz = f ? logoSize(f) : null;
    const mark = f
      ? `<img class="ad-logo" src="${f}" alt="" width="${sz.w}" height="${sz.h}" style="width:${sz.w}px;height:${sz.h}px" loading="lazy">`
      : `<span class="ad-mono" style="background:${a.bg};color:${a.fg}" aria-hidden="true">${a.mono}</span>`;
    const hideName = f && !a.crest;
    return `<li class="ad-item${f ? ' has-logo' : ''}">${mark}<span class="ad-what${hideName ? ' sr-only' : ''}">${a.school}</span><span class="ad-name">${a.student}${a.note ? ` · ${a.note}` : ''}</span></li>`;
  }).join('<li class="ad-dot" aria-hidden="true"></li>');
  return `<section class="admits" aria-label="Colleges our students got into">
  <div class="wrap ad-head">
    <p class="ad-label-top">Where our students got in</p>
    ${link ? `<a class="link-arrow ad-link" href="/results/">See all Real Results ${icon('arrow', { size: 14 })}</a>` : ''}
  </div>
  <div class="ad-viewport" data-ticker tabindex="0" aria-label="Scrolling list of student results. Tap or focus to pause.">
    <ul class="ad-track">${items}<li class="ad-dot" aria-hidden="true"></li></ul>
    <ul class="ad-track" aria-hidden="true">${items}<li class="ad-dot" aria-hidden="true"></li></ul>
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

export function scoreReport(r) {
  const pct = Math.max(0, Math.min(100, ((r.total - 400) / 1200) * 100));
  const init = r.student.replace(/[^A-Z]/g, '').slice(0, 2);
  const face = r.photo
    ? `<img class="sr-photo" src="${r.photo}" alt="" width="56" height="56" loading="lazy">`
    : `<span class="sr-photo sr-init" aria-hidden="true">${init}</span>`;
  return `<article class="score-report">
    <header class="sr-top"><span class="sr-kicker">Official SAT score</span>${face}</header>
    <div class="sr-body">
      <p class="sr-label">Total score</p>
      <p class="sr-total">${r.total}</p>
      <div class="sr-scale" aria-hidden="true"><span class="sr-fill" style="width:${pct.toFixed(1)}%"></span></div>
      <p class="sr-range"><span>400</span><span>1600</span></p>
      <h3 class="sr-name">${r.student}</h3>
      ${r.detail ? `<p class="sr-detail">${r.detail}</p>` : ''}
    </div>
  </article>`;
}

// Home-page "score jump" card: the gain is the headline, with a 400–1600 bar.
export function jumpCard(j) {
  const pos = (v) => (((v - 400) / 1200) * 100).toFixed(1);
  return `<article class="jump-card">
    <p class="jc-delta"><span class="jc-plus">+${j.after - j.before}</span><span class="jc-unit">points${j.when ? ` <em>${j.when}</em>` : ''}</span></p>
    <div class="jc-bar" aria-hidden="true"><span class="jc-base" style="width:${pos(j.before)}%"></span><span class="jc-gain" style="left:${pos(j.before)}%;width:${(pos(j.after) - pos(j.before)).toFixed(1)}%"></span></div>
    <p class="jc-scores">${j.beforeLabel ? `<small>${j.beforeLabel}</small>` : ''}<span class="jc-before">${j.before}</span>${icon('arrow', { size: 18 })}${j.afterLabel ? `<small>${j.afterLabel}</small>` : ''}<span class="jc-after">${j.after}</span><span class="sr-only"> (from ${j.before} to ${j.after})</span></p>
    <h3 class="jc-name">${j.name}</h3>
    ${j.quote ? `<p class="jc-quote">${j.quote}</p>` : ''}
  </article>`;
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
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${esc(v.title)} — student video" width="480" height="360" loading="lazy">
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
      <div><p class="ta-name">Patrick Spano</p><p class="ta-role">Founder</p></div>
    </div>
    <ul class="ta-list">
      <li>${icon('check', { size: 16 })}<span><strong>2,000+</strong> families helped</span></li>
      <li>${icon('check', { size: 16 })}<span><strong>$1,500,000+</strong> in scholarships earned</span></li>
      <li>${icon('check', { size: 16 })}<span>Yale graduate · 99th Percentile SAT Scorer</span></li>
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
  <div class="fc-visual" aria-hidden="true">
    <svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg" role="presentation">
      <defs>
        <pattern id="gap-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#6FA6FF" stroke-opacity=".12"/></pattern>
        <linearGradient id="gap-dream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0C040"/><stop offset="1" stop-color="#C89B2A" stop-opacity=".35"/></linearGradient>
        <linearGradient id="gap-now" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#1D5FD4" stop-opacity=".35"/></linearGradient>
        <linearGradient id="gap-bridge" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#F0C040"/></linearGradient>
      </defs>
      <rect width="360" height="480" fill="url(#gap-grid)"/>
      <rect x="36" y="300" width="78" height="140" rx="10" fill="url(#gap-now)"/>
      <rect x="246" y="96" width="78" height="344" rx="10" fill="url(#gap-dream)"/>
      <path d="M114 304 L246 100" stroke="url(#gap-bridge)" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/>
      <g fill="none" stroke="#6FA6FF" stroke-opacity=".55" stroke-width="2">
        <path d="M150 248 h24 M171 216 h24 M192 184 h24 M213 152 h24"/>
      </g>
      <rect x="112" y="186" width="136" height="40" rx="20" fill="#0C1A2A" stroke="#F0C040" stroke-width="1.5"/>
      <text x="180" y="211" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="12" font-weight="800" fill="#F0C040" letter-spacing="1.2">SAT BLUEPRINT</text>
      <g font-family="Montserrat, Arial, sans-serif" font-weight="800" fill="#ffffff" text-anchor="middle">
        <text x="75" y="282" font-size="11" letter-spacing="1.4" fill="#A6B2C4">CURRENT</text>
        <text x="75" y="462" font-size="13">Today</text>
        <text x="285" y="78" font-size="11" letter-spacing="1.4" fill="#F0C040">DREAM SCORE</text>
        <text x="285" y="462" font-size="13">Test day</text>
      </g>
      <text x="180" y="40" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="800" fill="#A6B2C4" letter-spacing="2.2">CLOSING THE GAP</text>
    </svg>
  </div>
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
