# SAT Blueprint site resources — coder notes

Two footer-linked resource pages for the SAT Blueprint (Gradeful Test Prep) site. Keep the layout simple. Tables are driven by the JSON/CSV files; the Markdown files are short page copy only (title, intro, CTA, disclaimer). Do not invent additional numbers.

Suggested URLs:

- `/scholarships-by-state` — footer label: **SAT Scholarships by State**
- `/sat-scores-by-college` — footer label: **SAT Scores by College**

Link the two pages to each other in the CTA (the college-scores copy already points at `/scholarships-by-state`).

## Files

| File | Use |
|---|---|
| `scholarships_by_state.json` | Source of truth for the scholarships table (22 programs, 18 states) |
| `scholarships_by_state.csv` | Same rows and keys as the JSON, for spreadsheet review |
| `sat_by_college.json` | Source of truth for the college table (77 colleges) |
| `sat_by_college.csv` | Same rows and keys as the JSON |
| `scholarships.md` | Page copy for `/scholarships-by-state` |
| `college-scores.md` | Page copy for `/sat-scores-by-college` |
| `README.md` | This file |

JSON and CSV use the same snake_case keys. `source_url` and `data_year` are on every row. In the CSV, booleans are the strings `true` / `false`.

## Scholarships fields

| Key | Description |
|---|---|
| `state` | U.S. state name |
| `program` | Official program name |
| `sat_needed` | SAT requirement (ACT/CLT included when the official source lists them) |
| `award` | Award amount or coverage, as published |
| `source_url` | Official program page or document |
| `data_year` | Cycle the row was checked against |
| `notes` | Deadlines, GPA, residency, or other rules; also flags any figure that was not found |

Render one table from this file. Suggested columns: State, Program, SAT needed, Award, Official link (`source_url`). Put `notes` in an expandable row, footnote, or tooltip if you want more detail without clutter. A short National Merit sentence is already in `scholarships.md`; it is not a table row.

Optional: a state dropdown filter on the table.

## College fields

| Key | Description |
|---|---|
| `tier` | Display label and sort group: `Tier 1: 1500+`, `Tier 2: 1400–1499`, `Tier 3: 1300–1399`, `Tier 4: 1200–1299`, `Tier 5: 1100–1199`, `Tier 6: under 1100`, `Scores not reported` |
| `school_name` | Display name |
| `state` | Two-letter state (or `DC`) |
| `sat_middle_50` | SAT 25th–75th, with an en dash, e.g. `1510–1580`. Use the string `not reported` when Scorecard has no range |
| `test_policy` | First-year policy for fall 2027 entry unless the text says otherwise |
| `is_sat_blueprint_alumni_school` | `true` if a SAT Blueprint student has been confirmed at this college |
| `source_url` | College Scorecard page for the school |
| `data_year` | Score cohort (`Fall 2024 entering class`) |

Suggested layout:

1. Intro copy from `college-scores.md`.
2. One section per `tier`, in the order above.
3. A simple table in each section: College, State, SAT mid-50%, Test policy.
4. Bold or badge the college name when `is_sat_blueprint_alumni_school` is true. A short legend (“bold = SAT Blueprint alumni college”) is enough.
5. A state dropdown that filters the tables is helpful and is optional.
6. Disclaimer and CTA from the Markdown, at the bottom.

SAT totals are ERW 25th + Math 25th through ERW 75th + Math 75th, from the U.S. Department of Education College Scorecard, Most Recent Institution-Level Data, updated November 2, 2026. They are not admission cutoffs.

## Copy and tone

Use the Markdown files as written. Do not add prices, score guarantees, or extra statistics. “SAT Blueprint Method™” should appear in the CTA. Phone: (561) 430-2972. Site: https://gradefultestprep.com.

Both pages should show a visible “Data as of November 18, 2026” line (already in the copy).
