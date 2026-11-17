// FAQ copy from "SAT Blueprint — Final site copy for implementation".
// `a` is HTML (optional); `text` is the plain-text version used for FAQPage schema.

export const FAQS = [
  {
    id: 'different',
    q: 'My teen tried prep before and it didn’t help. Why is this different?',
    text: 'Most prep is the same for everyone. Nobody finds what’s actually costing your teen points. We find that first, and we fix it first — a method built by co-founders Patrick Spano and Alex Torres, delivered by SAT specialists and tutors alongside them, with a mix of live classes, one-on-one, office hours, and the Digital SAT portal, and with everything tracked.',
  },
  {
    id: 'too-late',
    q: 'Is it too late for my teen to improve?',
    text: 'Almost never. Usually, they’re losing points in the same few places, test after test. Fix those, and the score moves. If you’re early, starting now gives your teen more room. If you’re close to a test date, Patrick will give you honest feedback about what’s realistically possible in the time you have.',
  },
  {
    id: 'busy',
    q: 'Will this work if my teen is already swamped with AP classes and activities?',
    text: 'Yes — that’s who this is built for: juniors and seniors with a full calendar. A full schedule is usually a reason to get a plan, not a reason to wait. Every hour is aimed at the points, so your teen can prep without burnout, wasted time, or falling behind in school.',
  },
  {
    id: 'online',
    q: 'Is the program online or in person?',
    text: 'Yes. It’s fully online, live on Google Meet. No driving. What moves the score is the instruction, the portal practice, the feedback, and the accountability — not sitting in a room.',
  },
  {
    id: 'one-on-one',
    q: 'What if I only want one-on-one tutoring?',
    text: 'There’s real one-on-one time built in — a personal onboarding, plus short sessions with Patrick when your teen needs them. Combined with small live groups (3–6 students) and a personalized plan, they get individual attention where it counts.',
  },
  {
    id: 'cost',
    q: 'How much does it cost — and can Step Up cover it?',
    text: 'Pricing is personalized to your teen’s goals and timeline. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring — we’re an approved provider, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.',
    a: 'Pricing is personalized to your teen’s goals and timeline. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring — we’re an <strong>approved provider</strong>, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.',
  },
  {
    id: 'join',
    q: 'How do I join?',
    text: 'Book a free 45-minute Roadmap Session. Patrick will pinpoint what’s holding your teen’s score back and outline a clear path forward — no pressure, no obligation. You’ll leave with a clear plan, whether you join or not.',
    a: '<a href="/book/">Book a free 45-minute Roadmap Session</a>. Patrick will pinpoint what’s holding your teen’s score back and outline a clear path forward — no pressure, no obligation. You’ll leave with a clear plan, whether you join or not.',
  },
  {
    id: 'bluebook',
    q: 'Is this for the digital SAT? What is Bluebook?',
    text: 'Yes — the program is built around the current digital SAT. Bluebook is College Board’s official testing app, used for full-length practice tests and for the exam itself. Students practice in the same interface and with the same timing they will see on test day. (SAT Blueprint is independent and not affiliated with the College Board.)',
  },
  {
    id: 'timing',
    q: 'How long is the SAT, and how does timing work?',
    text: 'The digital SAT has two sections — Reading and Writing, then Math — each split into two timed modules, with a short break between sections. Testing time is a little over two hours, and the second module of each section adapts to how the student did on the first. Pacing is one of the first things we diagnose, and we train it every week so the clock stops being a surprise. College Board publishes the current official timing, and we always prepare students to that.',
  },
  {
    id: 'test-date',
    q: 'Which SAT test date should we target?',
    text: 'It depends on your teen’s starting point, school calendar, and scholarship or admissions deadlines. On the Roadmap Session, Patrick maps a realistic test date and a 12-week plan around it — often with a backup date after it.',
  },
  {
    id: 'homework',
    q: 'What does homework and accountability look like?',
    text: 'Homework is assigned in the Digital SAT portal, which tracks progress, time studied, and everything your teen does — then gives feedback on what to work on next. Practice tests are analyzed there too. Live classes and weekly checks keep them on track, so you’re not the one nagging.',
  },
  {
    id: 'updates',
    q: 'Do parents get progress updates?',
    text: 'Yes. You get a portal login and a weekly progress report, so you always know where your teen stands without having to nag. You also leave the first Roadmap Session with a clear plan, and reminders keep prep from disappearing behind sports and AP classes.',
  },
];

export const faqById = (id) => FAQS.find((f) => f.id === id);
