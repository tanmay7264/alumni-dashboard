# Otto-Friedrich Universität Bamberg — Alumni Dashboard

End-to-end context document for the alumni dashboard demo. Covers project goals, architecture, all mock data, every page flow, every interactive behaviour, and how to run / extend the app.

---

## 1. Project Overview

A polished demo of an alumni-engagement web application for **Otto-Friedrich-Universität Bamberg**. Built as a fully interactive single-user prototype (no backend) to support a stakeholder demo at the university.

- **Audience:** university administration evaluating an alumni-portal vendor or in-house build
- **Status:** demo / prototype — no real data, no auth, no backend
- **Persistence:** all interactive state is saved client-side in `localStorage`
- **Goal:** make the entire happy path of an alumni engagement system feel real, including RSVPs, donations, networking, mentorship, and credential verification

### Brand Identity

| Token | Value | Source |
|---|---|---|
| Primary navy | `#00457d` | uni-bamberg.de header background |
| Mid navy | `#1a588a` | uni-bamberg.de secondary nav |
| Light navy | `#336a97` | uni-bamberg.de tertiary accents |
| Gold accent | `#ffd300` | uni-bamberg.de accent yellow |
| Gold light | `#fff2b2` | uni-bamberg.de hover link colour |
| Page background | `#f5f7fa` | neutral light grey |

The colours were extracted directly from `https://www.uni-bamberg.de/` by inspecting computed styles in the live browser. The dashboard uses the same primary navy as the university homepage.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14.2.5 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react |
| State | React Context + `useState`, persisted to `localStorage` |
| Data | Static TypeScript objects in `lib/mock-data.ts` |
| Build / Dev | `npm run dev` (port 3000 default) |

No backend, no database, no API routes. Everything is rendered client-side once the layout mounts the AppProvider.

---

## 3. File Structure

```
alumni-dashboard/
├── app/
│   ├── layout.tsx              # Root layout (Sidebar + Topbar + Toaster + AppProvider)
│   ├── globals.css             # Tailwind + component classes (.card, .btn-primary, etc.)
│   ├── page.tsx                # Redirects "/" → "/dashboard"
│   ├── dashboard/page.tsx      # Home view with live stats and activity feed
│   ├── events/page.tsx         # Events grid with RSVP, search, propose, share
│   ├── jobs/page.tsx           # Job board with save/apply, filters, post-job
│   ├── directory/page.tsx      # Alumni directory with connect/message/profile
│   ├── giving/page.tsx         # Campaigns + donation flow + history table
│   ├── news/page.tsx           # News grid with article reader modal
│   ├── mentorship/page.tsx     # Mentor cards + session booking + become-a-mentor
│   └── transcript/page.tsx     # Transcript, certifications, degree verification
├── components/
│   ├── Sidebar.tsx             # Persistent left nav (navy)
│   ├── Topbar.tsx              # Global search, notifications, profile chip
│   ├── HeroHeader.tsx          # Reusable gradient hero banner per page
│   ├── Modal.tsx               # Generic modal with backdrop + ESC handling
│   └── Toaster.tsx             # Toast notification stack (bottom-right)
├── lib/
│   ├── mock-data.ts            # All seed data + TypeScript types
│   └── AppState.tsx            # AppProvider + useApp hook (global state)
├── public/                     # (empty — no assets needed for demo)
├── tailwind.config.ts          # Brand colour palette
├── next.config.js              # Image remote patterns (pravatar, unsplash)
├── tsconfig.json
└── package.json
```

---

## 4. Persona

All pages assume the viewer is logged in as a single alumna. Hard-coded in `lib/mock-data.ts`:

| Field | Value |
|---|---|
| Name | Sarah Müller |
| Class | 2019 |
| Degree | M.Sc. Computer Science |
| Faculty | Faculty of Information Systems & Applied Computer Sciences (WIAI) |
| Current role | Senior Software Engineer at Siemens AG |
| Location | Munich, Germany |
| Email | sarah.mueller@alumni.uni-bamberg.de |
| Student ID | 1734892 |
| Avatar | `https://i.pravatar.cc/200?img=47` |
| Lifetime giving | €1,250 |
| Connections | 142 (seed; live count comes from state) |

---

## 5. Mock Data Summary

All data lives in `lib/mock-data.ts`. Counts and shape:

| Export | Type | Count | Notable fields |
|---|---|---|---|
| `user` | object | 1 | Sarah's full profile |
| `events` | `Event[]` | 12 | id, title, date, time, location, type, attending, capacity, image, description, featured, host |
| `jobs` | `Job[]` | 12 | id, title, company, location, type, salary, postedBy, postedDays, referralOffered, tags, description, applicants |
| `directory` | `AlumniProfile[]` | 18 | id, name, year, degree, role, company, location, industry, avatar, mutual |
| `givingCampaigns` | `Campaign[]` | 6 | id, title, raised, goal, donors, daysLeft, description, category |
| `givingHistory` | `Donation[]` | 7 | id, date, campaign, amount (historical donations) |
| `news` | `NewsArticle[]` | 8 | id, title, category, date, excerpt, **body**, image, readTime, author |
| `mentors` | `Mentor[]` | 8 | id, name, year, role, company, expertise[], availability, avatar, rating, mentees, bio |
| `transcriptCourses` | `Course[]` | 13 | semester, code, title, credits, grade (covers B.Sc. + M.Sc. + thesis) |
| `certifications` | array | 3 | AWS, CKA, PSM I |
| `newsfeed` | `Activity[]` | 6 | Recent activity items shown on dashboard |
| `offers` | `Offer[]` | 30 | id, brand, category, discount, description, code, link, logo |

### Event types
Reunion, Networking, Career, Talk, Sports

### News categories
University, Alumni, Partnership, Research, Events

### Job types
Full-time, Part-time, Internship, Contract

### Industries (Directory)
Technology, Consulting, Public Sector, Academia, Finance, Healthcare, Automotive

---

## 6. State Management

All cross-page interactivity flows through `lib/AppState.tsx`. The `<AppProvider>` is mounted in the root layout, and any client component calls `useApp()` to read state and invoke actions.

### State shape

```typescript
{
  rsvpEvents: number[]           // event IDs the user has RSVP'd to
  savedJobs: number[]            // saved job IDs
  appliedJobs: number[]          // applied job IDs (one-way: cannot unapply in UI)
  connections: number[]          // accepted alumni connections
  pendingConnections: number[]   // sent-but-not-accepted requests
  mentorRequests: number[]       // requested mentor session IDs
  readArticles: number[]         // news articles the user has opened
  campaignBoost: Record<number, number>  // additional raised amount per campaign
  donations: Donation[]          // new donations made this session
  totalGivenBoost: number        // additional lifetime giving from this session
  toasts: Toast[]                // active toast notifications (not persisted)
  prefs: { language: string, theme: string } // language (en/de) and dark mode preference
}
```

### Action API

| Action | Effect |
|---|---|
| `toggleRsvp(id, title)` | Add/remove event from RSVPs, toast feedback |
| `toggleSave(id, title)` | Bookmark/unbookmark a job |
| `applyJob(id, title)` | Mark job as applied (irreversible in UI) |
| `toggleConnect(id, name)` | Send request → pending → accepted state machine |
| `requestMentor(id, name)` | Send mentorship session request |
| `markRead(id)` | Track which news articles have been opened |
| `donate(campaignId, title, amount)` | Add donation, update campaign progress + lifetime giving + class-gift counter, push to history |
| `showToast(msg, kind)` | Push a toast (auto-dismisses after 3.5s) |
| `dismissToast(id)` | Manually close a toast |
| `updatePrefs(newPrefs)` | Update language and theme preferences |

### Persistence

Everything except `toasts` is stringified and written to `localStorage` under the key `uni-bamberg-alumni-state-v1`. On mount the provider hydrates from this key if it exists. Toasts are ephemeral so they aren't restored on reload.

### Initial seed state

```typescript
{
  rsvpEvents: [4],                       // Munich Stammtisch pre-RSVP'd
  connections: [1, 3, 4, 5, 8, 13],      // 6 starting connections
  ...                                     // everything else empty
}
```

To reset the demo: open DevTools → Application → Local Storage → delete the `uni-bamberg-alumni-state-v1` key, then reload.

---

## 7. Page-by-Page Flows

### 7.1 Dashboard (`/dashboard`)

Default landing page after `/` redirects.

**Layout:**
- Hero header with personalised greeting, class line, "View Network" CTA
- 4 stat cards (Events RSVP'd / Connections / Jobs / Donations YTD) — every value is computed live from AppState
- 2-column body:
  - Left: 3 upcoming events (inline RSVP toggle), 2 alumni-posted jobs
  - Right: 6-item activity feed, Class of 2019 gift progress card

**Interactions:**
- Stat cards update reactively as the user interacts on other pages
- Event row "RSVP / Going" toggles open `toggleRsvp()` and update the dashboard count and the event row in place
- Class gift progress bar reflects `totalGivenBoost`
- Job cards link to `/jobs`; activity feed is read-only

### 7.2 Events (`/events`)

**Layout:**
- Hero w/ "Propose an Event" CTA
- Search input + 6 type filter chips (All / Reunion / Networking / Career / Talk / Sports)
- Featured event card (first match) with full description, capacity, RSVP, Share
- Grid of remaining events (cards w/ image, type chip, RSVP button)

**Interactions:**
- **Search**: filters by title, description, location (case-insensitive substring)
- **Type filter**: single-select pill row
- **RSVP**: button toggles between outline ("RSVP") and green ("Going"). Updates attendee count by +1/-1. Toast on every action.
- **Going** badge appears on event card image when RSVP'd
- **Propose Event modal**: form with title, date, type, location, description. Submit → toast "Event proposal submitted".
- **Share modal**: shows shareable URL with copy-to-clipboard, plus LinkedIn / X / Email buttons (each fires a toast).
- Empty state when filters return zero results, with "Clear filters" reset

### 7.3 Jobs (`/jobs`)

**Layout:**
- Hero w/ counters (active / saved / applied)
- Main column: search input → results
- Right sidebar: filter panel (sticky)

**Filters:**
- Search by title, company, description, tags
- Job Type (multi-select checkbox group)
- Location (multi-select)
- Referral offered only
- Saved jobs only
- "Clear All" resets every filter

**Interactions:**
- **Save**: toggles bookmark button between outline and green. Persists in `savedJobs`.
- **Apply**: opens application modal (CV upload field + cover note). On submit → adds to `appliedJobs` (one-way), button becomes "Applied" badge.
- **Post a Job modal**: title, company, location, type, salary, description, referral checkbox. Submit → toast.
- Cards show: company logo (initial letter), location, type, salary, days posted, applicant count, tags, "Referral" gold chip if applicable, "Applied" green chip when applied

### 7.4 Directory (`/directory`)

**Layout:**
- Hero w/ counts (24,800 total / connections / pending)
- Filter bar: search + year + industry + location dropdowns
- Result count
- Grid of profile cards (avatar, name, role, company, location, mutual count, Connect/Message)

**Interactions:**
- **Search**: name, role, company, location substring match
- **Year filter**: 4 buckets (All / 2020-2026 / 2010-2019 / 2000-2009)
- **Industry filter**: dropdown of all industries
- **Location filter**: All / Germany / Europe / Americas / Asia (Germany match is hardcoded against a list of common German cities in the seed data)
- **Connect**: state machine: not-connected → pending → connected
  - Click "Connect" → "Pending" → click again → cancels request
  - Connected users get "Message" button + gold checkmark
- **Profile card** (click on avatar or name): opens a modal with full profile, big mutual count, Connect or Message CTA
- **Message modal**: subject + body fields, submit → toast

### 7.5 Giving (`/giving`)

**Layout:**
- Hero w/ "Give Now" CTA (defaults to Scholarship Fund)
- 3 summary cards: Lifetime Giving / This Year / Class of 2019 Goal (all live)
- Active Campaigns grid (6 cards w/ progress bars)
- My Giving History table (combined seed history + new donations, newest first)

**Interactions:**
- **Donate modal**: opens for a specific campaign. Includes:
  - 6 preset amounts (€25, €50, €100, €250, €500, €1000)
  - Custom amount input
  - Payment method radio (SEPA / Card / PayPal — all decorative)
  - Tax-deductible receipt opt-in
  - Validates amount > 0
- On submit: calls `donate()` which:
  - Adds amount to `campaignBoost[id]`
  - Prepends a new donation to `donations` (dated today)
  - Increments `totalGivenBoost`
  - Toasts "Thank you!"
- All three summary cards, the campaign progress bar, the donor count, and the table refresh immediately
- Receipt "PDF" button on each history row fires a toast

### 7.6 News (`/news`)

**Layout:**
- Hero w/ read count
- Search + 6 category filter pills
- Featured article card (first match) w/ "Read article" CTA
- Grid of remaining articles (image, category chip, title, excerpt, date, read time)

**Interactions:**
- **Search**: title, excerpt, and full body substring match
- **Category filter**: single-select
- Clicking any article opens the **article reader modal**:
  - Full hero image at top
  - Title, category, date, read time, author
  - Excerpt + full body text
  - Calls `markRead()` which adds to `readArticles`
- Read articles get a green "Read" chip in the grid
- Empty state when no matches

### 7.7 Mentorship (`/mentorship`)

**Layout:**
- Hero w/ "Become a Mentor" CTA, counts (active mentors / sessions / my status)
- 3 stat tiles
- Expertise filter pills (All / Product Management / Engineering / Consulting / Public Sector / Entrepreneurship / Research / Career Switching / Interview Prep)
- Grid of mentor cards (avatar, name, role, company, rating, mentee count, bio quote, expertise chips, availability, Message + Request buttons)

**Interactions:**
- **Expertise filter**: matches by first word of selected expertise against mentor's expertise tags
- Mentors flagged "Full this month" are non-interactive (button disabled w/ Clock icon)
- **Request Session modal**:
  - Topic dropdown (mentor's expertise + "Other")
  - 5 time slots (Mon 14:00 / Tue 10:00 / Wed 16:00 / Thu 18:30 / Fri 11:00) — single-select pill row
  - Goals textarea
  - Submit → `requestMentor()` → button becomes "Requested" badge
- **Message button**: fires toast (would open a DM thread in production)
- **Become a Mentor modal**: expertise multi-select, availability dropdown, bio textarea, submit → toast

### 7.8 Transcript (`/transcript`)

**Layout:**
- Hero w/ "Download Official PDF" CTA
- 4 summary cards: Degree / Total ECTS / Final Grade / Student ID
- Gold verification banner card with "Request Verification" CTA
- Coursework grouped by semester (5 semesters)
- Professional Certifications grid (3 cards)

**Computed values:**
- Total credits: sum of all course credits (78 ECTS in the seed)
- Final grade: weighted average by credits (1.20 in the seed, "Sehr gut")

**Interactions:**
- **Download Official PDF**: fires toast "Official PDF transcript sent to your email"
- **Request Verification modal**: form with recipient name, recipient email, purpose dropdown (Job application / Grad school / Licensing / Immigration / Other), security note about 30-day expiry. Submit → toast.
- Grades ≤ 1.5 get a gold chip, others get a neutral chip — visual emphasis on Sarah's strong grades

### 7.9 Store & Offers (`/offers`)

**Layout:**
- Hero w/ description of community discounts
- Category filter pills (All / Sports / Clothing / Mobility / Tech / Retail / Travel / Entertainment / Health) + Text search
- Grid of 30 brand offer cards (pure SVGs via simpleicons to evade ad-blockers)

**Interactions:**
- **Search**: filters by brand name and description
- **Category filter**: exact match category
- **Redeem**: External link button to open the offer page
- **Dark Mode Integration**: Brand logos force a `#ffffff` background to guarantee proper visibility in the dark theme.

### 7.10 My Hub / Activity (`/activity`)

**Layout:**
- Hero w/ "My Hub" greeting
- 3 sections: Upcoming Events, Job Applications, Mentorship Requests
- Shows items from `rsvpEvents`, `appliedJobs`, and `mentorRequests` state

**Interactions:**
- Empty states with call-to-actions linking to the respective browse pages
- Read-only summary of the user's engagement

---

## 8. Cross-Cutting UI Patterns

### Sidebar (always visible, fixed left)
- Logo "OF" circle + "Alumni Network · Universität Bamberg"
- 8 nav items with active highlight (white bg, navy text, gold dot)
- Settings + Sign out at bottom (decorative)

### Topbar (sticky, every page)
- Global search input (fully functional cmd-K command palette spanning events, jobs, directory, news, and mentors)
- Bell icon with gold dot indicating notifications
- Profile chip (Sarah's avatar + name + class)

### HeroHeader (every page top)
- Gradient navy background with decorative gold circles
- Eyebrow (small uppercase gold), title (large bold), subtitle (navy-100), action button slot
- Counts in the subtitle pull live from AppState wherever applicable

### Toasts (bottom-right)
- 3 kinds: success (green check) / info (navy info) / error (red alert)
- Auto-dismiss after 3.5 seconds
- Manual close X button
- Slide-in-from-right animation

### Modals
- Full-screen backdrop blur, click-outside or ESC to close
- Sticky header with title + close button
- Body scrolls if content overflows 90vh
- Lock body scroll while open

### Button styles (defined in `globals.css`)
- `.btn-primary` — solid navy
- `.btn-gold` — solid gold (used for primary CTAs)
- `.btn-outline` — navy border on white
- `.btn-success` — solid green (used for confirmed states)
- `.chip` / `.chip-gold` / `.chip-green` — small rounded pills

---

## 9. End-to-End Demo Flow

A suggested narrative for the stakeholder walkthrough:

1. **Land on `/dashboard`** — Sarah Müller's welcome screen. Point out the personalised greeting, the live counters (RSVPs, connections, donations), the activity feed, and the Class of 2019 gift card.

2. **Inline RSVP on the dashboard** — Click "RSVP" on the Tech Talk row. Counter increments. Toast appears. Stat card "Upcoming Events" goes up by 1.

3. **Visit `/events`** — Show the 12 events, then filter by "Networking". Search for "Munich". Click the featured event "Annual Alumni Reunion 2026" RSVP button. Open the Share modal and demonstrate the link copy + social buttons.

4. **Propose an event** — Click "Propose an Event", fill in a dummy form, submit. Toast confirms submission.

5. **Visit `/jobs`** — Filter by "Referral offered only". Save a couple of jobs. Apply to "Senior Backend Engineer at Siemens" using the modal — show the CV upload + cover note. Button flips to "Applied".

6. **Visit `/directory`** — Search for "Anna". Click her avatar to open her profile modal. Close it. On a non-connected alum, click "Connect" — button goes to "Pending". Click an existing connection's "Message" → fill the form → send.

7. **Visit `/giving`** — Show three live summary cards. Click "Contribute" on Scholarship Fund. Pick €100 preset, choose payment method, submit. Watch all three counters increment, watch progress bar fill, watch a new row appear at the top of the giving history table.

8. **Visit `/news`** — Filter by "Alumni". Click "How Anna Klein '19 is building privacy-first ML at Google" — reader modal opens with full body. Close. Article now shows "Read" chip.

9. **Visit `/mentorship`** — Filter by "Engineering". Click "Request Session" on Anna Klein, pick a topic, pick "Wed 16:00", submit. Button flips to "Requested" badge.

10. **Visit `/transcript`** — Show ECTS total (78), final grade (1.20 — "Sehr gut"), semester breakdown, certifications. Open "Request Verification", fill in recipient details, submit. Mention blockchain credential angle.

11. **Reload the page** — All state persists (RSVPs, applications, donations, etc.). Demonstrates that the system "remembers" everything.

---

## 10. How to Run

```bash
cd /Users/tanmay/alumni-dashboard
npm install      # one-time
npm run dev      # starts dev server on port 3000 (auto-fallback to 3001 if busy)
```

Open `http://localhost:3000/` (auto-redirects to `/dashboard`).

### Other scripts

```bash
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
npx tsc --noEmit # type-check without emitting
```

---

## 11. Known Demo Limitations

These are intentional simplifications for the prototype — flag in the demo if asked:

- **No authentication.** The app assumes the user is always Sarah Müller.
- **No backend.** Submissions never reach a server. They populate local state and fire toasts.
- **No payment processing.** The donate modal mocks the flow.
- **No real file uploads.** The "Upload PDF" picker is decorative.
- **No email sending.** Receipt / verification "send" actions only toast.
- **No real-time notifications.** The bell icon's gold dot is static.
- **Limited responsive testing.** Sidebar is fixed-width on desktop; mobile layout exists via Tailwind responsive utilities but the primary target is desktop demo.
- **Avatar images load from `i.pravatar.cc`** and event images from `images.unsplash.com`. These are external dependencies; if offline, images fall back to broken-image icons.

---

## 12. Extending the Demo

Things that would be straightforward next steps if the demo moves toward implementation:

- Wire `lib/mock-data.ts` to real REST or GraphQL endpoints
- Replace `AppProvider` localStorage persistence with React Query or SWR + a backend
- Add NextAuth.js for university SSO
- Add mobile navigation drawer (currently sidebar takes 256px even on small screens)
- Add server-side rendering for SEO on public pages (news, events)
- Replace the `OF` placeholder logo circle with the actual university seal

---

## 13. Architecture Graph (via Graphify / Code Review Graph)

The application codebase has been analysed using the Code Review Graph tool, yielding 13 major structural communities interconnected by 53 cross-community dependencies:

1. **components-key** (32 members): The core UI component library (Sidebar, Topbar, Modals, GlobalSearch). Highly cohesive.
2. **lib-toggle** (21 members): Global state and i18n management (`AppState.tsx` and `i18n.ts`), acting as the primary dependencies for all other pages.
3. **Feature Communities**: Distinct directory-based communities for each page (`giving-fmt`, `jobs-jobs`, `directory-directory`, `dashboard-dashboard`, `news-fmt`, `offers-offers`, `mentorship-mentorship`, `events-fmt`, `activity-activity`, `transcript-transcript`). These encapsulate the page logic and helper utilities for specific views.
4. **app-root**: The core `layout.tsx` linking global providers to the UI tree.

**Key Insights:**
- The system exhibits excellent separation of concerns. Every feature `/app/*` operates as an independent community, bound only by calls to `lib-toggle` (state/i18n) and `components-key` (shared UI).
- `AppState.useApp` and `i18n.useTranslation` are the most critical hub nodes linking the feature communities together.
