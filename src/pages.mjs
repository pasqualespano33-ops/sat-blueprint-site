import { SITE, COACHES, OFFICE_HOURS_TIME } from './config.mjs';
import {
  STATS, CREDENTIALS, RESULTS, TESTIMONIALS, PROOF_NOTES, VIDEOS, INCLUDES, STEPS, PILLARS, PAINS, WHY,
} from './data.mjs';
import { FAQS } from './faq.mjs';
import { POSTS, CATEGORIES } from './posts.mjs';
import {
  icon, stars, esc, eyebrow, reassure, ctaPair, pageHero, trustBar, statsBand, testimonialCard, resultCard,
  proofNote, videoCard, scheduleModule, parentBlock, trustAside, finalCta, faqAccordion, blogCard, ticker,
  breadcrumbs, ORG_ID, PERSON_ID, ADDRESS,
} from './layout.mjs';

const slug = (s) => s.toLowerCase().replace(/™/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const T = Object.fromEntries(TESTIMONIALS.map((t) => [t.id, t]));
const R = Object.fromEntries(RESULTS.map((r) => [r.name, r]));

// ── Shared section builders ─────────────────────────────────────────────────
function includesGrid({ linkToProgram = false } = {}) {
  return `<div class="inc-grid">${INCLUDES.map((c) => {
    const inner = `<span class="inc-ico">${icon(c.icon, { size: 26 })}</span>
      <h3 class="inc-title">${c.title}</h3>
      <p class="inc-body">${c.body}</p>
      ${linkToProgram ? `<span class="inc-more">Learn more ${icon('arrow', { size: 14 })}</span>` : ''}`;
    return linkToProgram
      ? `<a class="inc-card reveal" href="/program/#${slug(c.title)}">${inner}</a>`
      : `<article class="inc-card reveal" id="${slug(c.title)}">${inner}</article>`;
  }).join('')}</div>`;
}

function stepsTimeline() {
  return `<ol class="timeline">${STEPS.map(
    (s, i) => `<li class="tl-step reveal"><span class="tl-num" aria-hidden="true">${i + 1}</span><div><h3 class="tl-title"><span class="sr-only">Step ${i + 1}: </span>${s.title}</h3><p>${s.body}</p><span class="pill">${s.pill}</span></div></li>`,
  ).join('')}</ol>`;
}

function pillarsGrid() {
  return `<div class="pillars">${PILLARS.map(
    (p, i) => `<article class="pillar reveal">
      <div class="pillar-top"><p class="pillar-step ${p.color}">Pillar 0${i + 1}</p><h3 class="pillar-name">${p.key}</h3><p class="pillar-sub">${p.sub}</p></div>
      <div class="pillar-stripe ${p.color}" aria-hidden="true"></div>
      <div class="pillar-body"><p class="pillar-lead">${p.lead}</p><ul>${p.items.map((it) => `<li><span class="pi-check ${p.color}">${icon('check', { size: 16 })}</span>${it}</li>`).join('')}</ul></div>
    </article>`,
  ).join('')}</div>`;
}

function methodSection() {
  return `<section class="section bg-surface" id="method">
  <div class="wrap">
    <div class="center-head reveal">
      ${eyebrow('The SAT Blueprint Method™')}
      <h2 class="h2">Three pillars. <span>One proven system.</span></h2>
      <p class="lead">A structured, step-by-step approach that turns confusion into confidence and preparation into performance — designed specifically for high schoolers.</p>
    </div>
    <div class="pillars3">
      ${PILLARS.map((p, i) => `<article class="p3 reveal"><p class="p3-n">0${i + 1}</p><h3 class="p3-name">${p.key}</h3><p class="p3-sub">${p.sub}</p><ul>${p.items.map((it) => `<li>${icon('check', { size: 16 })}${it}</li>`).join('')}</ul></article>`).join('')}
    </div>
  </div>
</section>`;
}

function scheduleSection() {
  return `<section class="section" id="schedule">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Weekly schedule')}
      <h2 class="h2">Live online. Small groups. <span>Built around school.</span></h2>
      <p class="lead">Classes run live over Google Meet, typically on weekday evenings in Eastern Time, plus weekly office hours. No commute — just log in and learn.</p>
    </div>
    ${scheduleModule()}
  </div>
</section>`;
}

function videosSection({ title = 'Hear it straight from students.', bg = '' } = {}) {
  return `<section class="section ${bg}" id="videos">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Video testimonials')}
      <h2 class="h2">${title}</h2>
      <p class="lead">Real students sharing their results in their own words.</p>
    </div>
    <div class="video-grid">${VIDEOS.map(videoCard).join('')}</div>
    <p class="center mt-md"><a class="link-arrow" href="${SITE.youtube}" target="_blank" rel="noopener">More on our YouTube channel ${icon('arrow', { size: 16 })}<span class="sr-only"> (opens in a new tab)</span></a></p>
  </div>
</section>`;
}

function notesWall(notes = PROOF_NOTES) {
  return `<div class="notes-grid">${notes.map((n) => `<div class="reveal">${proofNote(n)}</div>`).join('')}</div>`;
}

function resultsDisclaimer() {
  return `<p class="fine-print">Results shown are real outcomes from past SAT Blueprint students and are not a promise or guarantee of future results. Every student is different; individual results depend on each student’s starting point, effort, and consistency. Bright Futures and scholarship eligibility are determined solely by their administering organizations, not by Gradeful Test Prep.</p>`;
}

function carousel(items) {
  return `<div class="carousel" data-carousel>
    <div class="car-track" tabindex="0" role="region" aria-label="Parent and student reviews (scroll horizontally)">
      ${items.map((t) => `<div class="car-slide">${testimonialCard(t)}</div>`).join('')}
    </div>
    <div class="car-controls">
      <button type="button" class="car-btn" data-prev aria-label="Previous review">${icon('arrowLeft', { size: 20 })}</button>
      <button type="button" class="car-btn" data-next aria-label="Next review">${icon('arrow', { size: 20 })}</button>
    </div>
  </div>`;
}

function bookCta({ title = 'Find out exactly what’s holding the score back.', sub = 'A free 45-minute call with Patrick. You’ll leave with a clear, personalized plan — whether you enroll or not.' } = {}) {
  return `<section class="cta-strip">
  <div class="wrap cs-inner reveal">
    <div><h2 class="cs-title">${title}</h2><p>${sub}</p></div>
    <div class="cs-actions"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>${reassure()}</div>
  </div>
</section>`;
}

// ── HOME ────────────────────────────────────────────────────────────────────
function home() {
  const gallery = ['Wyatt C.', 'Abhi', 'Annabel', 'Leonardo C.', 'Eshaan', 'Jordan'].map((n) => R[n]);
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const compare = [
    ['Starts with a diagnosis of exactly where points are lost', true, false],
    ['Live instruction with real feedback every week', true, false],
    ['Week-by-week plan to a target score and test date', true, false],
    ['Small groups — never one of 50', true, false],
    ['Homework reviewed, reminders, and accountability', true, false],
    ['Parents kept in the loop', true, false],
    ['Scholarship-score strategy (Bright Futures & merit aid)', true, false],
  ];
  const bento = [
    { ...INCLUDES[0], cls: 'b-wide b-blue' },
    { ...INCLUDES[3], cls: 'b-tall b-ink' },
    { ...INCLUDES[1], cls: '' },
    { ...INCLUDES[2], cls: '' },
    { ...INCLUDES[4], cls: '' },
    { ...INCLUDES[5], cls: 'b-gold' },
  ];
  return {
    path: '/',
    out: 'index.html',
    title: 'SAT Blueprint Method™ — Patrick Spano | 150+ Point SAT Coaching for High Schoolers',
    ogTitle: 'SAT Blueprint Method™ — A Clear Blueprint for the SAT',
    description: 'Help your teen boost their SAT score with a structured 12-week program — 150+ point average improvement. Live online SAT coaching with Yale grad Patrick Spano. Book a free Roadmap Session.',
    headExtra: '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js" defer></script>',
    bodyClass: 'is-home',
    schema: [],
    body: `
<section class="hero hero-b">
  <div class="wrap">
    <p class="hb-kick">Real result · 12 weeks</p>
    <p class="hb-score" role="img" aria-label="Eshaan's SAT score went from 1230 to 1430"><span class="from" aria-hidden="true">1230</span><span class="arr" aria-hidden="true">${icon('arrow', { size: 96 })}</span><span class="to" aria-hidden="true" data-count-from="1230" data-count-to="1430">1430</span></p>
    <p class="hb-cap">Eshaan · +200 points · “Thank you Patrick!” — Preethi, parent of Eshaan</p>
    <h1 class="hero-title">150+ average point improvement. <span>A clear blueprint for the SAT.</span></h1>
    <p class="hero-sub">The SAT Blueprint Method™ is live, personalized SAT coaching for high schoolers — built on a diagnosis of exactly where your teen is losing points. Strategy. Skills. Confidence. Results.</p>
    ${ctaPair({ dark: true })}
    <p class="hero-assure">${icon('check', { size: 16 })} Free · 45 minutes · No pressure · No obligation</p>
    <div class="hb-coach"><picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img src="/assets/img/patrick-headshot.jpg" alt="" width="40" height="48"></picture><p>Coached by <strong>Patrick Spano</strong> · Yale graduate · Perfect SAT scorer</p></div>
    <div class="hb-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</section>

${trustBar()}
${ticker(RESULTS)}

<section class="section" id="familiar">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow">Sound familiar?</p>
        <h2 class="h2">Your teen is working hard. <span class="muted">The score isn’t moving.</span></h2>
      </div>
      <p class="lead">Most SAT struggles aren’t about intelligence. They’re about structure, strategy, and execution. The SAT isn’t a test of how smart your teen is — it’s a test of how well they understand the exam: its patterns, its traps, and how to move through it under pressure.</p>
    </div>
    <ol class="pain-grid">
      ${PAINS.map((p, i) => `<li class="pain reveal"><span class="pain-n">0${i + 1}</span><h3>${p.title}</h3><p>${p.body}</p></li>`).join('')}
    </ol>
    <figure class="pullquote reveal">
      <div class="pq-score"><span class="pq-from">1230</span><span class="pq-arrow">${icon('arrow', { size: 28 })}</span><span class="pq-to">1430</span><span class="pq-tag">+200 in 12 weeks</span></div>
      <div>
        ${stars(5)}
        <blockquote><p>“${T.preethi.quote}”</p></blockquote>
        <figcaption><strong>Preethi</strong> · Parent of Eshaan</figcaption>
      </div>
    </figure>
  </div>
</section>

<section class="section bg-surface" id="how">
  <div class="wrap">
    <div class="center-head reveal">
      <p class="eyebrow">How it works</p>
      <h2 class="h2">From where you are <span>to your dream college.</span></h2>
      <p class="lead">Students improve fastest when they know exactly what the SAT tests, which concepts to prioritize, and how to manage time and anxiety on test day. That clarity is what the SAT Blueprint Method™ provides.</p>
    </div>
    <ol class="steps4">
      ${STEPS.map((s, i) => `<li class="s4 reveal${i === 0 ? ' is-first' : ''}"><span class="s4-n">Step ${i + 1}</span><h3>${s.title}</h3><p>${s.body}</p>${i === 0 ? `<a class="btn btn-primary btn-sm" href="/book/">Book Your Free Session</a>` : `<span class="s4-pill">${s.pill}</span>`}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" id="program">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow">What’s inside</p>
        <h2 class="h2">A complete coaching system. <span>Not a video library.</span></h2>
      </div>
      <div>
        <p class="lead">A personalized, live 12-week program built around your teen’s exact situation — every piece designed to turn effort into points.</p>
        <a class="link-arrow mt-sm" href="/program/">Explore the full program ${icon('arrow', { size: 16 })}</a>
      </div>
    </div>
    <div class="bento">
      ${bento.map((c) => `<a class="bento-card ${c.cls} reveal" href="/program/#${slug(c.title)}"><span class="bc-ico">${icon(c.icon, { size: 24 })}</span><h3>${c.title}</h3><p>${c.body}</p><span class="bc-go" aria-hidden="true">${icon('arrow', { size: 18 })}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section bg-surface" id="method">
  <div class="wrap">
    <div class="center-head reveal">
      <p class="eyebrow">The SAT Blueprint Method™</p>
      <h2 class="h2">Three pillars. <span>One proven system.</span></h2>
    </div>
    <div class="pillars3">
      ${PILLARS.map((p, i) => `<article class="p3 reveal"><p class="p3-n">0${i + 1}</p><h3 class="p3-name">${p.key}</h3><p class="p3-sub">${p.sub}</p><ul>${p.items.map((it) => `<li>${icon('check', { size: 16 })}${it}</li>`).join('')}</ul></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="why">
  <div class="wrap">
    <div class="center-head reveal">
      <p class="eyebrow">Why SAT Blueprint</p>
      <h2 class="h2">Not more studying. <span>Smarter structure.</span></h2>
      <p class="lead">Families usually come to us after trying videos, books, and generic prep. Here’s the difference.</p>
    </div>
    <div class="compare reveal" role="region" aria-label="SAT Blueprint compared with typical SAT prep" tabindex="0">
      <table>
        <thead><tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col" class="c-us"><img src="/assets/img/logo-mark-96.png" alt="" width="32" height="26"> SAT Blueprint</th><th scope="col">Typical prep</th></tr></thead>
        <tbody>
          ${compare.map(([f]) => `<tr><th scope="row">${f}</th><td class="c-us"><span class="yes">${icon('check', { size: 18, label: 'Yes' })}</span></td><td><span class="no">${icon('close', { size: 16, label: 'Usually not' })}</span></td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="center mt-lg"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>${reassure()}</div>
  </div>
</section>

<section class="section bg-ink" id="results">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow on-dark">Student results</p>
        <h2 class="h2 on-dark">The results <span>speak for themselves.</span></h2>
      </div>
      <div>
        <p class="lead on-dark">From perfect 1600s to 200-point jumps — real scores from real SAT Blueprint students.</p>
        <a class="link-arrow on-dark mt-sm" href="/results/">See all student results ${icon('arrow', { size: 16 })}</a>
      </div>
    </div>
    <div class="score-grid s6">${gallery.map((r) => `<div class="reveal">${resultCard(r)}</div>`).join('')}</div>
    <div class="notes-grid notes-3 mt-lg">${[PROOF_NOTES[0], PROOF_NOTES[2], PROOF_NOTES[5]].map((n) => `<div class="reveal">${proofNote(n)}</div>`).join('')}</div>
  </div>
</section>

<section class="section" id="founder">
  <div class="wrap founder">
    <div class="founder-photo reveal">
      <picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img src="/assets/img/patrick-headshot.jpg" alt="Patrick Spano — SAT Blueprint Coach, Yale Graduate" width="433" height="517" loading="lazy"></picture>
      <div class="founder-badge"><p class="fb-num">15+</p><p class="fb-lbl">Years coaching</p></div>
    </div>
    <div class="founder-body reveal">
      <p class="eyebrow">Meet your coach</p>
      <h2 class="h2">“Most students aren’t stuck for lack of effort.”</h2>
      <p>I’m Patrick Spano — founder of The SAT Blueprint Method™. After helping thousands of families over the years, I’ve learned one thing: most students study hard without knowing what the SAT actually tests, which strategies matter most, or how to perform under pressure.</p>
      <p>I built The SAT Blueprint™ to change that — replacing guesswork with a clear, proven system.</p>
      <ul class="cred-row">${CREDENTIALS.map((c) => `<li>${icon('check', { size: 15 })}${c}</li>`).join('')}</ul>
      <a class="link-arrow" href="/about/">Read Patrick’s story ${icon('arrow', { size: 16 })}</a>
    </div>
  </div>
</section>

${parentBlock()}

${scheduleSection()}

<section class="section" id="reviews">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow">Parent &amp; student reviews</p>
        <h2 class="h2">Real families. <span>Real results.</span></h2>
      </div>
      <div>
        <p class="lead">These families came in overwhelmed and left with a plan — and a score that opened doors.</p>
        <a class="link-arrow mt-sm" href="/reviews/">Read all reviews ${icon('arrow', { size: 16 })}</a>
      </div>
    </div>
    ${carousel(TESTIMONIALS)}
  </div>
</section>

<section class="section bg-surface" id="faq">
  <div class="wrap faq-preview">
    <div class="reveal">
      <p class="eyebrow">Questions</p>
      <h2 class="h2">What parents <span>ask first.</span></h2>
      <p class="lead">Straight answers on cost, Step Up For Students, online classes, and one-on-one time.</p>
      <a class="link-arrow mt-sm" href="/faq/">See all FAQs ${icon('arrow', { size: 16 })}</a>
    </div>
    ${faqAccordion([FAQS[0], FAQS[5], FAQS[3], FAQS[4]], { idPrefix: 'hfaq' })}
  </div>
</section>

<section class="section" id="blog">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow">From the blog</p>
        <h2 class="h2">SAT insight <span>for parents.</span></h2>
      </div>
      <a class="link-arrow" href="/blog/">All articles ${icon('arrow', { size: 16 })}</a>
    </div>
    <div class="blog-grid">${posts.map(blogCard).join('')}</div>
  </div>
</section>

${finalCta()}
`,
  };
}

// ── PROGRAM ─────────────────────────────────────────────────────────────────
function program() {
  const experience = [
    ['target', 'Diagnostic', 'A full-length, timed diagnostic shows exactly where points are being lost — content, strategy, timing, or nerves.'],
    ['plan', 'Personal plan', 'Patrick builds a week-by-week plan from your teen’s starting score to their target score and test date.'],
    ['live', 'Live classes', 'Small-group instruction each week over Google Meet, taught in order of SAT priority — with real feedback.'],
    ['check', 'Homework & accountability', 'Targeted practice every week, reviewed — plus reminders, so work actually gets done.'],
    ['portal', 'Practice tests', 'Official-style, full-length tests at planned checkpoints to measure progress and sharpen pacing.'],
    ['bell', 'Parent updates', 'Parents see how things are going and what’s next — no guessing, no nagging.'],
  ];
  const programFaqs = [FAQS[0], FAQS[4], FAQS[5]];
  return {
    path: '/program/',
    out: 'program/index.html',
    title: 'The 12-Week SAT Blueprint Program | Live Online SAT Coaching',
    description: 'Inside the 12-week SAT Blueprint Method™: live small-group classes, weekly office hours, a personalized SAT portal, a custom study plan, and scholarship score strategy.',
    schema: [
      {
        '@type': 'Course',
        '@id': `${SITE.url}/program/#course`,
        name: 'SAT Blueprint Method™ — 12-Week SAT Program',
        description: 'A structured, live online SAT coaching program for high schoolers: diagnostic assessment, a customized study plan, weekly live small-group instruction, weekly office hours, a personalized practice portal, and scholarship score strategy.',
        provider: { '@id': ORG_ID },
        educationalLevel: 'High school',
        teaches: 'Digital SAT Reading and Writing, SAT Math, test-taking strategy, pacing, and time management',
        inLanguage: 'en',
        timeRequired: 'P12W',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          location: { '@type': 'VirtualLocation', url: `${SITE.url}/program/` },
          instructor: { '@id': PERSON_ID },
          courseSchedule: { '@type': 'Schedule', repeatFrequency: 'P1W', duration: 'P12W' },
        },
      },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Program', path: '/program/' }]),
    ],
    body: `
${pageHero({
  eyebrow: 'The 12-Week Program',
  title: 'A live, personalized path <span>to a higher SAT score.</span>',
  sub: 'A structured, live online SAT coaching program for high schoolers — not a tutoring center and not a video library. A personalized, live program built around your teen’s exact situation.',
  crumbs: [{ name: 'Program', path: '/program/' }],
})}

<section class="section">
  <div class="wrap overview-grid">
    <div class="reveal">
      ${eyebrow('Program overview')}
      <h2 class="h2">One program. <span>Twelve focused weeks.</span></h2>
      <p>The SAT Blueprint Method™ is one program: a 12-week, live online SAT course for high schoolers. It starts with a diagnosis of exactly where your teen is losing points, turns that into a week-by-week plan, and then delivers it through live small-group classes, weekly office hours, a personalized practice portal, and Patrick’s proprietary SAT Blueprint™.</p>
      <p>Everything is online over Google Meet, so there’s no commute — and families outside Florida join just as easily as families in Deerfield Beach.</p>
    </div>
    <ul class="contrast-list reveal" aria-label="What SAT Blueprint is and isn’t">
      <li class="is">${icon('check', { size: 18 })} Live instruction with real feedback</li>
      <li class="is">${icon('check', { size: 18 })} A plan built from your teen’s diagnostic</li>
      <li class="is">${icon('check', { size: 18 })} Small groups — never one of 50</li>
      <li class="is">${icon('check', { size: 18 })} Accountability and parent visibility</li>
      <li class="not">${icon('close', { size: 18 })} Not a pre-recorded video library</li>
      <li class="not">${icon('close', { size: 18 })} Not a generic, same-for-everyone curriculum</li>
    </ul>
  </div>
</section>

<section class="section bg-ink" id="included">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('What’s included', 'on-dark')}
      <h2 class="h2 on-dark">Everything your teen needs <span>to master the SAT.</span></h2>
    </div>
    ${includesGrid()}
  </div>
</section>

<section class="section" id="weekly-experience">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('The weekly experience')}
      <h2 class="h2">What your teen’s week <span>actually looks like.</span></h2>
      <p class="lead">Homework and reminders aren’t an afterthought — they’re part of the system. Here’s the loop your teen runs through the program.</p>
    </div>
    <ol class="flow">
      ${experience.map(([ic, t, b], i) => `<li class="flow-step reveal"><span class="flow-ico">${icon(ic, { size: 22 })}</span><p class="flow-n">0${i + 1}</p><h3>${t}</h3><p>${b}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section bg-soft" id="one-on-one">
  <div class="wrap split">
    <div class="reveal">
      ${eyebrow('One-on-one, built in')}
      <h2 class="h2">Individual attention <span>where it counts.</span></h2>
      <p>There’s real one-on-one time built in — a personal onboarding, plus brief one-on-one sessions with Patrick when your teen needs them. Combined with small live groups and a fully personalized plan, they get individual attention where it counts.</p>
      <p>There’s no separate tutoring package to buy. It’s simply part of how the 12-week program works.</p>
    </div>
    <div class="quote-panel reveal">
      ${stars(5)}
      <blockquote><p>“${T.david.quote}”</p></blockquote>
      <p class="qp-attr">— David C., Parent of Adin · Miami, FL</p>
    </div>
  </div>
</section>

${methodSection()}

${scheduleSection()}

${parentBlock()}

<section class="section bg-gold-pale" id="step-up">
  <div class="wrap split">
    <div class="reveal">
      ${eyebrow('Pricing & Florida funding', 'gold')}
      <h2 class="h2">Personalized pricing. <span>Step Up For Students welcome.</span></h2>
      <p>Pricing is personalized to your teen’s goals and timeline. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring — we’re an approved provider, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.</p>
      <a class="btn btn-primary" href="/book/">Book a Free Roadmap Session</a>
    </div>
    <div class="stepup-card reveal">
      <span class="su-ico">${icon('shield', { size: 34 })}</span>
      <p class="su-title">Approved Provider</p>
      <p class="su-sub">Step Up For Students</p>
      <p>Ask about using PEP funds on your Roadmap Session.</p>
    </div>
  </div>
</section>

<section class="section" id="program-faq">
  <div class="wrap narrow">
    <div class="sec-head reveal">
      ${eyebrow('Program questions')}
      <h2 class="h2">Questions parents <span>ask most.</span></h2>
    </div>
    ${faqAccordion(programFaqs, { idPrefix: 'pfaq' })}
    <p class="center mt-md"><a class="link-arrow" href="/faq/">See all FAQs ${icon('arrow', { size: 16 })}</a></p>
  </div>
</section>

${finalCta()}
`,
  };
}

// ── RESULTS ─────────────────────────────────────────────────────────────────
function results() {
  const groups = [
    { title: 'Top scores', names: ['Wyatt C.', 'Abhi', 'Annabel', 'Leonardo C.', 'Briana', 'Mark', 'Liana', 'Aarush', 'Sasha'] },
    { title: 'Biggest jumps', names: ['Sammi', 'Eshaan', 'Jordan', 'Xavier', 'Tristan'] },
    { title: 'Florida & Bright Futures', names: ['Wyatt C.', 'Mauricio', 'Jacob S.', 'Xavier'] },
  ];
  return {
    path: '/results/',
    out: 'results/index.html',
    title: 'SAT Score Results — Real Students, Real Score Jumps | SAT Blueprint',
    description: 'Real SAT Blueprint results: a perfect 1600, a 1580, 1550 with Yale and Princeton admits, +200 and +240 point jumps, and Florida Bright Futures scholarships.',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Results', path: '/results/' }])],
    body: `
${pageHero({
  eyebrow: 'Student results',
  title: 'Real families. <span>Real results.</span>',
  sub: 'These families came in overwhelmed and left with a plan — and a score that opened doors.',
  crumbs: [{ name: 'Results', path: '/results/' }],
})}

<section class="stats-section" aria-label="Results at a glance"><div class="wrap">${statsBand()}</div></section>

<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Featured stories')}
      <h2 class="h2">The results <span>speak for themselves.</span></h2>
    </div>
    <div class="story-grid">
      <article class="story story-lg reveal">
        <p class="story-score"><span>1550</span></p>
        <h3>Annabel — accepted to Yale and Princeton</h3>
        <p class="story-meta">750 RW · 800 Math · Weston, FL</p>
        <p>Also accepted to Emory and Johns Hopkins with huge scholarships, plus UNC Chapel Hill, UVA, and Tufts.</p>
        <figure class="story-quote">${stars(5)}<blockquote><p>“${T.shari.quote}”</p></blockquote><figcaption>— Shari S., Parent of Annabel</figcaption></figure>
      </article>
      <article class="story story-perfect reveal">
        <p class="story-kicker">${icon('trophy', { size: 18 })} Perfect score</p>
        <p class="story-score"><span>1600</span></p>
        <h3>Wyatt C.</h3>
        <p class="story-meta">Now at UF · 100% Bright Futures</p>
      </article>
      <article class="story reveal">
        <p class="story-score"><span class="sb">1230</span>${icon('arrow', { size: 22 })}<span>1430</span></p>
        <h3>Eshaan — +200 in 12 weeks</h3>
        <figure class="story-quote">${stars(5)}<blockquote><p>“${T.preethi.quote}”</p></blockquote><figcaption>— Preethi, parent of Eshaan</figcaption></figure>
      </article>
      <article class="story reveal">
        <p class="story-score"><span>1540</span></p>
        <h3>Leonardo C.</h3>
        <p class="story-meta">Student · Delray Beach, FL</p>
        <figure class="story-quote">${stars(5)}<blockquote><p>“${T.leonardo.quote}”</p></blockquote><figcaption>— Leonardo C., Student</figcaption></figure>
      </article>
    </div>
  </div>
</section>

<section class="section bg-soft" id="scores">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Score gallery')}
      <h2 class="h2">Every score <span>has a story.</span></h2>
      <p class="lead">Before-and-after scores are shown wherever both numbers are public.</p>
    </div>
    ${groups.map((g) => `<h3 class="group-title reveal">${g.title}</h3><div class="score-grid">${g.names.map((n) => `<div class="reveal">${resultCard(R[n])}</div>`).join('')}</div>`).join('')}
  </div>
</section>

<section class="section" id="messages">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('In their words')}
      <h2 class="h2">The messages <span>that make it worth it.</span></h2>
      <p class="lead">Real texts from students and parents when scores and admissions decisions came in.</p>
    </div>
    ${notesWall()}
  </div>
</section>

${videosSection({ bg: 'bg-soft' })}

<section class="section-tight"><div class="wrap narrow">${resultsDisclaimer()}</div></section>

${bookCta({ title: 'Join the families who’ve already unlocked better scores.' })}
`,
  };
}

// ── ABOUT ───────────────────────────────────────────────────────────────────
function about() {
  const values = [
    ['compass', 'Structure, strategy, execution', 'Most SAT struggles aren’t about intelligence. We replace guesswork with structure, a strategy for every question type, and the practice to execute under pressure.'],
    ['target', 'Diagnosis before practice', 'We find out exactly where points are being lost before assigning a single drill — so every hour goes where it matters.'],
    ['users', 'Live coaching and accountability', 'Real instruction, real feedback, and someone in your teen’s corner every week. Not a video library.'],
    ['scholar', 'Opening doors', 'A score is a means to an end: real college options and scholarship dollars, especially for Florida families pursuing Bright Futures.'],
  ];
  const coaches = COACHES.length
    ? `<div class="coach-grid">${COACHES.map((c) => `<article class="coach-card reveal">${c.photo ? `<img src="${c.photo}" alt="${esc(c.name)}" loading="lazy" width="240" height="240">` : ''}<h3>${c.name}</h3><p class="coach-role">${c.role}</p><p>${c.bio}</p>${c.credentials?.length ? `<ul class="coach-creds">${c.credentials.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}</article>`).join('')}</div>`
    : '';
  return {
    path: '/about/',
    out: 'about/index.html',
    title: 'About Patrick Spano — Founder of the SAT Blueprint Method™',
    description: 'Meet Patrick Spano: Yale graduate, perfect SAT scorer, former professional athlete, and SAT coach for 15+ years. Founder of the SAT Blueprint Method™ at Gradeful Test Prep.',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])],
    body: `
${pageHero({
  eyebrow: 'About SAT Blueprint',
  title: 'Meet your coach, <span>Patrick Spano.</span>',
  sub: 'Founder of the SAT Blueprint Method™ and Gradeful Test Prep. Yale graduate. Perfect SAT scorer. 15+ years coaching families through the SAT.',
  crumbs: [{ name: 'About', path: '/about/' }],
  ctas: false,
})}

<section class="section">
  <div class="wrap about-grid">
    <div class="about-photo reveal">
      <picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img src="/assets/img/patrick-headshot.jpg" alt="Patrick Spano — SAT Blueprint Coach, Yale Graduate" width="433" height="517"></picture>
      <div class="about-badge"><p class="ab-num">15+</p><p class="ab-lbl">Years coaching</p></div>
    </div>
    <div class="about-body reveal">
      ${eyebrow('Our story')}
      <h2 class="h2">Replacing guesswork <span>with a proven system.</span></h2>
      <p>I’m Patrick Spano — founder of The SAT Blueprint Method™.</p>
      <p>After helping thousands of families over the years, I’ve learned one thing: most students aren’t stuck for lack of effort. They study hard without knowing what the SAT actually tests, which strategies matter most, or how to perform under pressure.</p>
      <p>I built The SAT Blueprint™ to change that — replacing guesswork with a clear, proven system.</p>
      <p>More than anything, I want every student to have the chance I did: to walk into the college process with real options, and to pursue the education and future they’re capable of. That’s what this work is really about.</p>
      <p class="signature">— Patrick Spano</p>
      <ul class="cred-row" aria-label="Credentials">
        ${CREDENTIALS.map((c) => `<li>${icon('check', { size: 16 })}${c}</li>`).join('')}
      </ul>
      <a class="btn btn-primary" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>
    </div>
  </div>
</section>

<section class="stats-section" aria-label="Results at a glance"><div class="wrap">${statsBand()}</div></section>

<section class="section bg-soft">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Mission & values')}
      <h2 class="h2">What we believe <span>about the SAT.</span></h2>
    </div>
    <div class="values-grid">
      ${values.map(([ic, t, b]) => `<article class="value-card reveal"><span class="pl-ico">${icon(ic, { size: 22 })}</span><h3>${t}</h3><p>${b}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      ${eyebrow('How coaching works')}
      <h2 class="h2">Patrick’s method, <span>live every week.</span></h2>
      <p>Patrick is the founder and head coach, and he personally runs every Roadmap Session. Weekly classes are live, small-group instruction delivered under his method — the same diagnostics, the same SAT Blueprint™, and the same week-by-week plan structure — with brief one-on-one time with Patrick built in when a student needs it.</p>
      <p>Groups are kept intentionally small, so your teen is never just one of 50.</p>
    </div>
    <div class="reveal">
      ${eyebrow('Where we work')}
      <h2 class="h2">Based in Deerfield Beach. <span>Live online everywhere.</span></h2>
      <p>Our office is in Deerfield Beach, Florida, and the program runs fully online over Google Meet — so families anywhere in the U.S. can join without a commute.</p>
      <p>Florida families get extra depth: we know the score thresholds that unlock Bright Futures, and we’re an approved Step Up For Students provider.</p>
    </div>
  </div>
  ${coaches ? `<div class="wrap mt-lg">${coaches}</div>` : ''}
</section>

${finalCta()}
`,
  };
}

// ── BLOG ────────────────────────────────────────────────────────────────────
function blogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return {
    path: '/blog/',
    out: 'blog/index.html',
    title: 'SAT Blog for Parents — Digital SAT, Strategy & Scholarships | SAT Blueprint',
    description: 'Practical SAT guidance for parents of high schoolers: the digital SAT and Bluebook, score strategy, Florida Bright Futures scholarships, and signs prep isn’t working.',
    schema: [
      { '@type': 'Blog', '@id': `${SITE.url}/blog/#blog`, name: 'SAT Blueprint Blog', publisher: { '@id': ORG_ID }, url: `${SITE.url}/blog/` },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }]),
    ],
    body: `
${pageHero({
  eyebrow: 'The SAT Blueprint Blog',
  title: 'Clear SAT guidance <span>for parents.</span>',
  sub: 'Straight answers on the digital SAT, score strategy, and scholarships — from the coach behind the SAT Blueprint Method™.',
  crumbs: [{ name: 'Blog', path: '/blog/' }],
  ctas: false,
})}
<section class="section">
  <div class="wrap blog-layout">
    <div>
      <div class="filter-bar" role="group" aria-label="Filter articles by category">
        <button type="button" class="chip" data-filter="all" aria-pressed="true">All</button>
        ${CATEGORIES.map((c) => `<button type="button" class="chip" data-filter="${c.slug}" aria-pressed="false">${c.name}</button>`).join('')}
      </div>
      <p class="sr-only" aria-live="polite" data-filter-status></p>
      <div class="blog-grid blog-grid-2" data-blog-grid>${posts.map(blogCard).join('')}</div>
      <p class="empty-state" data-empty hidden>New articles in this category are coming soon. In the meantime, <a href="/book/">book a free Roadmap Session</a> and ask Patrick directly.</p>
    </div>
    <aside class="blog-side">
      <div class="side-cta">
        ${eyebrow('Free — Zero Obligation', 'on-dark')}
        <p class="side-title">Get a plan built for your teen.</p>
        <p>A free 45-minute Roadmap Session with Patrick. Leave knowing exactly what’s holding the score back.</p>
        <a class="btn btn-primary btn-block" href="/book/">Book a Free Roadmap Session</a>
        ${reassure('on-dark')}
      </div>
    </aside>
  </div>
</section>
${finalCta()}
`,
  };
}

function blogPost(p) {
  const others = POSTS.filter((o) => o.slug !== p.slug);
  return {
    path: `/blog/${p.slug}/`,
    out: `blog/${p.slug}/index.html`,
    title: p.metaTitle,
    ogTitle: p.title,
    ogType: 'article',
    description: p.description,
    schema: [
      {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: `${SITE.url}/blog/${p.slug}/`,
        image: `${SITE.url}/assets/img/og-image.jpg`,
        articleSection: p.category,
      },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: p.title, path: `/blog/${p.slug}/` }]),
    ],
    body: `
<article class="post" data-review="new-copy">
  <header class="post-hero">
    <div class="wrap narrow">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li><span aria-current="page">${p.category}</span></li></ol></nav>
      <p class="bc-meta"><span class="cat-tag">${p.category}</span><time datetime="${p.date}">${p.dateDisplay}</time><span>${p.readTime}</span></p>
      <h1 class="post-title">${p.title}</h1>
      <p class="post-byline"><img src="/assets/img/patrick-headshot.jpg" alt="" width="40" height="48" loading="lazy">By <strong>Patrick Spano</strong>, Founder of the SAT Blueprint Method™</p>
    </div>
  </header>
  <div class="wrap post-layout">
    <div class="post-body prose">
      <div class="post-cover">${p.cover}</div>
      ${p.body}
      <div class="post-cta">
        <p class="pc-title">Want a plan built around your teen?</p>
        <p>Book a free 45-minute Roadmap Session. You’ll leave with a clear, focused plan — whether you enroll or not.</p>
        <a class="btn btn-primary" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>
        ${reassure()}
      </div>
    </div>
    <aside class="blog-side">
      <div class="side-cta">
        ${eyebrow('Free — Zero Obligation', 'on-dark')}
        <p class="side-title">Free 45-Minute Roadmap Session</p>
        <p>Patrick will review where your teen stands and map a realistic path to their target score.</p>
        <a class="btn btn-primary btn-block" href="/book/">Book a Free Roadmap Session</a>
        ${reassure('on-dark')}
      </div>
      <div class="side-related">
        <p class="side-h">More articles</p>
        <ul>${others.map((o) => `<li><a href="/blog/${o.slug}/"><span class="cat-tag">${o.category}</span>${o.title}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</article>
`,
  };
}

// ── REVIEWS ─────────────────────────────────────────────────────────────────
function reviews() {
  const rp = SITE.reviewProfile;
  const badge = rp.url && rp.rating && rp.count
    ? `<a class="rating-badge" href="${rp.url}" target="_blank" rel="noopener">${stars(5)}<span><strong>${rp.rating}</strong> from ${rp.count} reviews</span></a>`
    : '';
  const reviewSchema = TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ORG_ID },
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: t.quote,
  }));
  return {
    path: '/reviews/',
    out: 'reviews/index.html',
    title: 'Parent & Student Reviews of SAT Blueprint | Gradeful Test Prep',
    description: 'Read real parent and student reviews of the SAT Blueprint Method™ — score jumps, Ivy League admits, Bright Futures scholarships, and video testimonials.',
    schema: [...reviewSchema, breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews/' }])],
    body: `
${pageHero({
  eyebrow: 'Reviews',
  title: 'Parent &amp; student <span>reviews.</span>',
  sub: 'Five-star words from the families who’ve been through the SAT Blueprint Method™ — in their own words, unedited.',
  crumbs: [{ name: 'Reviews', path: '/reviews/' }],
  extra: badge,
})}

<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Written reviews')}
      <h2 class="h2">Real families. <span>Real results.</span></h2>
    </div>
    <div class="t-grid">${TESTIMONIALS.map((t) => `<div class="reveal">${testimonialCard(t)}</div>`).join('')}</div>
  </div>
</section>

<section class="section bg-soft">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Messages from families')}
      <h2 class="h2">When the scores <span>came in.</span></h2>
    </div>
    ${notesWall()}
  </div>
</section>

${videosSection()}

${rp.url ? `<section class="section-tight"><div class="wrap center"><a class="btn btn-ghost" href="${rp.url}" target="_blank" rel="noopener">${icon('star', { size: 18 })} Leave us a review<span class="sr-only"> (opens in a new tab)</span></a></div></section>` : ''}

<section class="section-tight"><div class="wrap narrow">${resultsDisclaimer()}</div></section>

${finalCta()}
`,
  };
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
function faq() {
  return {
    path: '/faq/',
    out: 'faq/index.html',
    title: 'SAT Blueprint FAQ — Cost, Step Up, Online Classes & the Digital SAT',
    description: 'Answers for parents: how SAT Blueprint differs from other prep, online classes, one-on-one time, pricing and Step Up For Students, the digital SAT, Bluebook, and timing.',
    schema: [
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.text } })),
      },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq/' }]),
    ],
    body: `
${pageHero({
  eyebrow: 'Common questions',
  title: 'Frequently asked <span>questions.</span>',
  sub: 'Straight answers about the program, pricing, Step Up For Students, and the digital SAT. Don’t see your question? Ask Patrick on your free Roadmap Session.',
  crumbs: [{ name: 'FAQ', path: '/faq/' }],
  ctas: false,
})}
<section class="section">
  <div class="wrap faq-layout">
    <div>${faqAccordion(FAQS)}</div>
    <aside class="faq-side">
      <div class="side-card">
        <p class="side-title-dark">Still have questions?</p>
        <p>Call or email Patrick directly — or get every answer on a free 45-minute Roadmap Session.</p>
        <a class="btn btn-primary btn-block" href="/book/">Book a Free Roadmap Session</a>
        <a class="side-link" href="${SITE.phoneHref}">${icon('phone', { size: 16 })} ${SITE.phoneDisplay}</a>
        <a class="side-link" href="mailto:${SITE.email}">${icon('mail', { size: 16 })} ${SITE.email}</a>
      </div>
    </aside>
  </div>
</section>
${finalCta()}
`,
  };
}

// ── BOOK ────────────────────────────────────────────────────────────────────
function book() {
  const willDo = [
    'Review where your teen stands today — starting score, next test date, and target.',
    'Pinpoint what’s holding the score back — content gaps, strategy, timing, or mindset.',
    'Discuss realistic score-improvement goals and a timeline around your teen’s schedule and test date.',
    'Identify common mistakes families make with prep and retakes.',
    'Leave you with a clear, focused, personalized plan — whether you enroll or not.',
  ];
  return {
    path: '/book/',
    out: 'book/index.html',
    title: 'Book a Free SAT Roadmap Session with Patrick Spano | SAT Blueprint',
    description: 'Book a free 45-minute SAT Roadmap Session over Google Meet. Patrick Spano will pinpoint what’s holding your teen’s score back and map a clear plan. No obligation.',
    bodyClass: 'is-book',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Book a Free Roadmap Session', path: '/book/' }])],
    scripts: `<script>window.SB_BOOKING=${JSON.stringify({ url: SITE.bookingUrl, webhook: SITE.intakeWebhook })};</script>`,
    body: `
<section class="page-hero book-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">Book a Free Roadmap Session</span></li></ol></nav>
    ${eyebrow('Free — Zero Obligation')}
    <h1 class="ph-title">What happens on your <span>free Roadmap Session?</span></h1>
    <p class="ph-sub">A free 45-minute call that gives you total clarity on your teen’s SAT situation — and a concrete plan to reach their target score.</p>
    <ul class="logistics" aria-label="Session details">
      <li>${icon('check', { size: 16 })} Free</li>
      <li>${icon('clock', { size: 16 })} 45 minutes</li>
      <li>${icon('live', { size: 16 })} Google Meet</li>
      <li>${icon('globe', { size: 16 })} Eastern Time</li>
      <li>${icon('users', { size: 16 })} With Patrick Spano</li>
    </ul>
  </div>
</section>

<section class="section book-section" id="booking">
  <div class="wrap book-grid">
    <div class="book-form-col">
      <div class="form-card" data-booking>
        <p class="badge-gold">Limited spots — groups fill before SAT dates</p>
        <h2 class="form-title">Book Your Free Roadmap Session</h2>
        <p class="form-reassure">Free 45-minute Roadmap Session. No obligation. You’ll leave with a clear plan.</p>

        <ol class="progress" aria-label="Booking progress">
          <li data-step-ind="1" aria-current="step"><span>1</span><em>Student</em></li>
          <li data-step-ind="2"><span>2</span><em>Who’s attending</em></li>
          <li data-step-ind="3"><span>3</span><em>Your details</em></li>
          <li data-step-ind="4"><span>4</span><em>Pick a time</em></li>
        </ol>
        <p class="sr-only" aria-live="polite" data-step-status></p>

        <form name="roadmap-intake" method="POST" data-netlify="true" netlify-honeypot="bot-field" novalidate data-intake>
          <input type="hidden" name="form-name" value="roadmap-intake">
          <p class="hp"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

          <fieldset class="step" data-step="1">
            <legend class="step-legend">Student snapshot</legend>
            <div class="field">
              <label for="student_name">Student first name <span class="req">*</span></label>
              <input id="student_name" name="student_first_name" type="text" autocomplete="off" required>
              <p class="err" id="student_name-err" hidden>Please enter your student’s first name.</p>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="grade">Current grade <span class="req">*</span></label>
                <select id="grade" name="grade" required>
                  <option value="">Select grade</option>
                  <option>9th</option><option>10th</option><option>11th</option><option>12th</option><option>Other</option>
                </select>
                <p class="err" id="grade-err" hidden>Please choose a grade.</p>
              </div>
              <div class="field">
                <label for="test_date">Target SAT test date</label>
                <select id="test_date" name="target_test_date" data-months>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="current_score">Current SAT or PSAT score <span class="opt">(if any)</span></label>
                <input id="current_score" name="current_score" type="text" inputmode="numeric" placeholder="e.g. 1180 SAT" aria-describedby="current_score-hint">
                <p class="hint" id="current_score-hint">Practice tests count too.</p>
              </div>
              <div class="field">
                <label for="target_score">Target score <span class="opt">(if any)</span></label>
                <input id="target_score" name="target_score" type="text" inputmode="numeric" placeholder="e.g. 1350">
              </div>
            </div>
            <div class="step-actions"><button type="button" class="btn btn-primary btn-lg" data-next>Continue ${icon('arrow', { size: 18 })}</button></div>
          </fieldset>

          <fieldset class="step" data-step="2" hidden>
            <legend class="step-legend">Who will attend the session?</legend>
            <p class="hint" id="attend-hint">This session is designed for parents and their teen. If both parents are part of the college-planning decision, please join together so nothing gets lost in translation.</p>
            <div class="checks" aria-describedby="attend-hint">
              <label class="check"><input type="checkbox" name="attend_parent_1" value="yes" checked> <span>Parent / guardian 1</span></label>
              <label class="check"><input type="checkbox" name="attend_parent_2" value="yes"> <span>Parent / guardian 2</span></label>
              <label class="check"><input type="checkbox" name="attend_student" value="yes" checked> <span>Student</span></label>
            </div>
            <p class="err" id="attend-err" hidden>Please select at least one parent or guardian — this session is built for the decision-maker.</p>
            <p class="nudge" data-student-nudge hidden>${icon('users', { size: 16 })} We strongly recommend your teen joins — they’ll hear the plan firsthand.</p>
            <div class="step-actions">
              <button type="button" class="btn btn-ghost" data-back>${icon('arrowLeft', { size: 18 })} Back</button>
              <button type="button" class="btn btn-primary btn-lg" data-next>Continue ${icon('arrow', { size: 18 })}</button>
            </div>
          </fieldset>

          <fieldset class="step" data-step="3" hidden>
            <legend class="step-legend">Parent contact</legend>
            <div class="field">
              <label for="parent_name">Parent / guardian name <span class="req">*</span></label>
              <input id="parent_name" name="parent_name" type="text" autocomplete="name" required>
              <p class="err" id="parent_name-err" hidden>Please enter your name.</p>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="phone">Phone <span class="req">*</span></label>
                <input id="phone" name="phone" type="tel" autocomplete="tel" required>
                <p class="err" id="phone-err" hidden>Please enter a valid phone number.</p>
              </div>
              <div class="field">
                <label for="email">Email <span class="req">*</span></label>
                <input id="email" name="email" type="email" autocomplete="email" required>
                <p class="err" id="email-err" hidden>Please enter a valid email address.</p>
              </div>
            </div>
            <div class="field">
              <label for="contact_time">Best time to reach you</label>
              <select id="contact_time" name="preferred_contact_time">
                <option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
              </select>
            </div>
            <div class="field">
              <label for="notes">Anything else we should know? <span class="opt">(optional)</span></label>
              <textarea id="notes" name="notes" rows="3"></textarea>
            </div>
            <label class="check consent"><input type="checkbox" name="consent" value="yes"> <span>I confirm that I want to receive content from this company using any contact information I provide.</span></label>
            <div class="step-actions">
              <button type="button" class="btn btn-ghost" data-back>${icon('arrowLeft', { size: 18 })} Back</button>
              <button type="submit" class="btn btn-primary btn-lg" data-submit>Choose a time ${icon('arrow', { size: 18 })}</button>
            </div>
            <p class="privacy-note">${icon('lock', { size: 14 })} We never sell student or family data. See our <a href="/privacy/">Privacy Policy</a>.</p>
          </fieldset>
        </form>

        <div class="step step-4" data-step="4" hidden tabindex="-1">
          <p class="step-legend">Pick a time that works</p>
          <p class="hint">Choose any open 45-minute slot below (shown in your time zone). You’ll get a calendar invite and a Google Meet link by email.</p>
          <div class="scheduler" data-scheduler></div>
          <p class="hint mt-sm">Trouble loading the calendar? <a href="${SITE.bookingUrl}" target="_blank" rel="noopener" data-scheduler-link>Open the scheduler in a new tab</a>, or call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>.</p>
          <button type="button" class="btn btn-ghost btn-sm mt-sm" data-back>${icon('arrowLeft', { size: 16 })} Edit my answers</button>
        </div>

        <noscript>
          <div class="noscript-box">
            <p>Our step-by-step form needs JavaScript. You can book directly on our scheduler instead:</p>
            <a class="btn btn-primary" href="${SITE.bookingUrl}">Open the Roadmap Session scheduler</a>
          </div>
        </noscript>
      </div>
    </div>

    <div class="book-info-col">
      ${trustAside({ quote: T.claudia })}
    </div>
  </div>
</section>

<section class="section bg-soft">
  <div class="wrap book-details">
    <div class="reveal">
      ${eyebrow('During the call')}
      <h2 class="h2">On your session, <span>Patrick will:</span></h2>
      <ol class="num-list">${willDo.map((w) => `<li>${w}</li>`).join('')}</ol>
    </div>
    <div class="reveal">
      <div class="attend-card">
        <h3>${icon('users', { size: 20 })} Please attend with your teen</h3>
        <p>The session is designed for parents of high school students looking for clarity and help with the SAT. Please attend with your teen. If both parents are involved in college-planning decisions, plan to join the session together.</p>
      </div>
      <div class="promise-card">
        <h3>${icon('lock', { size: 20 })} Our promise to you</h3>
        <p>You’ll leave your free Roadmap Session knowing exactly what’s holding your teen’s score back and what it takes to fix it — whether or not you ever work with us. No pressure, no pitch, no wasted time. Just clarity and a concrete plan you can act on.</p>
      </div>
      <dl class="logistics-list">
        <div><dt>Cost</dt><dd>Free</dd></div>
        <div><dt>Length</dt><dd>45 minutes</dd></div>
        <div><dt>Where</dt><dd>Google Meet (link sent by email)</dd></div>
        <div><dt>When</dt><dd>${SITE.roadmapHours} · book at least 4 hours ahead</dd></div>
        <div><dt>With</dt><dd>Patrick Spano, Founder</dd></div>
      </dl>
      <p class="signed">I look forward to connecting with you!<br><span>— Patrick Spano (Founder of SAT Blueprint)</span></p>
    </div>
  </div>
</section>
`,
  };
}

function bookConfirmed() {
  return {
    path: '/book/confirmed/',
    out: 'book/confirmed/index.html',
    title: 'You’re Booked — SAT Roadmap Session Confirmed | SAT Blueprint',
    description: 'Your free SAT Roadmap Session with Patrick Spano is booked. Check your email for the Google Meet link and calendar invite.',
    noindex: true,
    body: `
<section class="page-hero confirm-hero">
  <div class="wrap narrow center">
    <span class="confirm-ico">${icon('check', { size: 40 })}</span>
    <h1 class="ph-title">You’re <span>booked.</span></h1>
    <p class="ph-sub">Check your email for the Google Meet link and a calendar invite.</p>
  </div>
</section>
<section class="section">
  <div class="wrap narrow">
    <h2 class="h3">Before your session</h2>
    <ol class="num-list">
      <li>Add the invite to your calendar — and to your teen’s.</li>
      <li>Plan to attend with your teen. If both parents are part of college-planning decisions, join together.</li>
      <li>Have any recent SAT, PSAT, or practice-test scores handy.</li>
    </ol>
    <p>Need to reach the office? Call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> or email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    <p class="signed">I look forward to connecting with you!<br><span>— Patrick Spano (Founder of SAT Blueprint)</span></p>
    <p class="mt-md"><a class="link-arrow" href="/results/">While you wait, see real student results ${icon('arrow', { size: 16 })}</a></p>
  </div>
</section>
`,
  };
}

// ── CONTACT ─────────────────────────────────────────────────────────────────
function contact() {
  const hours = SITE.officeHours
    ? `<p><strong>Office hours:</strong> ${SITE.officeHours}</p>`
    : `<p><strong>Roadmap Sessions:</strong> ${SITE.roadmapHours}</p><p>Classes themselves run as live evening sessions online.</p>`;
  const mapQ = encodeURIComponent(ADDRESS);
  return {
    path: '/contact/',
    out: 'contact/index.html',
    title: 'Contact Patrick Spano | SAT Blueprint · Gradeful Test Prep',
    description: 'Questions before you book? Call (561) 430-2972 or email Patrick Spano. Gradeful Test Prep, 1761 W Hillsboro Blvd, Suite 207, Deerfield Beach, FL — live online nationwide.',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])],
    body: `
${pageHero({
  eyebrow: 'Contact',
  title: 'Questions? <span>Reach Patrick directly.</span>',
  sub: 'Have a question before you book, or already a current family? Send a note, call, or email — Patrick will get back to you. For a full plan for your teen, the best first step is a free Roadmap Session.',
  crumbs: [{ name: 'Contact', path: '/contact/' }],
  ctas: false,
})}
<section class="section">
  <div class="wrap contact-grid">
    <div class="form-card">
      <h2 class="form-title">Send a message</h2>
      <p class="hint">For general questions. Ready for a plan? <a href="/book/">Book a free Roadmap Session</a> instead.</p>
      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" novalidate data-contact>
        <input type="hidden" name="form-name" value="contact">
        <p class="hp"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="field">
          <label for="c_name">Name <span class="req">*</span></label>
          <input id="c_name" name="name" type="text" autocomplete="name" required>
          <p class="err" id="c_name-err" hidden>Please enter your name.</p>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="c_phone">Phone</label>
            <input id="c_phone" name="phone" type="tel" autocomplete="tel">
          </div>
          <div class="field">
            <label for="c_email">Email <span class="req">*</span></label>
            <input id="c_email" name="email" type="email" autocomplete="email" required>
            <p class="err" id="c_email-err" hidden>Please enter a valid email address.</p>
          </div>
        </div>
        <fieldset class="field radios">
          <legend>I am a…</legend>
          <label class="check"><input type="radio" name="role" value="Parent" checked> <span>Parent / guardian</span></label>
          <label class="check"><input type="radio" name="role" value="Student"> <span>Student</span></label>
        </fieldset>
        <div class="field">
          <label for="c_msg">Message <span class="req">*</span></label>
          <textarea id="c_msg" name="message" rows="5" required></textarea>
          <p class="err" id="c_msg-err" hidden>Please enter a message.</p>
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Send message ${icon('arrow', { size: 18 })}</button>
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="contact-side">
      <div class="side-card">
        <p class="side-title-dark">Reach us</p>
        <a class="side-link big" href="${SITE.phoneHref}">${icon('phone', { size: 18 })} ${SITE.phoneDisplay}</a>
        <a class="side-link" href="mailto:${SITE.email}">${icon('mail', { size: 18 })} ${SITE.email}</a>
        <p class="side-link">${icon('pin', { size: 18 })} <span>${SITE.address.street}<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}</span></p>
        <div class="hours">${hours}</div>
      </div>
      <div class="stepup-card small">
        <span class="su-ico">${icon('shield', { size: 28 })}</span>
        <p class="su-title">Florida families</p>
        <p>We’re an approved Step Up For Students (PEP) provider — ask about using those funds on your Roadmap Session.</p>
      </div>
      ${trustAside()}
    </div>
  </div>
  <div class="wrap mt-lg">
    <div class="map-wrap">
      <iframe title="Map: Gradeful Test Prep, ${esc(ADDRESS)}" src="https://www.google.com/maps?q=${mapQ}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>
${bookCta()}
`,
  };
}

// ── LEGAL ───────────────────────────────────────────────────────────────────
function legalPage({ path, out, title, h1, description, body }) {
  return {
    path, out, title, description,
    body: `
${pageHero({ eyebrow: 'Legal', title: h1, crumbs: [{ name: h1.replace(/<[^>]+>/g, ''), path }], ctas: false })}
<section class="section" data-review="new-copy">
  <div class="wrap narrow prose">
    <p class="legal-flag">Placeholder policy — pending legal review. Last updated: November 17, 2026.</p>
    ${body}
    <h2>Trademark notice</h2>
    <p>SAT® is a registered trademark of the College Board, which is not affiliated with and does not endorse this website or program.</p>
    <h2>Contact</h2>
    <p>Gradeful Test Prep · ${ADDRESS} · <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</section>`,
  };
}

function privacy() {
  return legalPage({
    path: '/privacy/', out: 'privacy/index.html',
    title: 'Privacy Policy | SAT Blueprint · Gradeful Test Prep',
    h1: 'Privacy <span>policy</span>',
    description: 'How Gradeful Test Prep (SAT Blueprint Method™) collects, uses, and protects information submitted through this website.',
    body: `
<p>This Privacy Policy explains how Gradeful Test Prep (“we,” “us”), which offers the SAT Blueprint Method™, handles information collected through this website.</p>
<h2>Information we collect</h2>
<ul>
  <li><strong>Information you give us.</strong> When you book a Roadmap Session or send a message, we collect what you enter — such as parent/guardian name, phone, email, your student’s first name, grade, test dates, scores, and any notes.</li>
  <li><strong>Scheduling information.</strong> Appointments are booked through our scheduling provider, which receives the details you enter to create your appointment and send confirmations.</li>
  <li><strong>Basic usage data.</strong> Like most websites, our hosting and analytics tools may record standard technical information such as browser type, pages visited, and approximate location.</li>
  <li><strong>Embedded content.</strong> Pages may include embedded videos (YouTube) and maps (Google Maps). Those services may collect data according to their own policies when you interact with them.</li>
</ul>
<h2>How we use it</h2>
<ul>
  <li>To schedule and prepare for your Roadmap Session and respond to your questions.</li>
  <li>To deliver our services to enrolled families, including progress updates and reminders.</li>
  <li>To send information about our programs if you’ve agreed to receive it. You can opt out at any time.</li>
</ul>
<h2>What we don’t do</h2>
<p>We do not sell student or family personal information. We share information only with service providers that help us operate (such as website hosting, scheduling, and communication tools), when required by law, or with your permission.</p>
<h2>Students</h2>
<p>Our services are intended for high school students with the involvement of a parent or guardian. This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13 through it.</p>
<h2>Text messages and email</h2>
<p>If you provide a phone number or email, we may contact you about your appointment or our services. Message and data rates may apply. Reply STOP to opt out of texts, or use the unsubscribe link in any email.</p>
<h2>Security and retention</h2>
<p>We use reasonable safeguards to protect the information we collect and keep it only as long as needed for the purposes above or as required by law.</p>
<h2>Your choices</h2>
<p>You can ask us to access, correct, or delete your information by contacting us using the details below.</p>
<h2>Changes</h2>
<p>We may update this policy from time to time. The “last updated” date above shows when it last changed.</p>`,
  });
}

function terms() {
  return legalPage({
    path: '/terms/', out: 'terms/index.html',
    title: 'Terms of Use | SAT Blueprint · Gradeful Test Prep',
    h1: 'Terms of <span>use</span>',
    description: 'Terms of use for the SAT Blueprint Method™ website operated by Gradeful Test Prep.',
    body: `
<p>By using this website, operated by Gradeful Test Prep (“we,” “us”), you agree to these terms.</p>
<h2>Educational services</h2>
<p>This website describes the SAT Blueprint Method™, an online SAT preparation program. Enrollment, scheduling, pricing, and program details are confirmed directly with each family. Specific terms of enrollment are provided at the time of enrollment.</p>
<h2>No guarantee of results</h2>
<p>Scores, point increases, scholarships, and admissions outcomes shown on this site are examples of past students’ results. They are not a promise or guarantee of future results. Every student is different, and outcomes depend on many factors, including the student’s starting point, effort, and consistency. Scholarship eligibility, including Florida Bright Futures, is determined solely by the administering organizations.</p>
<h2>Website content</h2>
<p>Content on this site — including text, graphics, logos, and The SAT Blueprint™ materials — belongs to Gradeful Test Prep or its licensors and may not be copied or redistributed without permission. Blog articles are general information, not individualized advice.</p>
<h2>Third-party links and services</h2>
<p>This site links to and embeds third-party services such as our scheduler, YouTube, and Google Maps. We are not responsible for their content or practices.</p>
<h2>Limitation of liability</h2>
<p>This website is provided “as is.” To the extent permitted by law, we are not liable for any damages arising from your use of the site.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of the State of Florida.</p>
<h2>Changes</h2>
<p>We may update these terms from time to time. Continued use of the site means you accept the updated terms.</p>`,
  });
}

function notFound() {
  return {
    path: '/404.html',
    out: '404.html',
    title: 'Page Not Found | SAT Blueprint',
    description: 'The page you’re looking for doesn’t exist.',
    noindex: true,
    body: `
<section class="page-hero">
  <div class="wrap narrow center">
    ${eyebrow('404')}
    <h1 class="ph-title">This page <span>isn’t on the blueprint.</span></h1>
    <p class="ph-sub">The page you’re looking for has moved or doesn’t exist. Try one of these instead.</p>
    <div class="cta-row center-row">
      <a class="btn btn-primary" href="/">Go to the homepage</a>
      <a class="btn btn-ghost" href="/book/">Book a Free Roadmap Session</a>
    </div>
  </div>
</section>`,
  };
}

export function allPages() {
  return [
    home(), program(), results(), about(), blogIndex(), ...POSTS.map(blogPost), reviews(), faq(), book(),
    bookConfirmed(), contact(), privacy(), terms(), notFound(),
  ];
}
