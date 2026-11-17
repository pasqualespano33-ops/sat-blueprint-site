// Real, public results and testimonials only (from the live site and its
// embedded video testimonials). Do not add entries that haven't happened.

export const STATS = [
  { num: '150+', label: 'Avg. point improvement' },
  { num: '2,000+', label: 'Families helped' },
  { num: '$1,500,000+', label: 'In scholarships earned' },
];

export const CREDENTIALS = [
  'Yale Graduate',
  'Perfect SAT Scorer',
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
  { name: 'Aarush', score: 1410, delta: 100, tag: 'Video story', detail: '+100 points' },
  { name: 'Sasha', score: 1380, tag: 'Result', detail: 'A huge jump from her last score' },
  { name: 'Mauricio', score: 1350, tag: 'Bright Futures', detail: '100% Bright Futures' },
  { name: 'Tristan', before: 1190, score: 1290, delta: 100, tag: 'Biggest jumps', detail: '+100 points' },
  { name: 'Jacob S.', score: 1260, tag: 'Bright Futures', detail: 'Florida · ~$20,000 in scholarship · Bright Futures 75%' },
  { name: 'Sammi', delta: 240, tag: 'Video story', detail: '+240 point boost' },
  { name: 'Xavier', before: 1090, score: 1200, delta: 110, tag: 'Bright Futures', detail: 'Florida · Bright Futures 75%' },
  { name: 'Jordan', before: 930, score: 1100, delta: 170, tag: 'Biggest jumps', detail: '+170 points' },
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
  { icon: 'live', title: 'Weekly Live Instruction Sessions', body: 'Live small-group coaching each week with expert SAT coaches — kept intentionally small, so your teen is never just one of 50. Real instruction and feedback, no pre-recorded fluff.' },
  { icon: 'office', title: 'Weekly Office Hours', body: 'Dedicated weekly time for your teen to ask questions and review mistakes — so nothing stays stuck between sessions.' },
  { icon: 'portal', title: 'Personalized SAT Portal', body: 'Private access to targeted practice and full-length tests, aligned to your teen’s weak areas — not random drills.' },
  { icon: 'blueprint', title: 'The SAT Blueprint™', body: 'Patrick’s proprietary system: every essential formula, strategy, and question-type approach in one powerful reference.' },
  { icon: 'plan', title: 'Fully Customized Study Plan', body: 'A plan built around your teen’s starting score, target, test date, and schedule — never a generic template.' },
  { icon: 'trophy', title: 'Scholarship Score Strategy', body: 'We know the exact score thresholds that unlock Bright Futures and merit aid — and we plan around them.' },
];

export const STEPS = [
  { title: 'Book Your Free SAT Roadmap Session (45 min)', body: 'A free video call where Patrick reviews your teen’s situation, names the biggest obstacles, and maps a path to their target score. No pressure, no pitch — just clarity.', pill: 'Free 45-minute video call' },
  { title: 'Diagnostic Assessment & Custom Blueprint', body: 'Pinpoint the exact gaps, strategy weaknesses, and timing issues — then build a week-by-week plan around their target score and test date.', pill: 'Personalized — not one-size-fits-all' },
  { title: 'The 12-Week SAT Blueprint Program', body: 'Weekly live sessions, office hours, homework with accountability, official-style practice and full-length tests, and regular parent updates.', pill: '12-week structured program' },
  { title: 'Test Day — Calm, Confident, and Ready', body: 'Your teen walks in knowing what to expect and how to apply every strategy — turning preparation into a score that opens doors and thousands in scholarships.', pill: 'Score. Scholarship. Dream school.' },
];

export const PILLARS = [
  {
    key: 'Assess', color: 'blue', sub: 'Identify exactly what’s holding the score back',
    lead: 'We diagnose the specific root causes — not just “needs improvement.”',
    items: ['Content gaps and forgotten formulas', 'Timing and pacing breakdowns', 'A clear map of where every point is being lost'],
  },
  {
    key: 'Address', color: 'gold', sub: 'Attack weak areas with proven formulas & strategies',
    lead: 'We fill every gap using The SAT Blueprint™ — formulas, strategies, and time-management solutions in one place.',
    items: ['Core concepts taught in order of SAT priority', 'Proven strategies for every question type', 'Customized plan from starting score to target score'],
  },
  {
    key: 'Success', color: 'green', sub: 'Turn practice into confident test-day execution',
    lead: 'Sustained, structured practice builds real mastery — and test-day confidence you can’t fake.',
    items: ['Confidence compounds week over week', 'Test day feels familiar, not frightening', 'Dream college. Scholarships. Done.'],
  },
];

export const PAINS = [
  { icon: 'chart-down', title: 'Effort isn’t turning into results', body: 'They’re studying — random videos, practice tests — but with no plan or strategy, the score stays stuck.' },
  { icon: 'stress', title: 'The stress is wearing on everyone', body: 'SAT pressure is taking a toll on your teen — and creating tension at home you both feel.' },
  { icon: 'clock', title: 'Time is running out', body: 'Between classes, sports, and activities, prep keeps getting pushed off — until it’s almost too late.' },
  { icon: 'scholar', title: 'Scholarships are on the line', body: 'Especially in Florida — a few points can mean the difference between a full scholarship and full tuition.' },
];

export const WHY = [
  { title: 'Diagnosis first, not a generic curriculum', body: 'Every student starts with a diagnostic that shows exactly where points are being lost — content, strategy, timing, or nerves. The plan is built from that, not from page one of a textbook.' },
  { title: 'Live instruction, feedback, and accountability', body: 'This is not a video library. Your teen learns live in small groups, gets real feedback every week, and has someone checking that the work actually gets done.' },
  { title: 'A week-by-week plan to a real test date', body: 'Starting score, target score, and test date go on one calendar. Each week has a job, so prep never drifts and nothing gets left for the last minute.' },
  { title: 'A founder who has done it', body: 'Patrick Spano is a Yale graduate, a perfect SAT scorer, and a former professional athlete with 15+ years coaching families through the SAT.' },
];
