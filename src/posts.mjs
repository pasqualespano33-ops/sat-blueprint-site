// Blog posts. Each post: metadata + full article HTML.
// New copy written for this site (not on the live site) — fact-check before
// publishing changes. Bright Futures thresholds are deliberately not stated
// as numbers; see the dated citation inside the post.

function cover({ big, small, accent = '#3B82F6', id }) {
  return `<svg viewBox="0 0 600 340" role="img" aria-label="${small}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="g-${id}" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#ffffff" stroke-opacity=".06"/></pattern>
    <linearGradient id="l-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#112236"/><stop offset="1" stop-color="#0C1A2A"/></linearGradient>
  </defs>
  <rect width="600" height="340" fill="url(#l-${id})"/>
  <rect width="600" height="340" fill="url(#g-${id})"/>
  <circle cx="500" cy="70" r="150" fill="none" stroke="${accent}" stroke-opacity=".35" stroke-width="2"/>
  <circle cx="500" cy="70" r="95" fill="none" stroke="#C89B2A" stroke-opacity=".45" stroke-width="2" stroke-dasharray="4 8"/>
  <text x="40" y="215" font-family="Bebas Neue, Impact, sans-serif" font-size="150" fill="#ffffff" letter-spacing="2">${big}</text>
  <rect x="40" y="245" width="56" height="4" fill="#C89B2A"/>
  <text x="40" y="285" font-family="Montserrat, Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff" fill-opacity=".85" letter-spacing="3">${small.toUpperCase()}</text>
</svg>`;
}

export const CATEGORIES = [
  { slug: 'digital-sat', name: 'Digital SAT' },
  { slug: 'score-strategy', name: 'Score Strategy' },
  { slug: 'scholarships', name: 'Scholarships' },
  { slug: 'for-parents', name: 'For Parents' },
];

export const POSTS = [
  {
    slug: 'florida-bright-futures-sat-scores',
    title: 'Florida Bright Futures: The SAT Scores That Unlock Scholarship Money',
    metaTitle: 'Florida Bright Futures & the SAT: A Parent’s Guide | SAT Blueprint',
    description: 'How Florida Bright Futures uses SAT scores, why a few points can change your family’s college costs, and how to plan your teen’s test dates around it.',
    category: 'Scholarships',
    categorySlug: 'scholarships',
    date: '2026-11-17',
    dateDisplay: 'November 17, 2026',
    readTime: '7 min read',
    excerpt: 'For Florida families, the SAT isn’t just an admissions number — it can decide how much of college the state pays for. Here’s how to think about it.',
    cover: cover({ big: '$ + SAT', small: 'Florida scholarships', accent: '#F0C040', id: 'bf' }),
    body: `
<p class="lede">For most families, the SAT is an admissions number. For Florida families, it is also a money number. Florida’s Bright Futures Scholarship Program uses test scores — alongside GPA, coursework, and service hours — to decide which award a student qualifies for. A few points on one Saturday morning can be the difference between a scholarship that covers most of tuition and one that covers much less, or none at all.</p>

<p>This guide explains how the SAT fits into Bright Futures, why the score requirements deserve your attention right now, and how to plan your teen’s prep and test dates so a scholarship isn’t left to chance.</p>

<h2>What Bright Futures is — in one paragraph</h2>
<p>Bright Futures is Florida’s merit-based scholarship program, funded by the Florida Lottery and administered by the Florida Department of Education’s Office of Student Financial Assistance. The two awards most college-bound students aim for are the <strong>Florida Academic Scholars (FAS)</strong> award and the <strong>Florida Medallion Scholars (FMS)</strong> award. FAS is the higher tier and covers a larger share of tuition and fees at eligible Florida institutions; FMS is the second tier. Each award has its own minimum GPA, minimum test score, and service-hour requirement.</p>

<h2>Where the SAT comes in</h2>
<p>Each award has a minimum SAT (or ACT or CLT) score. Hit the minimum for FAS and your teen can qualify for the top tier, assuming they meet the other requirements. Fall short by even ten points and they may qualify only for FMS — or for neither.</p>
<p>That is why we talk about “scholarship scores” with Florida families. The goal isn’t an abstract “higher score.” It is a specific number tied to a specific award, with a specific dollar value attached.</p>

<div class="callout">
  <p class="callout-title">Why we don’t print the cutoffs here</p>
  <p>Bright Futures score minimums are set by the state and can change between graduating classes. WLRN reported on September 28, 2026 that students will need higher test scores to earn Bright Futures going forward (<a href="https://www.wlrn.org/education/2026-09-28/to-earn-florida-bright-futures-students-will-need-to-capture-higher-test-scores-next-year" target="_blank" rel="noopener">WLRN, Sept. 28, 2026</a>). Because the numbers depend on your teen’s graduating class, always confirm the current requirements on the official <a href="https://www.floridastudentfinancialaidsg.org/SAPHome/SAPHome?url=home" target="_blank" rel="noopener">Florida Student Financial Assistance</a> site or with your school counselor. On a Roadmap Session, we look up the exact thresholds that apply to your teen and plan to them.</p>
</div>

<h2>Three details parents often miss</h2>
<h3>1. How scores are reported has its own rules</h3>
<p>Colleges and Bright Futures don’t always treat scores the same way. Many colleges “superscore” — taking the best section scores across test dates — and Bright Futures has its own rules about which tests count and how official scores reach the state. Read the current official guidance for your teen’s class, and make sure official scores are sent exactly as instructed. Don’t assume the college rules apply.</p>

<h3>2. There are deadlines</h3>
<p>Test scores have to be earned by the program’s deadline for your teen’s graduating class. A student who is close to a threshold in the spring of senior year may have only one or two realistic attempts left. Starting earlier gives your teen more swings — and more room to recover from an off day.</p>

<h3>3. It isn’t automatic</h3>
<p>Students have to apply for Bright Futures, typically by completing the Florida Financial Aid Application during senior year. Meeting the requirements is necessary, but it isn’t the only step. Put the application on the family calendar alongside test dates.</p>

<h2>Why “a few points” is not an exaggeration</h2>
<p>Most students who are close to a Bright Futures threshold aren’t missing big chunks of content. They are losing points in predictable places: a handful of math question types they haven’t practiced, Reading and Writing questions where they fall for the same trap answer, or a second module where they run out of time. Those are fixable problems. They don’t require more hours of random practice; they require a diagnosis and a plan.</p>
<p>That’s the approach behind the SAT Blueprint Method™. Students start with a diagnostic that maps where every point is being lost. The plan is then built around the specific threshold that matters for their scholarship — not a generic target.</p>

<h2>Real Florida families, real outcomes</h2>
<p>Here are a few Florida results from our students, shared with permission on our <a href="/results/">Results page</a>:</p>
<ul>
  <li><strong>Mauricio</strong> scored a 1350 and earned 100% Bright Futures.</li>
  <li><strong>Xavier</strong> went from 1090 to 1200 (+110) and earned Bright Futures 75%.</li>
  <li><strong>Jacob S.</strong> scored a 1260 — about $20,000 in scholarship — with Bright Futures 75%.</li>
  <li><strong>Wyatt C.</strong> earned a perfect 1600 and is now at UF with 100% Bright Futures.</li>
</ul>
<p>Every student is different, and past results don’t guarantee future ones. But the pattern is consistent: when students know exactly which score they need and what’s standing between them and it, they stop studying in circles.</p>

<h2>A simple planning timeline</h2>
<ol>
  <li><strong>Find your number.</strong> Confirm the FAS and FMS score minimums for your teen’s graduating class on the official site.</li>
  <li><strong>Get a real baseline.</strong> A recent SAT, PSAT, or full-length Bluebook practice test tells you the gap.</li>
  <li><strong>Pick a target test date with runway.</strong> We typically plan a 12-week runway to a test date, with a backup date after it.</li>
  <li><strong>Diagnose before you drill.</strong> Find out whether points are being lost to content, strategy, timing, or nerves — then fix them in that order of impact.</li>
  <li><strong>Practice under real conditions.</strong> Full-length, timed practice in the official Bluebook app, so test day feels familiar.</li>
</ol>

<h2>Step Up For Students can help with the cost of prep</h2>
<p>Gradeful Test Prep is an approved Step Up For Students provider. Florida families who qualify for Step Up For Students (PEP) can often use those funds for our tutoring, which can mean little or no out-of-pocket cost. We’ll cover the details on your Roadmap Session.</p>

<h2>Next step</h2>
<p>If your teen is within reach of a Bright Futures threshold — or you’re not sure how far away they are — book a free 45-minute Roadmap Session. Patrick will review where your teen stands, look at the threshold that applies to their class, and map a realistic plan and test date to get there.</p>
<p class="post-note"><em>Sources checked November 17, 2026: WLRN (September 28, 2026); Florida Department of Education, Office of Student Financial Assistance. Bright Futures eligibility is determined solely by the State of Florida, not by Gradeful Test Prep.</em></p>
`,
  },
  {
    slug: 'digital-sat-bluebook-timing',
    title: 'Digital SAT, Bluebook, and Timing: What Parents Need to Know',
    metaTitle: 'Digital SAT, Bluebook & Timing Explained for Parents | SAT Blueprint',
    description: 'A plain-English guide to the digital SAT for parents: how the Bluebook app works, what adaptive modules mean, and why pacing is where many points are lost.',
    category: 'Digital SAT',
    categorySlug: 'digital-sat',
    date: '2026-11-10',
    dateDisplay: 'November 10, 2026',
    readTime: '6 min read',
    excerpt: 'The SAT you took (if you took it) isn’t the SAT your teen will take. Here’s how the digital test works — and where students actually lose points.',
    cover: cover({ big: '2 × 2', small: 'The digital SAT', accent: '#3B82F6', id: 'ds' }),
    body: `
<p class="lede">If you took the SAT on paper with a No. 2 pencil, the test your teen is taking will look very different. The SAT is now fully digital, shorter, and adaptive. None of that makes it easier — but it does change how students should prepare. Here is what parents need to know, in plain English.</p>

<h2>The SAT is taken on a device, in an app called Bluebook</h2>
<p>Students take the SAT in <strong>Bluebook</strong>, College Board’s official testing app, on a laptop or tablet. Bluebook is also where students take official full-length practice tests. That matters: the best practice happens in the same interface your teen will use on test day — same tools, same on-screen timer, same built-in calculator, same way of flagging and returning to questions.</p>
<p>Students still sit for the SAT at a test center or at their school on an official test date; the device is just the format. (SAT Blueprint is independent and not affiliated with the College Board — we prepare students for the official test using the official practice tools.)</p>

<h2>How the test is structured</h2>
<p>The digital SAT has two sections:</p>
<ul>
  <li><strong>Reading and Writing</strong> — short passages, each followed by a single question. It tests comprehension, vocabulary in context, grammar, and how well a student can improve a piece of writing.</li>
  <li><strong>Math</strong> — algebra, advanced math, problem solving and data analysis, and geometry and trigonometry. A calculator is allowed on the entire Math section, and Bluebook includes one.</li>
</ul>
<p>Each section is split into <strong>two timed modules</strong>, and there’s a short break between the sections. Total testing time is a little over two hours. College Board publishes the exact official timing and question counts, and they can be updated, so check <a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener">College Board’s SAT page</a> for current details.</p>

<h2>What “adaptive” really means</h2>
<p>The digital SAT is <strong>multistage adaptive</strong>. In each section, every student gets a first module with a mix of easier and harder questions. How a student performs on that first module decides which version of the second module they see: a harder one or an easier one.</p>
<p>Here is the part parents need to hear: <strong>the higher score ceiling lives in the harder second module.</strong> A student who makes careless errors early can be routed to the easier second module, which limits how high their score can go no matter how well they do from there. The first module is not a warm-up.</p>

<h2>Timing is where many points are lost</h2>
<p>The modules are shorter than the old SAT’s sections, but the clock is still tight. In our diagnostics, timing problems usually look like one of these:</p>
<ul>
  <li><strong>The rusher</strong> — finishes early, but drops “easy” points to misreads and careless math.</li>
  <li><strong>The perfectionist</strong> — spends three minutes on one hard question and guesses on the last five.</li>
  <li><strong>The fader</strong> — strong in the first module, then runs out of focus in the second, when the harder questions arrive.</li>
</ul>
<p>Each pattern has a different fix. That is why we diagnose pacing in the first weeks and train it every week after, instead of handing students a generic “spend 70 seconds per question” rule.</p>

<h2>What good digital SAT prep looks like</h2>
<ol>
  <li><strong>Start with an official, full-length diagnostic in Bluebook.</strong> It shows a real starting point and reveals timing issues that a worksheet never would.</li>
  <li><strong>Prioritize by point value.</strong> Some question types appear on every test. Mastering those first moves the score fastest.</li>
  <li><strong>Learn the tools.</strong> Knowing when to use the built-in graphing calculator — and when not to — saves real minutes on Math.</li>
  <li><strong>Practice like it’s test day.</strong> Timed modules, on a device, with a break, followed by a careful review of every mistake.</li>
  <li><strong>Get feedback.</strong> Practice tests without review just repeat the same mistakes. Every wrong answer should turn into a lesson.</li>
</ol>

<h2>How SAT Blueprint uses all of this</h2>
<p>The SAT Blueprint Method™ is built around the current digital SAT. Students begin with a diagnostic, get a week-by-week plan to a target score and test date, learn in live small-group classes, and practice in the same format they’ll see on test day. Weekly office hours mean mistakes get fixed, not repeated — and parents stay in the loop the whole way.</p>
<p>If you’re not sure where your teen stands on the digital SAT, book a free 45-minute Roadmap Session. Patrick will help you read their current scores, spot what’s costing points, and map a realistic plan.</p>
<p class="post-note"><em>Test format details summarized from College Board’s public SAT information as of November 2026. Always confirm current timing and policies with College Board.</em></p>
`,
  },
  {
    slug: 'sat-prep-not-working',
    title: '5 Signs Your Teen’s SAT Prep Isn’t Working',
    metaTitle: '5 Signs Your Teen’s SAT Prep Isn’t Working | SAT Blueprint',
    description: 'Hours of studying but the score won’t move? Five warning signs your teen’s SAT prep is off track — and what structured, diagnosis-first prep looks like instead.',
    category: 'For Parents',
    categorySlug: 'for-parents',
    date: '2026-11-03',
    dateDisplay: 'November 3, 2026',
    readTime: '6 min read',
    excerpt: 'They’re putting in the hours. The score isn’t moving. Here are five signs the problem is the plan — not your teen.',
    cover: cover({ big: '5 SIGNS', small: 'For parents', accent: '#3B82F6', id: 'ps' }),
    body: `
<p class="lede">Your teen is putting in the time. There are practice books on the desk, videos in the browser history, maybe a practice test or two. And yet the score barely moves. It’s one of the most frustrating spots for a family to be in — and it’s incredibly common.</p>

<p>Here’s the good news: in most cases, a stuck score isn’t about intelligence or effort. It’s about structure, strategy, and execution. These five signs usually mean the <em>plan</em> is the problem — and plans can be fixed.</p>

<h2>Sign 1: Nobody can tell you exactly where the points are being lost</h2>
<p>Ask your teen, “Which question types are costing you the most points?” If the answer is “math, I guess” or “reading is hard,” the prep is running without a diagnosis.</p>
<p>Effective prep starts with a map: which concepts are shaky, which formulas are forgotten, which question types keep tripping them up, and whether the real issue is content, strategy, timing, or test anxiety. Without that map, every study hour is a guess.</p>
<p><strong>What to do instead:</strong> Start with a full-length, timed diagnostic and a careful review of every missed question. Sort the mistakes by cause, then attack the biggest categories first.</p>

<h2>Sign 2: The plan is “take more practice tests”</h2>
<p>Practice tests are a measuring tool, not a teaching tool. Taking test after test without deep review is like stepping on a scale every day and expecting to lose weight. Students often repeat the same mistakes for months because no one stops to fix the underlying gap.</p>
<p><strong>What to do instead:</strong> Use practice tests sparingly and strategically — as checkpoints. Between them, do targeted practice on the exact skills the last test exposed.</p>

<h2>Sign 3: Prep keeps getting pushed to “next week”</h2>
<p>Between classes, sports, clubs, and jobs, SAT prep is the easiest thing to postpone. It has no daily deadline and no one checking in. Weeks slip by, and suddenly the test is a month away.</p>
<p><strong>What to do instead:</strong> Put prep on a fixed weekly schedule with a live component — a class, a coach, someone expecting your teen to show up. Accountability isn’t about pressure; it’s about making progress the default.</p>

<h2>Sign 4: It’s all videos and no feedback</h2>
<p>Free videos are great for explaining a single concept. But watching someone else solve a problem isn’t the same as solving it yourself under a clock — and no video can look at your teen’s work and tell them what they did wrong.</p>
<p><strong>What to do instead:</strong> Make sure your teen is getting live instruction and real feedback on their own mistakes. Someone should be asking, “Walk me through how you got that,” every single week.</p>

<h2>Sign 5: The stress is growing faster than the score</h2>
<p>When effort doesn’t produce results, frustration builds — for your teen and for you. SAT conversations start to feel tense at the dinner table. Some students begin to believe they’re “just not a good test taker.”</p>
<p>That belief is almost always wrong. The SAT is a learnable test with predictable patterns and traps. Students who learn those patterns, and practice under realistic conditions, walk into test day with confidence they’ve earned.</p>
<p><strong>What to do instead:</strong> Replace vague pressure (“you need to study more”) with a clear plan (“this week we’re fixing these two question types”). Clarity lowers stress for everyone.</p>

<h2>What structured SAT prep looks like</h2>
<p>When prep is working, you can see it. There’s a written plan from a starting score to a target score and a test date. Each week has a focus. Mistakes are reviewed, not just counted. Practice tests show steady movement. And parents get updates instead of guessing.</p>
<p>That’s exactly how the SAT Blueprint Method™ is built:</p>
<ul>
  <li><strong>Assess</strong> — a diagnostic that maps where every point is being lost.</li>
  <li><strong>Address</strong> — live small-group instruction, taught in order of SAT priority, with a customized plan.</li>
  <li><strong>Success</strong> — weekly practice, office hours, and accountability, so test day feels familiar instead of frightening.</li>
</ul>
<p>One parent, Preethi, put it this way: “We went from unprepared and lacking confidence to a 200 point boost up to a 1430 within 12 weeks.”</p>

<h2>Not sure if your teen’s prep is on track?</h2>
<p>Book a free 45-minute Roadmap Session with Patrick Spano. You’ll leave knowing exactly what’s holding your teen’s score back and what it takes to fix it — whether or not you ever work with us.</p>
`,
  },
];
