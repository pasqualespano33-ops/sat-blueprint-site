// ─────────────────────────────────────────────────────────────────────────────
// SAT Blueprint site configuration
//
// Edit this file, then run `node build.mjs` from the repo root to regenerate
// every page. Anything marked PLACEHOLDER stays hidden on the public site
// until you fill it in. Leave a value empty ('' or []) to keep it hidden.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  url: 'https://gradefultestprep.com',
  company: 'Gradeful Test Prep',
  brand: 'SAT Blueprint Method™',
  brandShort: 'SAT Blueprint',
  founder: 'Patrick Spano',

  // PLACEHOLDER (phone conflict): the live footer uses (561) 430-2972, but the
  // current booking-confirmation message mentions (203) 500-6217. This site
  // uses (561) 430-2972 everywhere until Patrick confirms otherwise.
  phoneDisplay: '(561) 430-2972',
  phoneHref: 'tel:+15614302972',
  phoneE164: '+1-561-430-2972',
  email: 'patrick@gradefultestprep.com',
  address: {
    street: '1761 West Hillsboro Boulevard, Suite 207',
    city: 'Deerfield Beach',
    region: 'FL',
    postal: '33442',
    country: 'US',
  },

  bookingUrl: 'https://link.gradefultestprep.com/widget/bookings/sat-strategy-session',
  bookingCalendarName: 'Patrick Spano—SAT Blueprint™ Roadmap Session',
  youtube: 'https://www.youtube.com/@SATBlueprintMethod',

  // PLACEHOLDER: other social profiles. Only networks with a URL are shown.
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    x: '',
  },

  // PLACEHOLDER: Google Business / review profile. When `url` is set, a
  // "Leave us a review" button appears on the Reviews page. The rating badge
  // only appears if BOTH rating and count are filled with real numbers.
  reviewProfile: {
    url: '',
    rating: '',
    count: '',
  },

  // PLACEHOLDER: public office hours for the Contact page. When empty, the
  // Contact page lists Roadmap Session availability instead.
  officeHours: '',

  // Home hero promo video (the short talking-head promo, NOT the VSL).
  // Paste the YouTube video ID (the part after watch?v=), e.g. 'abc123XYZ'.
  // While empty, the hero shows Patrick's photo and the no-video headline.
  promoVideoYouTubeId: '',

  // Alex Torres headshot. Drop the file at assets/img/alex-torres.jpg and set
  // this to '/assets/img/alex-torres.jpg'. While empty, his card shows initials.
  alexPhoto: '',

  // Roadmap Session availability, from the current HighLevel calendar.
  roadmapHours: 'Monday–Friday, 8:00 AM–5:00 PM ET',

  // Optional: a GoHighLevel inbound webhook (or Zapier/Make hook) that receives
  // the booking-intake answers (grade, scores, test date, who will attend).
  // Intake is always saved to Netlify Forms ("roadmap-intake"); this sends a
  // copy to your CRM too. Leave '' to skip.
  intakeWebhook: '',
};

// PLACEHOLDER: live class sections for the current cohort. Add one entry per
// section, e.g. { label: 'Section A', days: 'Mon / Wed', time: '7–8 PM ET' }.
// While this list is empty, the schedule module says times are confirmed on
// the Roadmap Session and does not list specific times.
export const SCHEDULE = [
  // { label: 'Section A', days: 'Mon / Wed', time: '7–8 PM ET' },
  // { label: 'Section B', days: 'Tue / Thu', time: '7–8 PM ET' },
  // { label: 'Section C', days: 'Tue / Thu', time: '8–9 PM ET' },
];

// PLACEHOLDER: weekly office-hours time, e.g. 'Sundays, 6–7 PM ET'. Hidden when empty.
export const OFFICE_HOURS_TIME = '';

// PLACEHOLDER: parent-update cadence and channel, e.g. 'a weekly progress
// email every Friday'. When empty, the site describes updates without a cadence.
export const PARENT_UPDATE_CADENCE = '';

// PLACEHOLDER: reminder cadence for the FAQ, e.g. 'class reminders by text
// the day of each session'. Hidden when empty.
export const REMINDER_CADENCE = '';

// PLACEHOLDER: upcoming cohort start dates or recommended SAT dates for the
// FAQ, e.g. ['Spring cohort starts January 12']. Hidden when empty.
export const UPCOMING_DATES = [];

// PLACEHOLDER: additional coaches for the About page. Each entry:
// { name: '', role: '', bio: '', photo: '/assets/img/coach-name.jpg', credentials: [] }
// While empty, the About page features Patrick as head coach only.
export const COACHES = [];
