// Real, public results and testimonials only (from the live site and its
// embedded video testimonials). Do not add entries that haven't happened.

export const STATS = [
  { num: '2,000+', label: 'Families helped' },
  { num: '$1,500,000+', label: 'In scholarships earned' },
  { num: '1600', label: 'Top student score (perfect)' },
  { num: '3–6', label: 'Students per live class' },
];

export const CREDENTIALS = [
  'Yale Graduate',
  '99th Percentile SAT Scorer',
  'Former Professional Athlete',
  '15+ Years Coaching',
];

// before/after only when both numbers are public.
export const RESULTS = [
  { name: 'Wyatt C.', score: 1600, tag: 'Perfect score', detail: 'Now at UF · 100% Bright Futures', featured: true },
  { name: 'Abhi', score: 1580, tag: 'Top score', detail: 'Top 1% nationally' },
  { name: 'Annabel', score: 1550, tag: 'Ivy admit', detail: '750 RW · 800 Math · Accepted to Yale & Princeton', location: 'Weston, FL', featured: true },
  { name: 'Leonardo C.', score: 1540, tag: 'Student', detail: 'Delray Beach, FL', featured: true },
  { name: 'Briana', score: 1530, tag: 'Superscore', detail: '740 RW · 790 Math' },
  { name: 'Mark', score: 1490, tag: 'Result', detail: 'Shared by his parent' },
  { name: 'Eshaan', before: 1230, score: 1430, delta: 200, tag: 'Biggest jumps', detail: 'Within 12 weeks', featured: true },
  { name: 'Liana', score: 1420, tag: 'Result', detail: '“Definitely happy with the improvement”' },
  { name: 'Aarush', score: 1410, delta: 100, tag: 'Video story', detail: '+100 · 100% Bright Futures' },
  { name: 'Sasha', score: 1380, tag: 'Result', detail: 'A huge jump from her last score' },
  { name: 'Mauricio', score: 1350, tag: 'Bright Futures', detail: '100% Bright Futures' },
  { name: 'Tristan', before: 1190, score: 1290, delta: 100, tag: 'Biggest jumps', detail: '+100 points' },
  { name: 'Jacob S.', score: 1260, tag: 'Bright Futures', detail: 'Florida · ~$20,000 in scholarship · Bright Futures 75%' },
  { name: 'Sammi', delta: 240, tag: 'Video story', detail: '+240 point boost' },
  { name: 'Xavier', before: 1090, score: 1200, delta: 110, tag: 'Bright Futures', detail: 'Florida · Bright Futures 75%' },
  { name: 'Jordan', before: 930, score: 1100, delta: 170, tag: 'Biggest jumps', detail: '+170 points' },
  { name: 'Eitan', before: 850, score: 1080, tag: 'Biggest jumps', detail: '' },
  { name: 'Brooklyn', before: 1040, score: 1210, tag: 'Biggest jumps', detail: '' },
];

// Original screenshots (cropped; private details blurred or removed).
export const SCREENSHOTS = [
  { file: 'mauricio-1350', title: 'Mauricio', result: '1350 · 100% Bright Futures', alt: 'Text thread: Mauricio shares his College Board score report for the March 14, 2026 SAT — total 1350, 730 Reading and Writing, 620 Math. Patrick replies “Wow, Congrats” and confirms 100% Bright Futures.' },
  { file: 'aarush-1410', title: 'Aarush', result: '1410 · 700 Math · 710 RW', alt: 'Text from Aarush: “Hey Patrick I got a 1410 on the SAT 700 on math 710 on Reading and Writing.” Aarush adds: “Thank you it was definitely better than I thought I did.”' },
  { file: 'drew-1380', title: 'Drew', result: '1380 · 100% Bright Futures', alt: 'Text from Drew: “Hey sir just wanted to thank you for all the help and support you gave me I got a 1380 on my last SAT.” Patrick replies “Hey Drew that’s amazing!”' },
  { file: 'drew-parent-email-1380', title: 'Drew’s parent', result: 'Email · 1380 · 100% Florida tuition', alt: 'Email from Drew’s parent: “Thought you may want to know Andrew’s last score was 1380 which allows him to get 100% Florida tuition paid.” Patrick replies “Amazing! Thanks for the great news.”' },
  { file: 'parent-1050-1160', title: 'A parent', result: '1050 → 1160', alt: 'Text from a parent: “1050 last SAT that he took this past year. Yesterday he got an 1160. Super proud.” Patrick replies “That’s amazing! Only the start.” Parent: “He was very excited.”' },
  { file: 'superscore-1510', title: 'A student', result: '1510 superscore · 780 Math', alt: 'Text from a student: “I got a 780 on math and a 700 on English so my superscore is now a 1510!” Patrick replies “My guy, 780, Damn.”' },
  { file: 'bright-futures-1340', title: 'A student', result: '1330 · 1340 superscore · 100% Bright Futures', alt: 'Text from a student: “Got a 1330. Got 680 math and 650 reading. But got 660 reading last time so I can superscore it to 1340. Plus one more test in October.” Patrick replies “100% BF.”' },
];

// Verbatim written testimonials from the live site.
export const TESTIMONIALS = [
  {
    id: 'preethi',
    name: 'Preethi',
    role: 'Parent of Eshaan',
    type: 'parent',
    outcome: '1230 → 1430',
    quote: 'The SAT Blueprint program was exactly what our teen needed. We went from unprepared and lacking confidence to a 200 point boost up to a 1430 within 12 weeks. Thank you Patrick!',
  },
  {
    id: 'leonardo',
    name: 'Leonardo C.',
    role: 'Student',
    type: 'student',
    location: 'Delray Beach, FL',
    outcome: '1540',
    quote: 'SAT Blueprint prepared me for the SAT by outlining all my weak areas and building a plan to help me master them. It also taught me how to manage my time effectively. Thanks to this, I was able to score as highly as I did. Thank you!',
  },
  {
    id: 'shari',
    name: 'Shari S.',
    role: 'Parent of Annabel',
    type: 'parent',
    location: 'Weston, FL',
    outcome: '1550 · Yale & Princeton',
    quote: 'Annabel was accepted to Yale and Princeton! She was beyond excited and wanted you to know. She was also accepted to Emory and Johns Hopkins with huge scholarships. She still feels like she’s dreaming.',
  },
  {
    id: 'david',
    name: 'David C.',
    role: 'Parent of Adin',
    type: 'parent',
    location: 'Miami, FL',
    quote: 'Thank you for working with Adin and sharing your knowledge and expertise. He has said repeatedly how much he enjoys your meetings and how much you have helped him master the concepts.',
  },
  {
    id: 'claudia',
    name: 'Claudia Z.',
    role: 'Parent',
    type: 'parent',
    quote: 'Thank you. Super helpful in terms of outlining Bright Futures score requirements and coming up with a plan that could potentially boost scores.',
  },
];

// Restyled proof notes (text messages from the live site). Verbatim.
export const PROOF_NOTES = [
  {
    from: 'Annabel', date: 'Jun 20', score: '1550',
    msgs: [
      { in: true, text: 'Good morning! SAT scores came out this morning. I got a 1550: 750 reading and 800 math. Thank you so much for helping me get there! 🙂' },
      { in: false, text: 'That’s amazing! Yale here you come' },
    ],
  },
  {
    from: 'Parent of Annabel', date: 'Apr 11', score: 'Yale · Princeton',
    msgs: [
      { in: true, text: 'Annabel was accepted to Yale and Princeton! She was beyond excited and wanted you to know.' },
      { in: true, text: 'Also accepted to Emory & Johns Hopkins (huge scholarships), UNC Chapel Hill, UVA, and Tufts 🎉' },
      { in: false, text: 'Wow that is incredible' },
    ],
  },
  {
    from: 'Briana', date: 'Apr 3', score: '1530',
    msgs: [
      { in: true, text: 'hey Patrick!!!! my school SAT score just came out, my superscore is a 1530 now!! 740 RW and 790 math' },
      { in: true, text: 'thanks for all your help!!' },
      { in: false, text: 'That’s amazing. You deserve it' },
    ],
  },
  {
    from: 'Liana', date: '', score: '1420',
    msgs: [
      { in: true, text: 'Hi Patrick! It’s Liana. Just wanted to let you know that I got my SAT score back and I got a 1420' },
      { in: false, text: 'Hey nice job! Are you happy with that?' },
      { in: true, text: 'I definitely am happy with the improvement!' },
    ],
  },
  {
    from: 'Sasha', date: '', score: '1380',
    msgs: [
      { in: true, text: 'I scored a 1380 on the SAT!! My mom is so thrilled, especially compared to my last score 😊' },
      { in: false, text: 'That’s a huge jump — so happy for you!' },
    ],
  },
  {
    from: 'Parent of Mark', date: '', score: '1490',
    msgs: [
      { in: true, text: 'Mark’s SAT is 1490 :) THANK YOU SO MUCH FOR HELPING HIM!!!!!' },
      { in: false, text: 'That’s fantastic — so well deserved! 🎉' },
    ],
  },
];

export const VIDEOS = [
  { id: '5Bi-oBb8rAE', title: 'Mauricio’s 1350 and 100% Bright Futures', name: 'Mauricio', outcome: '1350 · 100% Bright Futures' },
  { id: 'tVnn4XjRJdg', title: 'How Aarush Got a 1410 and Boosted 100 Points', name: 'Aarush', outcome: '1410 · +100 points' },
  { id: 'mWV1HZyed8o', title: 'Sammi’s 240 Point Boost and Overcoming Weaknesses', name: 'Sammi', outcome: '+240 points' },
];

export const INCLUDES = [
  { icon: 'live', title: 'Weekly Live Instruction Sessions', body: 'Live small-group classes each week with SAT specialists — 3–6 students max. Real instruction and feedback, not a stack of videos to watch alone.' },
  { icon: 'portal', title: 'Personalized Digital SAT Portal', body: 'Our proprietary Digital SAT portal is where the work happens. Homework is assigned there, practice tests are analyzed there, and it tracks progress, time studied, and everything your teen does — then gives feedback on what to work on next. You get a portal login and a weekly progress report, so you always know where your teen stands without having to nag.' },
  { icon: 'blueprint', title: 'The SAT Blueprint™', body: 'A streamlined set of the formulas and strategies your teen actually needs — and when to apply them — so they stop hunting through YouTube.' },
  { icon: 'office', title: 'Weekly Office Hours', body: 'Dedicated weekly time for your teen to ask questions and review mistakes — so nothing stays stuck between sessions.' },
  { icon: 'plan', title: 'Fully Customized Study Plan', body: 'A week-by-week plan built around your teen’s starting score, target, test date, and schedule — never a generic template.' },
  { icon: 'trophy', title: 'Scholarship Score Strategy', body: 'We plan around the score thresholds that unlock Bright Futures and merit aid — the number that actually matters for your family.' },
];

export const INCLUDES_INTRO = 'The 12-Week SAT Blueprint Program isn’t more tutoring hours. It’s the experience behind the plan, a team of SAT specialists and tutors around your teen, and the right mix of live classes, one-on-one, office hours, the Digital SAT portal, and practice tests — with accountability, and everything tracked. It’s built for juniors and seniors, so they can prepare for the SAT without burnout, wasted time, or falling behind in school. Patrick Spano (founder) and Alex Torres (co-founder) built the method and the program. Patrick runs the Roadmap Sessions. SAT specialists and tutors deliver the work alongside them.';

export const STEPS = [
  { title: 'Book Your Free SAT Roadmap Session (45 min)', body: 'A free video call where Patrick reviews your teen’s situation, looks at what’s holding the score back, and gives you honest feedback about what’s realistically possible based on where they currently stand. No pressure, no obligation. You’ll leave with a clear plan, whether you join or not.', pill: '' },
  { title: 'Diagnostic Assessment & Custom Blueprint', body: 'A diagnostic finds the exact gaps, strategy mistakes, and timing problems — including what the Knowledge and Skills section of the score report is already showing. Then we build a week-by-week plan around their target score and test date.', pill: 'Personalized — not one-size-fits-all' },
  { title: 'The 12-Week SAT Blueprint Program', body: 'Live classes, one-on-one, office hours, the Digital SAT portal, and practice tests — with homework, accountability, and weekly tracking, so you’re not the one nagging.', pill: '12-week structured program' },
  { title: 'Test Day — Calm, Confident, and Ready', body: 'Your teen walks in knowing what to expect. Timed practice is aimed at their weak spots, so test day feels like one more practice test, not a scary new thing.', pill: 'Score. Scholarship. Dream school.' },
];

export const PILLARS = [
  { key: 'Assess', sub: 'Identify exactly what’s holding the score back', items: ['A diagnostic of gaps, strategy mistakes, and timing', 'What the Knowledge and Skills section is already showing', 'A week-by-week plan around the target score and test date'] },
  { key: 'Address', sub: 'Attack the areas costing the most points', items: ['Small live classes (3–6 students) aimed at those areas', 'The Blueprint’s streamlined formulas and strategies — and when to apply them', 'One-on-one and office hours when something stays stuck'] },
  { key: 'Success', sub: 'Turn practice into confident test-day execution', items: ['Timed practice tests, analyzed in the portal', 'The portal tracks progress and shows what to work on next', 'Test day feels like one more practice test'] },
];

export const PAINS = [
  { title: 'Effort isn’t turning into results', body: 'They’re studying — schoolwork, videos, practice tests — but nobody’s looking at where points are actually being lost, so the score stays stuck.' },
  { title: 'The stress is wearing on everyone', body: 'SAT pressure is taking a toll on your teen — and creating tension at home you both feel.' },
  { title: 'Prep has to fit around school', body: 'Between classes, sports, and activities, prep keeps getting pushed off. A clear plan helps it fit — without burnout, wasted time, or falling behind in school.' },
  { title: 'Scholarships are on the line', body: 'Especially in Florida — a few points can mean the difference between a full scholarship and full tuition.' },
];

export const COMPARE = [
  'Starts with a diagnosis of exactly where points are lost',
  'Live instruction with real feedback every week',
  'Week-by-week plan to a target score and test date',
  'Small live groups — 3–6 students max',
  'Homework reviewed, reminders, and accountability',
  'Parents kept in the loop',
  'Scholarship-score strategy (Bright Futures & merit aid)',
  'Personalized Digital SAT portal — homework, practice-test analysis, and progress you can see',
];

// Homepage "Where our students have been admitted" scroll.
// Real admits and scholarships only. Add new ones as { school, student, note }.
// `note` is optional (e.g. a scholarship amount); `gold: true` highlights it.
export const ADMITS = [
  { school: 'Yale', student: 'Annabel' },
  { school: 'Princeton', student: 'Annabel' },
  { school: 'Johns Hopkins', student: 'Annabel', note: 'Huge scholarship', gold: true },
  { school: 'University of Florida', student: 'Wyatt C.', note: '100% Bright Futures', gold: true },
  { school: 'Emory', student: 'Annabel', note: 'Huge scholarship', gold: true },
  { school: 'UNC Chapel Hill', student: 'Annabel' },
  { school: 'Florida Bright Futures', student: 'Jacob S.', note: '~$20,000 in scholarship', gold: true },
  { school: 'UVA', student: 'Annabel' },
  { school: 'Florida Bright Futures', student: 'Mauricio', note: '100% tuition', gold: true },
  { school: 'Tufts', student: 'Annabel' },
  { school: 'Florida Bright Futures', student: 'Drew', note: '100% tuition', gold: true },
  { school: 'Florida Bright Futures', student: 'Aarush', note: '100% tuition', gold: true },
];
