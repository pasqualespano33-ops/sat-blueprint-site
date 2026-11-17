import { REMINDER_CADENCE, PARENT_UPDATE_CADENCE, UPCOMING_DATES } from './config.mjs';

// `live: true`  → verbatim from the current live site.
// `live: false` → new copy written for this site; flagged with
//                 data-review="new-copy" so it can be fact-checked
//                 (add ?review to any URL to highlight these blocks).
// `a` is HTML; `text` is the plain-text version used for FAQPage schema.

const dates = UPCOMING_DATES.length
  ? ` Upcoming dates: ${UPCOMING_DATES.join('; ')}.`
  : '';
const reminders = REMINDER_CADENCE ? ` Families get ${REMINDER_CADENCE}.` : '';
const updates = PARENT_UPDATE_CADENCE ? ` Updates come as ${PARENT_UPDATE_CADENCE}.` : '';

export const FAQS = [
  {
    live: true,
    q: 'My teen tried prep before and it didn’t help. Why is this different?',
    text: 'Most prep is generic — same curriculum for everyone, with no real diagnosis of what’s costing points. We pinpoint your teen’s specific weaknesses and target those first, with real feedback every week.',
  },
  {
    live: true,
    q: 'Is it too late for my teen to improve?',
    text: 'Almost never — the SAT is a learnable test, and students often make their biggest gains in a focused stretch before test day. On your Roadmap Session we’ll tell you honestly what’s realistic in the time you have.',
  },
  {
    live: true,
    q: 'Will this work if my teen is already swamped with AP classes and activities?',
    text: 'Yes — that’s exactly what it’s built for. Every hour is targeted and efficient, so your teen prepares strategically without burning out or falling behind elsewhere.',
  },
  {
    live: true,
    q: 'Is the program online or in person?',
    text: 'Fully online over Google Meet — no commute. We’re selling results, not a seat next to someone: the live instruction, feedback, and accountability are what move the score.',
  },
  {
    live: true,
    q: 'What if I only want one-on-one tutoring?',
    text: 'There’s real one-on-one time built in — a personal onboarding, plus brief one-on-one sessions with Patrick when your teen needs them. Combined with small live groups and a fully personalized plan, they get individual attention where it counts.',
  },
  {
    live: true,
    q: 'How much does it cost — and can Step Up cover it?',
    text: 'Pricing is personalized to your teen’s goals and timeline. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring — we’re an approved provider, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.',
    a: 'Pricing is personalized to your teen’s goals and timeline. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring — we’re an <strong>approved provider</strong>, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.',
  },
  {
    live: true,
    q: 'How do I join?',
    text: 'Book a free 45-minute Roadmap Session using the button on this page. Patrick will pinpoint what’s holding your teen’s score back and outline a clear path forward — no pressure, no obligation.',
    a: '<a href="/book/">Book a free 45-minute Roadmap Session</a>. Patrick will pinpoint what’s holding your teen’s score back and outline a clear path forward — no pressure, no obligation.',
  },
  {
    live: false,
    q: 'Is this for the digital SAT? What is Bluebook?',
    text: 'Yes — the program is built around the current digital SAT. Bluebook is College Board’s official testing app, used for full-length practice tests and for the exam itself. Students practice in the same interface and with the same timing they will see on test day. (SAT Blueprint is independent and not affiliated with the College Board.)',
  },
  {
    live: false,
    q: 'How long is the SAT, and how does timing work?',
    text: 'The digital SAT has two sections — Reading and Writing, then Math — each split into two timed modules, with a short break between sections. Testing time is a little over two hours, and the second module of each section adapts to how the student did on the first. Pacing is one of the first things we diagnose, and we train it every week so the clock stops being a surprise. College Board publishes the current official timing, and we always prepare students to that.',
  },
  {
    live: false,
    q: 'Which SAT test date should we target?',
    text: `It depends on your teen’s starting point, school calendar, and scholarship or admissions deadlines. On the Roadmap Session, Patrick maps a realistic test date and a 12-week runway to it.${dates}`,
  },
  {
    live: false,
    q: 'What does homework and accountability look like?',
    text: `Students leave each week with targeted practice built around their weak areas — not random problem sets. Work is reviewed, and weekly office hours mean mistakes don’t linger. Parents stay in the loop the whole way.${reminders}`,
  },
  {
    live: false,
    q: 'Do parents get progress updates?',
    text: `Yes. Parents are part of the process from the first Roadmap Session. You get a clear plan, visibility into how your teen is progressing, and reminders so SAT prep doesn’t disappear behind sports and AP classes.${updates}`,
  },
];
