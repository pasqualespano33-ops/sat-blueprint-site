import { SITE, COACHES, OFFICE_HOURS_TIME } from './config.mjs';
import {
  STATS, CREDENTIALS, RESULTS, TESTIMONIALS, PROOF_NOTES, VIDEOS, INCLUDES, INCLUDES_INTRO, STEPS, PILLARS, PAINS,
  COMPARE, SCREENSHOTS, SCORE_REPORTS,
} from './data.mjs';
import { readFileSync } from 'node:fs';
import { FAQS, faqById } from './faq.mjs';
import { POSTS, CATEGORIES } from './posts.mjs';
import {
  icon, stars, esc, eyebrow, reassure, ctaPair, pageHero, trustBar, statsBand, testimonialCard, resultCard,
  proofNote, scoreReport, jumpCard, videoCard, scheduleModule, parentBlock, trustAside, finalCta, faqAccordion, blogCard, ticker, admitsTicker, satCountdown,
  breadcrumbs, ORG_ID, PERSON_ID, ADDRESS, RISK_REDUCER,
} from './layout.mjs';

const slug = (s) => s.toLowerCase().replace(/™/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const T = Object.fromEntries(TESTIMONIALS.map((t) => [t.id, t]));
const R = Object.fromEntries(RESULTS.map((r) => [r.name, r]));
const ALEX_ID = `${SITE.url}/#alex`;

// ── Shared section builders ─────────────────────────────────────────────────
function includesGrid() {
  return `<div class="inc-grid">${INCLUDES.map((c) => `<article class="inc-card reveal" id="${slug(c.title)}">
      <span class="inc-ico">${icon(c.icon, { size: 26 })}</span>
      <h3 class="inc-title">${c.title}</h3>
      <p class="inc-body">${c.body}</p>
    </article>`).join('')}</div>`;
}

function methodSection({ intro = '' } = {}) {
  return `<section class="section bg-surface" id="method">
  <div class="wrap">
    <div class="center-head reveal">
      ${eyebrow('The SAT Blueprint Method™')}
      <h2 class="h2">Three pillars. <span>One clear system.</span></h2>
      ${intro ? `<p class="lead">${intro}</p>` : ''}
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
  </div>
</section>`;
}

function notesWall(notes = PROOF_NOTES) {
  return `<div class="notes-grid">${notes.map((n) => `<div class="reveal">${proofNote(n)}</div>`).join('')}</div>`;
}

function shotFig(s, cls = '', { caption = true, ctx = '' } = {}) {
  return `<figure class="shot${cls} reveal">
        <a class="shot-link" href="/assets/img/proof/${s.file}.jpg" data-lightbox aria-label="View full size: ${esc(s.title)}, ${esc(s.result)}">
          <picture><source srcset="/assets/img/proof/${s.file}.webp" type="image/webp"><img src="/assets/img/proof/${s.file}.jpg" alt="${esc(s.alt)}" width="700" height="${s.h || 900}" loading="lazy"></picture>
        </a>
        ${ctx ? `<figcaption class="shot-ctx">${ctx}</figcaption>` : caption ? `<figcaption><strong>${s.title}</strong><span>${s.result}</span></figcaption>` : ''}
      </figure>`;
}
const shotBy = (f) => SCREENSHOTS.find((x) => x.file === f);

function scoreReports({ dark = false, title = true } = {}) {
  return `${title ? `<h3 class="group-title${dark ? ' on-dark-title' : ''} mt-lg reveal">Official score reports</h3>` : ''}
    <div class="sr-grid">${SCORE_REPORTS.map((r) => `<div class="reveal">${scoreReport(r)}</div>`).join('')}</div>`;
}

function screenshotWall({ bg = '' } = {}) {
  return `<section class="section ${bg}" id="screenshots">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Original messages')}
      <h2 class="h2">Straight from <span>Patrick’s phone.</span></h2>
      <p class="lead">Real texts and emails from students and parents, unedited. Names, numbers, and photos are hidden to protect privacy. Tap any message to see it full size.</p>
    </div>
    <div class="shot-grid">
      ${SCREENSHOTS.map((x) => shotFig(x)).join('')}
    </div>
  </div>
</section>`;
}

function resultsDisclaimer() {
  return `<p class="fine-print">Results shown are real outcomes from past SAT Blueprint students, not typical or future results. Every student is different; individual results depend on each student’s starting point, effort, and consistency. Bright Futures and scholarship eligibility are determined solely by their administering organizations, not by Gradeful Test Prep.</p>`;
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

function bookCta({ title = 'Find out exactly what’s holding the score back.', sub = `A free 45-minute Roadmap Session with Patrick. ${RISK_REDUCER}` } = {}) {
  return `<section class="cta-strip">
  <div class="wrap cs-inner reveal">
    <div><h2 class="cs-title">${title}</h2><p>${sub}</p></div>
    <div class="cs-actions"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>${reassure('', { plan: false })}</div>
  </div>
</section>`;
}

function compareTable() {
  return `<div class="compare reveal" role="region" aria-label="SAT Blueprint compared with typical SAT prep" tabindex="0">
      <table>
        <thead><tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col" class="c-us"><img src="/assets/img/logo-mark-96.png" alt="" width="32" height="26"> SAT Blueprint</th><th scope="col">Typical prep</th></tr></thead>
        <tbody>
          ${COMPARE.map((f) => `<tr><th scope="row">${f}</th><td class="c-us"><span class="yes">${icon('check', { size: 18, label: 'Yes' })}</span></td><td><span class="no">${icon('close', { size: 16, label: 'Usually not' })}</span></td></tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function teamCards() {
  const alexPhoto = SITE.alexPhoto
    ? `<img class="team-photo" src="${SITE.alexPhoto}" alt="Alex Torres, Educational Director of the SAT Blueprint Method" width="160" height="160" loading="lazy">`
    : '<span class="team-photo team-initials" aria-hidden="true">AT</span>';
  return `<div class="team-grid">
      <article class="team-card reveal">
        <picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img class="team-photo" src="/assets/img/patrick-headshot.jpg" alt="Patrick Spano, founder of the SAT Blueprint Method" width="160" height="160" loading="lazy"></picture>
        <div>
          <h3>Patrick Spano</h3>
          <p class="team-role">Founder</p>
          <ul class="team-creds">${CREDENTIALS.map((c) => `<li>${icon('check', { size: 15 })}${c}</li>`).join('')}</ul>
        </div>
      </article>
      <article class="team-card reveal">
        ${alexPhoto}
        <div>
          <h3>Alex Torres</h3>
          <p class="team-role">Educational Director</p>
          <ul class="team-creds">
            <li>${icon('check', { size: 15 })}Yale graduate</li>
            <li>${icon('check', { size: 15 })}17 years of experience as an SAT instructor</li>
            <li>${icon('check', { size: 15 })}3,500 instructional videos on YouTube</li>
            <li>${icon('check', { size: 15 })}Helped students achieve seven 1500+ SAT scores in a 7-month stretch</li>
          </ul>
        </div>
      </article>
    </div>`;
}

function founderBlock() {
  return `<section class="section" id="founder">
  <div class="wrap">
    <div class="split-head reveal">
      <div>
        <p class="eyebrow">Meet your coaches</p>
        <h2 class="h2">“Most students aren’t stuck <span>for lack of effort.”</span></h2>
      </div>
      <div>
        <p class="lead">SAT Blueprint is led by founder Patrick Spano and Educational Director Alex Torres — two Yale graduates with more than 30 years of SAT teaching between them. Patrick played goalie at Yale, then pro hockey in the US and Europe, and he coaches the SAT the way he trained: you don’t get better by playing more games, you get better by studying the tape. Alex leads the teaching behind the program, drawing on 17 years as an SAT instructor and more than 3,500 instructional videos. Together, they find exactly where your teen is losing points — and build the plan to win them back.</p>
      </div>
    </div>
    ${teamCards()}
  </div>
</section>`;
}

function heroMedia(hasVideo) {
  if (hasVideo) {
    const id = SITE.promoVideoYouTubeId;
    return `<div class="hv-video">
      <div class="video" data-yt="${id}" data-title="SAT Blueprint — how we help your teen raise their SAT score">
        <button type="button" class="video-play" aria-label="Play video: how SAT Blueprint helps your teen raise their SAT score">
          <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="" width="1280" height="720" fetchpriority="high">
          <span class="vp-btn">${icon('play', { size: 30 })}</span>
        </button>
        <noscript><a href="https://www.youtube.com/watch?v=${id}">Watch the video on YouTube</a></noscript>
      </div>
    </div>`;
  }
  return `<div class="hv-frame">
      <picture>
        <source srcset="/assets/img/patrick-headshot.webp" type="image/webp">
        <img src="/assets/img/patrick-headshot.jpg" width="433" height="517" alt="Patrick Spano, founder of the SAT Blueprint Method" fetchpriority="high">
      </picture>
    </div>`;
}

function phoneVideo() {
  return `<div class="phone-video">
      <div class="pv-screen">
        <video class="pv-video" src="${SITE.heroVideoFile}"${SITE.heroVideoPoster ? ` poster="${SITE.heroVideoPoster}"` : ''} autoplay muted loop playsinline preload="metadata" aria-label="Patrick Spano explains how SAT Blueprint helps your teen raise their SAT score (captions included)"></video>
        <button type="button" class="pv-sound" data-video-sound aria-pressed="false">${icon('play', { size: 14 })}<span>Tap for sound</span></button>
      </div>
    </div>`;
}

function proofCard() {
  return `<figure class="proof-card">
      <p class="pc-kick">Real result</p>
      <p class="pc-score" role="img" aria-label="1230 to 1430"><span class="from" aria-hidden="true">1230</span><span class="arr" aria-hidden="true">${icon('arrow', { size: 30 })}</span><span class="to" aria-hidden="true" data-count-from="1230" data-count-to="1430">1430</span></p>
      <figcaption>Eshaan · +200 points · “Thank you Patrick!” — Preethi, parent of Eshaan</figcaption>
    </figure>`;
}

// ── HOME ────────────────────────────────────────────────────────────────────
function home() {
  const jumps = [
    { name: 'Drew V.', before: 1040, after: 1380, beforeLabel: 'PSAT', afterLabel: 'SAT', quote: '“Just wanted to thank you for all the help and support you gave me. I got a 1380 on my last SAT.”' },
    { name: 'Sammi W.', before: 1040, after: 1280, quote: 'From 1040 to 1280 — a 240-point boost.' },
    { name: 'Eitan', before: 850, after: 1080, quote: '“Tysm up by 200+ from last score”' },
  ];
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const vertical = Boolean(SITE.heroVideoFile);
  const hasVideo = vertical || Boolean(SITE.promoVideoYouTubeId);
  const bento = [
    { ...INCLUDES[0], cls: 'b-wide b-blue' },
    { ...INCLUDES[1], cls: 'b-tall b-ink' },
    { ...INCLUDES[2], cls: '' },
    { ...INCLUDES[3], cls: '' },
    { ...INCLUDES[4], cls: '' },
    { ...INCLUDES[5], cls: 'b-gold' },
  ];
  const h1 = hasVideo
    ? 'Watch the video and discover how we help your teen raise their SAT score <span>by 200 points.</span>'
    : 'Discover how we help your teen raise their SAT score <span>by 200 points.</span>';
  return {
    path: '/',
    out: 'index.html',
    title: 'SAT Blueprint Method™ — Help Your Teen Raise Their SAT Score',
    ogTitle: 'SAT Blueprint Method™ — Help Your Teen Raise Their SAT Score',
    description: 'See how the SAT Blueprint Program helps your teen raise their SAT score with a clear plan, not more guessing. Live online coaching from founder Patrick Spano and Educational Director Alex Torres, a team of SAT specialists and tutors, and a personalized Digital SAT portal. Book a free Roadmap Session.',
    headExtra: '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js" defer></script>',
    bodyClass: 'is-home',
    schema: [],
    body: `
<section class="hero hero-v${vertical ? ' has-vertical' : hasVideo ? ' has-video' : ''}">
  <div class="wrap hv-grid">
    <div class="hv-copy">
      <p class="hb-kick">Live online SAT coaching for high schoolers</p>
      <h1 class="hero-title">${h1}</h1>
      ${hasVideo && !vertical ? heroMedia(true) : ''}
      <p class="hero-sub">The SAT Blueprint Program finds exactly where your teen is losing points, then builds a live, personalized plan to go after them. Book a free Roadmap Session and leave with that plan, whether you join or not.</p>
      ${ctaPair({ dark: true })}
      ${reassure('hero-reassure')}
      <div class="hb-coach"><picture><source srcset="/assets/img/patrick-headshot.webp" type="image/webp"><img src="/assets/img/patrick-headshot.jpg" alt="Patrick Spano, founder of the SAT Blueprint Method" width="40" height="48"></picture><p>Coached by <strong>Patrick Spano</strong> · Yale graduate · 99th Percentile SAT Scorer<span>${stars(5)} Trusted by 2,000+ families</span></p></div>
    </div>
    <div class="hv-side">
      ${vertical ? phoneVideo() : hasVideo ? '' : heroMedia(false)}
      ${proofCard()}
    </div>
  </div>
</section>

${admitsTicker()}
${satCountdown()}

${founderBlock()}

<section class="section bg-surface" id="method">
  <div class="wrap">
    <div class="center-head reveal">
      <p class="eyebrow">Our learning method</p>
      <h2 class="h2">The SAT Blueprint Method™. <span>Assess. Address. Success.</span></h2>
      <p class="lead">Most prep is more practice without looking at the tape. We find exactly where your teen is losing points, then fix those first.</p>
    </div>
    <div class="pillars3">
      ${PILLARS.map((p, i) => `<article class="p3 reveal"><p class="p3-n">0${i + 1}</p><h3 class="p3-name">${p.key}</h3><p class="p3-sub">${p.sub}</p><ul>${p.items.map((it) => `<li>${icon('check', { size: 16 })}${it}</li>`).join('')}</ul></article>`).join('')}
    </div>
    <div class="method-inc reveal">
      <p class="mi-label">Inside the program</p>
      <ul class="mi-chips">
        <li>${icon('live', { size: 16 })}Weekly live instruction classes</li>
        <li>${icon('users', { size: 16 })}1-on-1 support</li>
        <li>${icon('office', { size: 16 })}Office hours</li>
        <li>${icon('clock', { size: 16 })}Mock exams</li>
        <li>${icon('plan', { size: 16 })}Weekly homework assignments</li>
        <li>${icon('portal', { size: 16 })}Digital SAT study portal</li>
        <li>${icon('eye', { size: 16 })}Parent portal login &amp; weekly progress reports</li>
      </ul>
      <p class="mi-more">Go deeper on how Assess, Address, and Success teach the language of the SAT.</p>
      <a class="link-arrow" href="/method/">See how the method works ${icon('arrow', { size: 16 })}</a>
    </div>
    <div class="center mt-lg reveal"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>${reassure()}</div>
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
        <p class="lead on-dark">Real messages from students and parents — and the before-and-after scores behind them.</p>
        <a class="link-arrow on-dark mt-sm" href="/results/">See all Real Results ${icon('arrow', { size: 16 })}</a>
      </div>
    </div>
    <div class="shot-feature" tabindex="0" role="region" aria-label="Original text messages from students and parents">${[
      ['harry-1510', 'Harry’s 1510 superscore'],
      ['mark-parent-1490', 'Mark’s 150+ point improvement'],
      ['annabel-1550', 'Annabel’s 1550 got her into two Ivy League schools — plus lucrative scholarships'],
      ['liana-1420', 'Liana got into Columbia'],
      ['mauricio-1350', 'Mauricio’s 1350 earned him a 100% scholarship in Florida'],
      ['mia-930-1060', 'Mia’s 130-point increase in only one month'],
    ].map(([f, ctx]) => shotFig(shotBy(f), '', { ctx })).join('')}</div>
    <h3 class="group-title on-dark-title mt-lg reveal">Biggest score jumps</h3>
    <div class="jump-grid">${jumps.map((j) => `<div class="reveal">${jumpCard(j)}</div>`).join('')}</div>
    <div class="center mt-lg reveal"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a>${reassure('on-dark')}</div>
    <p class="fine-print on-dark mt-md">Results shown are real outcomes from past SAT Blueprint students, not typical or future results. Individual results depend on each student’s starting point, effort, and consistency. Bright Futures and scholarship eligibility are determined solely by their administering organizations.</p>
  </div>
</section>

<div class="section-gap"></div>
${finalCta()}
`,
  };
}

// ── THE SAT BLUEPRINT METHOD ────────────────────────────────────────────────
// Spec: method_page_for_coder.md. Titles follow Patrick's instruction:
// Patrick = Founder, Alex = Educational Director.
function program() {
  const steps = [
    {
      n: '01', key: 'Assess', head: 'We find where your teen is getting lost in translation.',
      short: 'A diagnostic and the portal show which question types, wording, and traps are costing them points — and where their effort is going to the wrong places.',
      more: 'We look at gaps, strategy mistakes, and timing, including what the Knowledge and Skills section of the score report is already showing. The point isn’t to assign more practice. It’s to see, clearly, which habits use a lot of energy and earn few points, so the plan starts there. Then we build a week-by-week plan around their target score and test date.',
    },
    {
      n: '02', key: 'Address', head: 'We teach the language — and where the points really are.',
      short: 'Live classes, specialists, and practice in the portal teach the wording the College Board actually uses, how to decode the math, and when to apply each Blueprint strategy.',
      more: 'In reading, that means moving quickly through names, dates, and concrete details — unless they later turn out to be critical — and slowing down on the answer choices, where a single word often separates right from wrong. In math, we focus on the topics the SAT tests most, and we teach when a tool like Desmos actually saves time, instead of treating it as a shortcut for everything. SAT specialists deliver this in live classes of 3–6, with one-on-one and office hours when something stays stuck.',
    },
    {
      n: '03', key: 'Success', head: 'Those choices become instinct under pressure.',
      short: 'Timed practice and progress tracking until the test feels familiar instead of intimidating.',
      more: 'The portal tracks progress, time studied, and everything your teen does, then gives feedback on what to work on next. Parents get a portal login and a weekly progress report. By test day, the judgment — when to skim, when to focus, when to use a tool and when to skip it — is already practiced. The test feels like one more practice test, not a scary new thing.',
    },
  ];
  const why = [
    ['A team of SAT specialists', 'Not generalist tutors. Instructors who live in this test, and know which words, question types, and math ideas carry extra weight.'],
    ['Live classes of 3–6', 'Small enough that your teen isn’t lost in a crowd. Real instruction and feedback, not a stack of videos to watch alone.'],
    ['A mix of instruction formats', 'Live classes, one-on-one, weekly office hours, and practice in the portal — the right medium for the work at hand.'],
    ['Real accountability', 'Homework, reminders, and follow-through, so prep doesn’t disappear behind sports and AP classes — and you’re not the one nagging.'],
    ['A powerful Digital SAT portal', 'It tracks progress, time studied, and everything your teen does, then gives feedback on what to work on next.'],
    ['Parents stay in the loop', 'You get a portal login and a weekly progress report, so you always know where your teen stands.'],
  ];
  const alexImg = SITE.alexPhoto
    ? `<img class="dq-photo" src="${SITE.alexPhoto}" alt="Alex Torres, Educational Director of the SAT Blueprint Method" width="160" height="160" loading="lazy">`
    : '<span class="dq-photo team-initials" aria-hidden="true">AT</span>';
  return {
    path: '/method/',
    out: 'method/index.html',
    title: 'The SAT Blueprint Method™ — How We Teach the Language of the SAT',
    description: 'The SAT is its own language. See how the 12-Week SAT Blueprint Program teaches it through Assess, Address, and Success — so your teen learns where to put their effort, not just how to study more. Book a free Roadmap Session.',
    schema: [
      {
        '@type': 'Course',
        '@id': `${SITE.url}/method/#course`,
        name: 'The 12-Week SAT Blueprint Program',
        description: 'Live online SAT coaching for high schoolers built on the SAT Blueprint Method: Assess, Address, Success. Live classes of 3–6, one-on-one support, office hours, mock exams, weekly homework, a Digital SAT study portal, and weekly progress reports.',
        provider: { '@id': ORG_ID },
        educationalLevel: 'High school',
        teaches: 'Digital SAT Reading and Writing, SAT Math, test-taking judgment, pacing, and Desmos',
        inLanguage: 'en',
        timeRequired: 'P12W',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          location: { '@type': 'VirtualLocation', url: `${SITE.url}/method/` },
          instructor: [{ '@id': PERSON_ID }, { '@id': ALEX_ID }],
        },
      },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'The Method', path: '/method/' }]),
    ],
    body: `
<section class="page-hero method-hero">
  <div class="wrap mh-grid">
    <div>
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">The Method</span></li></ol></nav>
      ${eyebrow('The SAT Blueprint Method™')}
      <h1 class="ph-title">The SAT is its own language. <span>We teach your teen how to read it.</span></h1>
      <p class="ph-sub">The vocabulary is advanced, the passages read like professional writing, and the math questions ask for answers in ways no classroom does. Motivated students still stall — not for lack of effort, but because they haven’t learned how the test communicates. The 12-Week SAT Blueprint Program teaches that language, and the judgment to know where to put their energy.</p>
      ${ctaPair({ dark: false })}
      ${reassure()}
    </div>
    <ol class="mh-diagram" aria-label="The SAT Blueprint Method in four steps">
      <li><span class="mh-dot" aria-hidden="true"></span>The SAT is its own language</li>
      <li><span class="mh-dot" aria-hidden="true"></span>The Blueprint teaches it</li>
      <li><span class="mh-dot" aria-hidden="true"></span>Judgment is the skill</li>
      <li class="is-gold"><span class="mh-dot" aria-hidden="true"></span>Assess · Address · Success</li>
    </ol>
  </div>
</section>

<section class="section" id="language">
  <div class="wrap lang-grid">
    <div class="reveal">
      ${eyebrow('Why the test feels harder than it should')}
      <h2 class="h2">The SAT is its own world, <span>with its own language.</span></h2>
      <div class="prose-sm">
        <p>For most teens, the SAT has a high intimidation factor. The wording is unfamiliar. Common words show up with unexpected meanings. Math answers are requested in ways that don’t look like homework. It’s hard to stay motivated when the test feels designed to trip them up.</p>
        <p>The problem usually isn’t intelligence or work ethic. They just haven’t learned the language yet.</p>
        <p>The test emphasizes algebra, basic geometry, and shorter passages — a design meant to keep it fair and accessible. To still differentiate students, difficulty gets layered in other ways: unconventional wording, unusual uses of everyday words, and vocabulary that’s common in literature and the professional world, but outside most students’ working vocabulary. The SAT also has favorite words and favorite math ideas — the ones that come up again and again.</p>
        <p>That’s what the SAT Blueprint is: a guide to how the test thinks, so your teen can stop guessing and start recognizing what each question is really asking.</p>
      </div>
    </div>
    <div class="lang-cards reveal" aria-label="How the SAT layers difficulty">
      <p class="lc-title">How the SAT layers difficulty</p>
      <div class="lc"><p class="lc-label">Word</p><p class="lc-ex">engender</p><p>An SAT “pet word.” Most students rarely use it. The test does.</p></div>
      <div class="lc"><p class="lc-label">Word</p><p class="lc-ex">disrupt, consequence</p><p>Everyday words the SAT sometimes uses with a positive meaning — not the way students expect.</p></div>
      <div class="lc"><p class="lc-label">Math</p><p class="lc-ex">the unit circle</p><p>A favorite SAT math idea, along with others like the altitude to the hypotenuse of a right triangle. These carry extra weight on this test.</p></div>
    </div>
  </div>
</section>

<section class="section bg-surface" id="judgment">
  <div class="wrap judgment reveal">
    ${eyebrow('What students actually learn')}
    <h2 class="h2">The real skill is <span>judgment.</span></h2>
    <p>Students can’t be detail-focused all the time, or general all the time. They need to know which one each moment calls for.</p>
    <p>That’s the same kind of judgment a successful college student develops — knowing when to bear down and when to ease up, when a situation calls for precision and when it calls for speed. It’s not just a test-taking trick. It’s the skill that separates a student who works hard from a student who works on the right things.</p>
    <p>The Blueprint builds that judgment. Assess, Address, and Success are the three stages of getting there.</p>
    <p class="judgment-pull">That’s the skill the Blueprint builds.</p>
  </div>
</section>

<section class="section" id="assess-address-success">
  <div class="wrap">
    <div class="center-head reveal">
      ${eyebrow('The three stages')}
      <h2 class="h2">Assess. Address. <span>Success.</span></h2>
      <p class="lead">This is how the 12-Week SAT Blueprint Program turns the language of the SAT into habit.</p>
    </div>
    <ol class="stage-line">
      ${steps.map((s, i) => `<li class="stage reveal">
        <span class="st-n">${s.n}</span>
        <p class="st-key">${s.key}</p>
        <h3>${s.head}</h3>
        <p>${s.short}</p>
        <div class="st-more" id="stage-more-${i}" hidden><p>${s.more}</p></div>
        <button type="button" class="st-toggle" data-more aria-expanded="false" aria-controls="stage-more-${i}"><span>Learn more</span>${icon('plus', { size: 16 })}</button>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="section bg-surface" id="reading">
  <div class="wrap">
    <div class="center-head reveal">
      ${eyebrow('Reading and Writing')}
      <h2 class="h2">How most students read <span>vs. how we teach.</span></h2>
      <p class="lead">Most students put their energy into the passage and pick an answer relatively quickly. We flip that.</p>
    </div>
    <div class="vs-grid">
      <div class="vs-card reveal">
        <p class="vs-head">How most students read</p>
        <ul>
          <li>Spend the most effort on the text itself</li>
          <li>Hang on to names, dates, and concrete details</li>
          <li>Choose an answer relatively quickly</li>
          <li>A lot of effort, not enough return</li>
        </ul>
      </div>
      <div class="vs-card is-us reveal">
        <p class="vs-head"><span class="vs-badge">SAT Blueprint</span>How we teach it</p>
        <ul>
          <li>Breeze through the passage first</li>
          <li>Deprioritize specifics unless they later prove critical</li>
          <li>Read the answer choices with much more attention — often one word is the difference</li>
          <li>Feels like less effort, and they extract more value</li>
        </ul>
      </div>
    </div>
    <p class="vs-close reveal">We teach students to tell the difference between the extreme specifics of SAT passages and the structural cues in the writing that actually help them. That’s judgment, applied to Reading and Writing.</p>
  </div>
</section>

<section class="section" id="desmos">
  <div class="wrap">
    <div class="desmos reveal">
      ${eyebrow('Math, and a common myth')}
      <h2 class="h2">Desmos can help. <span>It isn’t a shortcut for everything.</span></h2>
      <div class="vs-grid">
        <div class="vs-card"><p class="vs-head">The myth</p><p>Become extremely proficient at solving everything in Desmos, and you’ll have a big advantage.</p></div>
        <div class="vs-card is-us"><p class="vs-head">The reality</p><p>Some of that chatter is exaggerated. Desmos can save real time and energy on certain questions — and for some students, those advantages are real. For many others, it becomes another place to get lost, if they’re using it in ways that don’t actually help.</p></div>
      </div>
      <p class="vs-close">The skill is the same one we teach everywhere else: knowing what is appropriate for a given situation. That’s what your teen gets from a team that focuses on the SAT, not a general tutoring center.</p>
    </div>
  </div>
</section>

<section class="section bg-ink" id="educational-director">
  <div class="wrap dq reveal">
    ${alexImg}
    <div>
      <p class="eyebrow on-dark">From our Educational Director</p>
      <p class="dq-intro">Alex Torres, our Educational Director, puts the whole method in one idea:</p>
      <blockquote class="dq-quote"><p>“A student can’t succeed by being general all the time, or by having high attention to detail all the time. They need the judgment to know which emphasis to have at which moment. It’s the judgment about what is appropriate at various moments that separates the successful college student — and test taker.”</p></blockquote>
      <p class="dq-name">Alex Torres</p>
      <p class="dq-role">Educational Director</p>
      <p class="dq-creds">Yale graduate · 17 years as an SAT instructor · 3,500 instructional videos on YouTube</p>
      <a class="link-arrow on-dark mt-sm" href="/#founder">Meet the team ${icon('arrow', { size: 16 })}</a>
    </div>
  </div>
</section>

${finalCta()}
`,
  };
}

// ── REAL RESULTS (Results + Reviews merged) ─────────────────────────────────
function results() {
  // Home already shows these six originals; Results shows the rest (no duplicates).
  const HOME_SHOTS = ['harry-1510', 'mark-parent-1490', 'annabel-1550', 'liana-1420', 'mauricio-1350', 'mia-930-1060'];
  const parents = TESTIMONIALS.filter((t) => t.type === 'parent');
  const reviewSchema = parents.map((t) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ORG_ID },
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.quote,
  }));
  return {
    path: '/results/',
    out: 'results/index.html',
    title: 'Real Results — Video Testimonials, Parent Reviews & Original Messages | SAT Blueprint',
    description: 'Real SAT Blueprint families: video testimonials from students, reviews from parents, and original texts and emails sharing their scores, admits, and scholarships.',
    schema: [...reviewSchema, breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Real Results', path: '/results/' }])],
    body: `
${pageHero({
  eyebrow: 'Real Results',
  title: 'Real students. <span>Real scores. Real families.</span>',
  sub: 'These families came in unsure of the plan. Here are the scores, scholarships, and college admits they earned — and what they told us afterward.',
  crumbs: [{ name: 'Real Results', path: '/results/' }],
})}

${admitsTicker({ link: false })}

${videosSection()}

<section class="section bg-surface" id="parents">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Parent testimonials')}
      <h2 class="h2">What parents <span>are saying.</span></h2>
    </div>
    <div class="t-grid">${parents.map((t) => `<div class="reveal">${testimonialCard(t)}</div>`).join('')}</div>
  </div>
</section>

${bookCta({ title: 'Want a plan like theirs?', sub: `A free 45-minute Roadmap Session with Patrick. ${RISK_REDUCER}` })}

<section class="section" id="screenshots">
  <div class="wrap">
    <div class="sec-head reveal">
      ${eyebrow('Original messages')}
      <h2 class="h2">Straight from <span>Patrick’s phone.</span></h2>
      <p class="lead">Real texts and emails from students and parents, unedited. Names, numbers, and photos are hidden to protect privacy. Tap any message to see it full size.</p>
    </div>
    <div class="shot-grid">
      ${SCREENSHOTS.filter((x) => !HOME_SHOTS.includes(x.file)).map((x) => shotFig(x)).join('')}
    </div>
  </div>
</section>

<section class="section-tight"><div class="wrap narrow">${resultsDisclaimer()}</div></section>

${bookCta({ title: 'See what these families achieved — then map out a plan for yours.' })}
`,
  };
}

// ── BLOG ────────────────────────────────────────────────────────────────────
function blogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return {
    path: '/blog/',
    out: 'blog/index.html',
    title: 'SAT Blog for Parents — Digital SAT, Scholarships & Prep That Works | SAT Blueprint',
    description: 'Practical SAT guidance for parents of high schoolers: the digital SAT and Bluebook, score strategy, Florida Bright Futures scholarships, and signs prep isn’t working.',
    schema: [
      { '@type': 'Blog', '@id': `${SITE.url}/blog/#blog`, name: 'SAT Blueprint Blog', publisher: { '@id': ORG_ID }, url: `${SITE.url}/blog/` },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }]),
    ],
    body: `
${pageHero({
  eyebrow: 'The SAT Blueprint Blog',
  title: 'Clear SAT guidance <span>for parents.</span>',
  sub: 'Straight answers on the digital SAT, scholarships, and why some prep never moves the score — from Patrick Spano, the coach behind the SAT Blueprint Method™.',
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
  sub: 'Straight answers about the SAT Blueprint Program, pricing, Step Up For Students, and the digital SAT. Don’t see your question? Ask Patrick on your free Roadmap Session.',
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
    'Review where your teen stands today — starting score, next test date, and target. If you have a score report, we’ll look at the Knowledge and Skills section together.',
    'Pinpoint what’s holding the score back — content gaps, strategy, timing, or mindset.',
    'Give you honest feedback about what’s realistically possible for your teen based on where they currently stand, and talk through a timeline around their schedule and test date.',
    'Identify common mistakes families make with prep and retakes.',
    'Leave you with a clear plan, whether you join or not.',
  ];
  return {
    path: '/book/',
    out: 'book/index.html',
    title: 'Book a Free SAT Roadmap Session with Patrick Spano | SAT Blueprint',
    description: 'Book a free 45-minute SAT Roadmap Session over Google Meet. Patrick Spano will pinpoint what’s holding your teen’s score back and map a clear plan. No obligation.',
    bodyClass: 'is-book',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Book a Free Roadmap Session', path: '/book/' }])],
    scripts: '<script src="https://link.gradefultestprep.com/js/form_embed.js" async></script>',
    body: `
<section class="page-hero book-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page">Book a Free Roadmap Session</span></li></ol></nav>
    ${eyebrow('Free — Zero Obligation')}
    <h1 class="ph-title">What happens on your <span>free Roadmap Session?</span></h1>
    <p class="ph-sub">A free 45-minute Roadmap Session that gives you a clear read on your teen’s SAT situation, and honest feedback about what’s realistically possible based on where they currently stand. You’ll leave with a clear plan, whether you join or not.</p>
    <ul class="logistics" aria-label="Session details">
      <li>${icon('check', { size: 16 })} Free</li>
      <li>${icon('clock', { size: 16 })} 45 minutes</li>
      <li>${icon('live', { size: 16 })} Google Meet</li>
      <li>${icon('users', { size: 16 })} With Patrick Spano</li>
      <li class="lg-gold">${icon('clock', { size: 16 })} Limited spots — groups fill before SAT dates</li>
    </ul>
  </div>
</section>

<section class="section book-section" id="booking">
  <div class="wrap book-grid">
    <div class="book-form-col">
      <div class="form-card form-card-cal">
        <h2 class="form-title">Book a Free Roadmap Session</h2>
        <p class="form-reassure">Pick any open 45-minute slot below (shown in your time zone). You’ll get a confirmation and a Google Meet link by email.</p>
        <div class="scheduler">
          <iframe src="${SITE.bookingUrl}" title="Pick a time for your free Roadmap Session" id="sat-roadmap-booking" scrolling="no" loading="eager"></iframe>
        </div>
        <p class="hint mt-sm">Trouble loading the calendar? <a href="${SITE.bookingUrl}" target="_blank" rel="noopener">Open the scheduler in a new tab</a>, or call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>.</p>
        <p class="privacy-note">${icon('lock', { size: 14 })} We never sell student or family data. See our <a href="/privacy/">Privacy Policy</a>.</p>
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
      ${eyebrow('During the session')}
      <h2 class="h2">On your session, <span>Patrick will:</span></h2>
      <ol class="num-list">${willDo.map((w) => `<li>${w}</li>`).join('')}</ol>
    </div>
    <div class="reveal">
      <div class="attend-card">
        <h3>${icon('users', { size: 20 })} Please attend with your teen</h3>
        <p>The session is designed for parents of high school students looking for clarity and help with the SAT. Please attend with your teen. If both parents are involved in college-planning decisions, plan to join the session together.</p>
      </div>
      <div class="promise-card">
        <h3>${icon('compass', { size: 20 })} What you can expect</h3>
        <p>You’ll leave your free Roadmap Session knowing what’s holding your teen’s score back, what’s realistically possible, and what it takes to fix it — whether you join or not. No pressure, and no obligation. You’ll have a concrete plan you can act on, and if SAT Blueprint is a fit, we can talk about how to get your teen started.</p>
      </div>
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
  sub: 'Have a question before you book, or already a current family? Send a note, call, or email — Patrick will get back to you. If you want a full plan for your teen, the best first step is a free Roadmap Session.',
  crumbs: [{ name: 'Contact', path: '/contact/' }],
  ctas: false,
})}
<section class="section">
  <div class="wrap contact-grid">
    <div class="form-card">
      <h2 class="form-title">Send a message</h2>
      <p class="hint">For general questions. Ready for a plan? <a href="/book/">Book a Free Roadmap Session</a> instead.</p>
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
<p>This website describes the SAT Blueprint Method™ and the 12-Week SAT Blueprint Program, online SAT preparation offered by Gradeful Test Prep. Enrollment, scheduling, pricing, and program details are confirmed directly with each family. Specific terms of enrollment are provided at the time of enrollment.</p>
<h2>About the results on this site</h2>
<p>Scores, point increases, scholarships, and admissions outcomes shown on this site are examples of past students’ results, not typical or future results. Every student is different, and outcomes depend on many factors, including the student’s starting point, effort, and consistency. Scholarship eligibility, including Florida Bright Futures, is determined solely by the administering organizations.</p>
<h2>Website content</h2>
<p>Content on this site — including text, graphics, logos, and The SAT Blueprint™ materials — belongs to Gradeful Test Prep or its licensors and may not be copied or redistributed without permission.</p>
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

// ── FREE RESOURCES (footer only) ────────────────────────────────────────────
// Data files: src/resources/*.json (source of truth; see src/resources/README.md).
const readRes = (f) => readFileSync(new URL(`./resources/${f}`, import.meta.url), 'utf8');
const SCHOLARSHIPS = JSON.parse(readRes('scholarships_by_state.json'));
const COLLEGES = JSON.parse(readRes('sat_by_college.json'));
const STATE_NAMES = { AL: 'Alabama', AZ: 'Arizona', CA: 'California', CO: 'Colorado', CT: 'Connecticut', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', LA: 'Louisiana', MA: 'Massachusetts', MD: 'Maryland', MI: 'Michigan', MN: 'Minnesota', MO: 'Missouri', NC: 'North Carolina', NH: 'New Hampshire', NJ: 'New Jersey', NY: 'New York', OH: 'Ohio', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VA: 'Virginia', WA: 'Washington', WI: 'Wisconsin', WV: 'West Virginia' };
const stateName = (c) => STATE_NAMES[c] || c;

// Tiny Markdown → HTML for the resource copy (paragraphs, **bold**, [links](url)).
function md(text) {
  return text.trim().split(/\n\s*\n/).filter((b) => !b.startsWith('# ')).map((b) => `<p>${esc(b)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (m, t, u) => (/^https?:/.test(u) && !u.includes('gradefultestprep.com')
      ? `<a href="${u}" target="_blank" rel="noopener">${t}<span class="sr-only"> (opens in a new tab)</span></a>`
      : `<a href="${u.replace('https://gradefultestprep.com', '') || '/'}${u.endsWith('/') || u.includes('://') ? '' : '/'}">${t}</a>`))}</p>`);
}

function stateFilter(states, label) {
  return `<div class="res-filter reveal">
      <label for="state-filter">${label}</label>
      <select id="state-filter" data-state-filter>
        <option value="">All states</option>
        ${states.map((st) => `<option value="${esc(st)}">${esc(stateName(st))}</option>`).join('')}
      </select>
      <p class="sr-only" aria-live="polite" data-state-status></p>
    </div>`;
}

function resourceCta(other) {
  return `<section class="section-tight"><div class="wrap narrow">
    <div class="res-cta reveal">
      <p class="rc-title">Turn these numbers into a plan.</p>
      <p>The SAT Blueprint Method™ is live online over Google Meet. On a free Roadmap Session, Patrick maps the score your teen needs — and the path to get there.</p>
      <div class="rc-actions"><a class="btn btn-primary btn-lg" href="/book/">${icon('calendar', { size: 18 })} Book a Free Roadmap Session</a><a class="link-arrow" href="${other.href}">${other.label} ${icon('arrow', { size: 16 })}</a></div>
      ${reassure('', { plan: false })}
    </div>
  </div></section>`;
}

function scholarshipsPage() {
  const copy = md(readRes('scholarships.md'));
  const [intro, nm, helps, disc] = copy;
  const states = [...new Set(SCHOLARSHIPS.map((r) => r.state))];
  const rows = SCHOLARSHIPS.map((r) => `<tr data-state="${esc(r.state)}">
          <th scope="row" data-label="State">${esc(r.state)}</th>
          <td data-label="Program"><strong>${esc(r.program)}</strong>${r.notes ? `<details class="res-notes"><summary>Details</summary><p>${esc(r.notes).replace(/(https?:\/\/[^\s)]+?)([.,)]*)(?=\s|$)/g, '<a href="$1" target="_blank" rel="noopener">official document</a>$2')}</p></details>` : ''}</td>
          <td data-label="SAT needed">${esc(r.sat_needed)}</td>
          <td data-label="Award">${esc(r.award)}</td>
          <td data-label="Official link"><a class="res-src" href="${esc(r.source_url)}" target="_blank" rel="noopener">Official site ${icon('arrow', { size: 14 })}<span class="sr-only"> for ${esc(r.program)} (opens in a new tab)</span></a></td>
        </tr>`).join('');
  return {
    path: '/scholarships-by-state/',
    out: 'scholarships-by-state/index.html',
    title: 'SAT Scholarships by State — Score Cutoffs & Awards | SAT Blueprint',
    description: 'State merit scholarships tied to SAT scores — Florida Bright Futures, Georgia Zell Miller, Louisiana TOPS and more — with the SAT needed, award, and official links.',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'SAT Scholarships by State', path: '/scholarships-by-state/' }])],
    body: `
${pageHero({
  eyebrow: 'Scholarships & Admissions',
  title: 'SAT scholarships <span>by state.</span>',
  sub: intro.replace(/<\/?p>/g, ''),
  crumbs: [{ name: 'SAT Scholarships by State', path: '/scholarships-by-state/' }],
  ctas: false,
  extra: '<p class="res-asof">Data as of November 18, 2026</p>',
})}
<section class="section res-sec">
  <div class="wrap">
    ${stateFilter(states, 'Show scholarships for')}
    <div class="res-table-wrap reveal" data-state-scope>
      <table class="res-table">
        <caption class="sr-only">State merit scholarships with SAT requirements</caption>
        <thead><tr><th scope="col">State</th><th scope="col">Program</th><th scope="col">SAT needed</th><th scope="col">Award</th><th scope="col">Official link</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="res-copy narrow-left reveal">${nm}${helps}</div>
    <div class="fine-print res-disc">${disc}</div>
  </div>
</section>
${resourceCta({ href: '/sat-scores-by-college/', label: 'See SAT scores by college' })}
`,
  };
}

function collegesPage() {
  const copy = md(readRes('college-scores.md'));
  const [intro, method, helps, disc] = copy;
  const order = ['Tier 1: 1500+', 'Tier 2: 1400–1499', 'Tier 3: 1300–1399', 'Tier 4: 1200–1299', 'Tier 5: 1100–1199', 'Tier 6: under 1100', 'Scores not reported'];
  const states = [...new Set(COLLEGES.map((c) => c.state))].sort((a, b) => stateName(a).localeCompare(stateName(b)));
  const sections = order.map((t) => {
    const list = COLLEGES.filter((c) => c.tier === t);
    if (!list.length) return '';
    const [label, range] = t.includes(':') ? t.split(': ') : ['', t];
    return `<section class="tier-block reveal" data-state-group>
      <h2 class="tier-h">${label ? `<span class="tier-n">${label}</span>` : ''}<span class="tier-r">${range}</span></h2>
      <div class="res-table-wrap">
        <table class="res-table res-colleges">
          <caption class="sr-only">${esc(t)} colleges</caption>
          <thead><tr><th scope="col">College</th><th scope="col">State</th><th scope="col">SAT mid-50%</th><th scope="col">Test policy</th></tr></thead>
          <tbody>${list.map((c) => `<tr data-state="${c.state}"${c.is_sat_blueprint_alumni_school ? ' class="is-alum"' : ''}>
            <th scope="row" data-label="College"><a href="${esc(c.source_url)}" target="_blank" rel="noopener">${esc(c.school_name)}<span class="sr-only"> on College Scorecard (opens in a new tab)</span></a>${c.is_sat_blueprint_alumni_school ? ' <span class="alum-badge">SAT Blueprint alumni</span>' : ''}</th>
            <td data-label="State">${c.state}</td>
            <td data-label="SAT mid-50%" class="${c.sat_middle_50 === 'not reported' ? 'is-na' : 'num'}">${esc(c.sat_middle_50)}</td>
            <td data-label="Test policy">${esc(c.test_policy)}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`;
  }).join('');
  return {
    path: '/sat-scores-by-college/',
    out: 'sat-scores-by-college/index.html',
    title: 'SAT Scores by College — Middle-50% Ranges by Tier | SAT Blueprint',
    description: 'Middle-50% SAT ranges at well-known colleges, grouped by score band, with each school’s test policy. Data from the U.S. Department of Education College Scorecard.',
    schema: [breadcrumbs([{ name: 'Home', path: '/' }, { name: 'SAT Scores by College', path: '/sat-scores-by-college/' }])],
    body: `
${pageHero({
  eyebrow: 'Scholarships & Admissions',
  title: 'SAT scores <span>by college.</span>',
  sub: intro.replace(/<\/?p>/g, ''),
  crumbs: [{ name: 'SAT Scores by College', path: '/sat-scores-by-college/' }],
  ctas: false,
  extra: '<p class="res-asof">Data as of November 18, 2026</p>',
})}
<section class="section res-sec">
  <div class="wrap">
    <div class="res-copy narrow-left reveal">${method}</div>
    <div class="res-tools">
      ${stateFilter(states, 'Show colleges in')}
      <p class="alum-legend reveal"><span class="alum-badge">SAT Blueprint alumni</span> = a college where an SAT Blueprint student has been confirmed</p>
    </div>
    <div data-state-scope>${sections}</div>
    <p class="res-empty" data-state-empty hidden>No colleges from that state on this list yet.</p>
    <div class="res-copy narrow-left reveal mt-lg">${helps}</div>
    <div class="fine-print res-disc">${disc}</div>
  </div>
</section>
${resourceCta({ href: '/scholarships-by-state/', label: 'See SAT scholarships by state' })}
`,
  };
}

export function allPages() {
  return [
    home(), program(), results(), faq(), book(),
    bookConfirmed(), contact(), scholarshipsPage(), collegesPage(), privacy(), terms(), notFound(),
  ];
}
