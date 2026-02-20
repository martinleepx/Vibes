# Product Requirements Document: Free
## Christian Habit-Breaking Accountability App

**Version:** 1.0
**Last Updated:** 2026-02-20
**Product:** Free
**Target Launch:** MVP in 2-3 weeks (iOS first, church beta)

---

## 1. Executive Summary

### 1.1 Vision
**Free** is a faith-based mobile accountability app designed to help Christians break free from habitual struggles through daily intentional confirmation, crisis intervention, accountability partnerships, and spiritual encouragement rooted in Scripture.

### 1.2 Mission
Provide a safe, private, and spiritually-grounded tool that empowers believers to overcome destructive habits by combining streak accountability, crisis support, and Christian community.

### 1.3 Target Audience
- **Primary:** All Christians (gender-neutral positioning)
- **Demographics:** Ages 18-45, faith-active individuals seeking accountability
- **Psychographics:** Motivated by faith, desire privacy, value authentic accountability, struggle with habitual behaviors they want to overcome

### 1.4 Core Value Proposition
Unlike generic habit trackers, **Free** combines:
- **Faith-centered content** (Scripture, devotionals, prayer)
- **Crisis intervention tools** when temptation strikes
- **Private accountability** without judgment
- **Grace-based approach** (streak restores, progress metrics beyond just streaks)

---

## 2. Product Overview

### 2.1 App Name & Brand Identity
- **Name:** Free
- **Tagline:** "Walk in freedom. Stay accountable. Grow in faith."
- **Aesthetic:** Calming + welcoming
  - Rounded UI elements
  - Gentle illustrations
  - Generous whitespace
  - Soft shadows
- **Color Palette:** Blues + greens (peace, renewal, hope)
- **Tone:** Encouraging, grace-filled, non-judgmental, spiritually grounding

### 2.2 Key Differentiators
1. **Crisis-First Design:** Break the Chain button prominently available when temptation strikes
2. **Faith Integration:** All content rooted in Scripture (ESV + NIV translations)
3. **Privacy-Focused:** Biometric lock, sensitive data handling
4. **Grace Mechanics:** 3 streak restores/month + lifetime progress metrics
5. **Freemium Model:** Core accountability free; advanced features premium (deferred to v2)

---

## 3. User Personas

### Persona 1: "David" - The Motivated Beginner
- **Age:** 28
- **Background:** Recently committed to overcoming pornography addiction
- **Needs:** Daily accountability, immediate crisis support, privacy
- **Pain Points:** Shame, isolation, late-night temptation
- **Goals:** Build a 90-day streak, find supportive accountability partner

### Persona 2: "Sarah" - The Relapse Recoverer
- **Age:** 35
- **Background:** Has tried to quit multiple times, experienced relapses
- **Needs:** Grace-based approach, long-term perspective, encouragement
- **Pain Points:** Discouragement after relapse, all-or-nothing thinking
- **Goals:** See overall progress, not just current streak; maintain hope

### Persona 3: "Marcus" - The Private Seeker
- **Age:** 22
- **Background:** Wants accountability but too embarrassed to tell friends/family
- **Needs:** Anonymous community connection, discreet app usage
- **Pain Points:** Fear of judgment, lack of safe spaces
- **Goals:** Connect with others facing similar struggles without revealing identity

---

## 4. MVP Feature Specifications (2-3 Weeks, iOS First)

### 4.1 Core Features (Included in MVP)

#### 4.1.1 Streak Tracking
**Description:** Prominent daily streak counter tracking consecutive days of freedom.

**Specifications:**
- **Display:** Large number front-and-center on home screen (hero element)
- **Starting Point:** Day 0 on first app launch
- **Reset Time:** Local device midnight
- **Daily Confirmation:** User must tap large "I stayed free today" button daily
- **Grace Period:** Until 3am next day to confirm previous day
- **Missed Confirmation:** Streak goes "cold" after midnight, but user can restore

**Streak Restore Feature:**
- 3 restores per month to account for forgetfulness
- One-tap "Restore Streak" button appears when streak breaks
- Shows remaining restores (e.g., "2/3 restores left this month")
- Resets monthly on the 1st

**Relapse Handling:**
- Streak resets to 0 when user manually reports relapse or doesn't confirm
- Show **lifetime progress metrics:**
  - Total sober days
  - Lifetime sobriety percentage
  - Longest streak achieved
- Encouraging message: "You're not starting over. You're starting with experience."

#### 4.1.2 Crisis Intervention ("Break the Chain")
**Description:** Immediate support when user faces temptation or is about to relapse.

**Free Tier - Basic Crisis Mode:**
- **Trigger:** Large "Break the Chain" button visible on home screen
- **Flow:**
  1. User taps button
  2. Immediate verse display (full-screen, calming)
  3. Verse shown with full reference + translation tag
  4. Example: "No temptation has overtaken you except what is common to mankind..." (1 Corinthians 10:13, ESV)

**Premium Tier - Advanced Crisis Mode:**
- All of above, plus:
- **Guided Meditation (2-3 minutes):**
  - Verse displayed
  - 3-4 reflection questions (text-based)
  - Simple breathing prompt
  - Example questions:
    - "What is God saying to you through this verse?"
    - "What truth can you hold onto right now?"
    - "How can you take the next right step?"
- **Physical Challenge (opt-in):**
  - Preset challenge menu: 20 push-ups, 50 jumping jacks, 1-min plank, short walk
  - Honor system completion
  - Breaks mental/physical pattern

**First-Time Use:**
- One-time tutorial overlay: "Tap for verse, read slowly, then tap meditation if needed"

**Verse Library:**
- 20-30 curated power verses for MVP
- Curated list (same for all users initially)
- ESV + NIV translations available
- User can toggle translation in settings
- Expand library post-MVP based on feedback

#### 4.1.3 Accountability Partner
**Description:** Connect with one trusted person who can see streak status and send encouragement.

**MVP Specifications:**
- **Partner Limit:** Unlimited partners for everyone (free + premium)
- **Setup Flow:**
  - User generates unique shareable connection code
  - User shares code via any method (text, email, in-person)
  - Partner downloads app and enters code to connect
- **Visibility:** Partner sees:
  - Current streak count
  - Milestone achievements
  - Can send encouragement messages within app
- **Reporting:** Manual only
  - User chooses when/if to share relapse with partner
  - No automatic relapse notifications
- **Messaging:** Simple in-app text messaging between accountability partners

#### 4.1.4 Journal Entries
**Description:** Prompted reflection to track triggers, feelings, and progress.

**Specifications:**
- **Entry Type:** Prompted/guided journal entries
- **Prompts:**
  - "What triggered this feeling?"
  - "What am I grateful for today?"
  - "What helped me stay strong today?"
  - "What am I learning about myself?"
- **Storage:** Encrypted in Supabase
- **Access:** Private to user only (not shared with partners)
- **Empty State:** Scripture + explanation + "Start Your First Entry" CTA

#### 4.1.5 Milestone Badges
**Description:** Celebrate key streak achievements with badges and scripture.

**Milestones:**
- 7 days
- 14 days
- 30 days
- 60 days
- 90 days
- 180 days
- 365 days

**Badge Style:** Number-based with encouraging text
- Example: "7 Days Strong!", "30 Days Free!", "90 Days - You're Free!"

**Delivery:**
- Push notification when milestone hit
- Badge displayed in Profile/Progress section
- Badge includes relevant scripture verse

#### 4.1.6 Daily Encouragement Notifications
**Description:** Twice-daily push notifications with scripture to maintain engagement.

**Timing:**
- **Morning:** User-selected time (default 8am) - set during onboarding
- **Evening:** User-selected time (default 8pm) - set during onboarding

**Content:**
- Short Bible verse snippet (1-2 sentences)
- Verse reference included
- Alternates between ESV and NIV based on user preference

**Additional Notifications:**
- Milestone celebrations
- Accountability partner messages
- Evening reminder if daily confirmation not completed by 9pm

**Permission Request:** During onboarding (early) with clear value prop: "Get daily encouragement and milestone celebrations"

#### 4.1.7 Onboarding Flow (3-4 Screens)

**Screen 1: Welcome**
- App name + tagline
- Visual: Calming illustration
- CTA: "Begin Your Journey"

**Screen 2: How It Works**
- Brief explanation of daily confirmation
- Mention of Break the Chain button
- Mention of accountability partners
- CTA: "Continue"

**Screen 3: Notification Preferences**
- Request push notification permission
- Set morning encouragement time (default 8am)
- Set evening check-in time (default 8pm)
- Value prop: "Daily scripture and milestone celebrations"
- CTA: "Enable Notifications" / "Skip for Now"

**Screen 4: Set Up Biometric Lock (Optional)**
- Explain privacy: "Keep your journey private"
- Enable Face ID / Touch ID
- CTA: "Enable Lock" / "Skip"

**Post-Onboarding:**
- Land on home screen at Day 0
- Show "Confirm Day 1" button (ready for tomorrow)
- Optional: Prompt to set up accountability partner (can skip)

---

### 4.2 Home Screen Layout

**Layout:** Balanced (all elements visible)

**Components (Top to Bottom):**
1. **Header:**
   - App logo/name
   - Settings gear icon (top-right)
   - Profile/progress icon (top-left)

2. **Streak Counter (Hero Element):**
   - Large number display: "Day 42"
   - Subtitle: "Your longest: 67 days"
   - Visual progress ring/bar

3. **Daily Confirmation Button:**
   - Large primary button: "I Stayed Free Today" or "Confirm Day X"
   - Disabled after confirmation (shows checkmark)
   - Badge: "Not confirmed yet" if past noon

4. **Break the Chain Button:**
   - Prominent secondary button
   - Always visible and accessible
   - Subtle pulsing animation to draw attention

5. **Today's Encouragement:**
   - Card with today's verse snippet
   - Tap to expand full verse

6. **Bottom Navigation:**
   - Home
   - Journal
   - Partners
   - Progress

---

### 4.3 Settings (Moderate Depth: 8-12 Options)

**Categories:**

**Account**
- Sign out
- Delete account

**Notifications**
- Morning encouragement time
- Evening check-in time
- Partner messages (on/off)
- Milestone celebrations (on/off)

**Privacy**
- Biometric lock (toggle)
- Clear journal history

**Content**
- Bible translation (ESV / NIV)
- Daily verse topics (future)

**Accountability**
- Manage partners
- Generate new connection code

**Support**
- Help & FAQs
- Contact support
- Privacy policy
- Terms of service

---

### 4.4 Technical Architecture

#### Tech Stack
- **Frontend:** React Native + Expo
- **Backend:** Supabase (Postgres, real-time sync, auth)
- **Authentication:** Social sign-in (Google + Apple Sign-In)
- **Push Notifications:** Expo Notifications
- **Payments:** Deferred to v2 (RevenueCat when implemented)
- **Analytics:** Standard engagement metrics (Supabase Analytics or PostHog)

#### Data Models

**Users**
```
- id (UUID)
- email (string)
- display_name (string)
- created_at (timestamp)
- biometric_lock_enabled (boolean)
- bible_translation_preference (enum: ESV, NIV)
- morning_notification_time (time)
- evening_notification_time (time)
```

**Streaks**
```
- id (UUID)
- user_id (UUID, FK)
- current_streak (integer)
- longest_streak (integer)
- total_sober_days (integer)
- streak_start_date (date)
- last_confirmed_date (date)
- restores_used_this_month (integer, max 3)
- restores_reset_date (date)
```

**JournalEntries**
```
- id (UUID)
- user_id (UUID, FK)
- created_at (timestamp)
- prompt (string)
- entry_text (text, encrypted)
```

**AccountabilityPartners**
```
- id (UUID)
- user_id (UUID, FK)
- partner_user_id (UUID, FK)
- connection_code (string, unique)
- status (enum: pending, active, removed)
- created_at (timestamp)
```

**Milestones**
```
- id (UUID)
- user_id (UUID, FK)
- milestone_days (integer: 7, 14, 30, 60, 90, 180, 365)
- achieved_at (timestamp)
- verse_reference (string)
```

#### Offline Functionality
- **Mode:** Read-only offline
- **Behavior:**
  - Users can view existing data (current streak, past journal entries, progress)
  - Cannot confirm day or take new actions without connection
  - Sync queued actions when back online
  - Show clear "offline mode" indicator

#### Security & Privacy
- **Biometric Lock:** Face ID / Touch ID to open app
- **Data Encryption:** Supabase encryption at rest
- **Journal Encryption:** Client-side encryption for journal entries
- **No Data Export:** Not included in MVP

#### Accessibility
- **Standard WCAG 2.1 AA compliance:**
  - Screen reader support (VoiceOver, TalkBack)
  - Proper ARIA labels
  - Sufficient color contrast (4.5:1)
  - Touch targets 44x44pt minimum
  - Support for dynamic text sizes

#### Error Handling
- **Style:** Clear actionable messages
- **Examples:**
  - "Couldn't connect. Check your internet and try again."
  - "Something went wrong saving your entry. Please try again."
- **Loading States:** Simple spinner with app name
- **Empty States:** Scripture + explanation + CTA

---

## 5. Content Strategy

### 5.1 Verse Curation (20-30 for MVP)

**Categories:**
- **Temptation & Strength:** 1 Cor 10:13, James 1:12, Psalm 119:9-11
- **Identity in Christ:** 2 Cor 5:17, Gal 5:1, Rom 6:11-14
- **God's Faithfulness:** Lam 3:22-23, Phil 1:6, Heb 13:5
- **Hope & Renewal:** Isaiah 43:18-19, Rev 21:5, Psalm 51:10
- **Victory:** Rom 8:37-39, 1 John 5:4-5, 1 Cor 15:57

**Selection Criteria:**
- Directly relevant to overcoming habitual sin
- Encouraging and hopeful (not condemning)
- Memorable and quotable
- Theologically sound

### 5.2 Devotional Content (V2 Premium Feature)
- **Source:** Public domain + curated Bible passages
- **Frequency:** Daily devotionals (optional)
- **Length:** 2-3 minute reads
- **Format:** Passage + reflection + application question

### 5.3 Notification Copy Examples

**Morning Encouragement:**
- "Good morning! 'Create in me a pure heart, O God.' - Psalm 51:10"
- "You are loved. 'The Lord your God is with you, mighty to save.' - Zeph 3:17"

**Evening Check-In:**
- "How's your heart tonight? 'Cast all your anxiety on him because he cares.' - 1 Pet 5:7"
- "Remember: 'His mercies are new every morning.' - Lam 3:23"

**Milestone Celebrations:**
- "7 days strong! 'Being confident of this, that he who began a good work in you will carry it on to completion.' - Phil 1:6"
- "30 days free! 'You are a new creation. The old has gone, the new is here!' - 2 Cor 5:17"

---

## 6. Monetization (Deferred to V2)

### 6.1 Freemium Model

**Free Tier:**
- Streak tracking with unlimited restores (3/month)
- Daily confirmation
- Basic crisis intervention (verse only)
- 1 accountability partner (unlimited total)
- Prompted journal entries
- Milestone badges
- Twice-daily encouragement notifications

**Premium Tier ($9.99/month):**
- Advanced crisis features:
  - Guided meditation (text + reflection questions)
  - Physical challenge options
- Advanced analytics:
  - Sobriety percentage trends
  - Trigger pattern identification
  - Best/worst times of day
- Ad-free experience
- Full devotional library (20+ original devotionals)
- Priority support

**Payment Processing (V2):**
- RevenueCat for iOS/Android in-app purchases
- Monthly subscription: $9.99
- Annual subscription: $79.99 (save 33%)

---

## 7. Success Metrics & Analytics

### 7.1 Key Performance Indicators (KPIs)

**Engagement:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Daily confirmation rate (% of users confirming daily)
- Average streak length
- Retention: Day 7, Day 30, Day 90

**Crisis Intervention:**
- Break the Chain button usage frequency
- Time spent in meditation mode
- Physical challenge completion rate

**Accountability:**
- % of users with at least 1 partner
- Average accountability messages per week
- Partner engagement rate

**Milestones:**
- % of users reaching 7-day, 30-day, 90-day milestones
- Average time to first milestone

**Monetization (V2):**
- Free-to-premium conversion rate
- Churn rate
- Lifetime value (LTV)

### 7.2 Analytics Implementation
- **Tool:** Supabase Analytics or PostHog
- **Approach:** Standard engagement metrics
- **Privacy-First:**
  - No personally identifiable information (PII) in events
  - Aggregated data only
  - User can opt-out in settings

### 7.3 Tracked Events
- App opened
- Daily confirmation completed
- Streak restored
- Break the Chain tapped
- Meditation completed
- Physical challenge selected
- Journal entry created
- Partner connected
- Milestone achieved
- Notification opened

---

## 8. Launch Strategy

### 8.1 MVP Timeline
- **Phase 1 (Week 1):** Core UI + authentication + streak tracking
- **Phase 2 (Week 2):** Crisis intervention + accountability partners + notifications
- **Phase 3 (Week 3):** Journal + milestones + polish + testing

### 8.2 Beta Testing
- **Strategy:** Church group closed beta
- **Size:** 10-20 users from Christian men's/women's accountability groups
- **Duration:** 1-2 weeks
- **Goals:**
  - Validate core user flow
  - Test crisis intervention effectiveness
  - Gather feedback on tone/messaging
  - Identify bugs

### 8.3 Launch Platforms
- **Phase 1:** iOS only (TestFlight beta, then App Store)
- **Phase 2:** Android (after iOS validation, 4-6 weeks post-iOS launch)

### 8.4 Quality Bar for Beta
- **Standard:** Polished MVP (quality-first)
  - Core features fully functional
  - Smooth animations and transitions
  - Beautiful, calming UI
  - No critical bugs
  - Accessible (WCAG 2.1 AA)

---

## 9. V2 Roadmap (Post-MVP)

### 9.1 Community Features
**Description:** Allow users to discover and connect with others they don't know IRL.

**Features:**
- Browse public accountability groups
- Filter by denomination, age group, topic
- Request to join group (admin approval)
- Group features:
  - See each other's streak status
  - Share encouragement messages (text only)
  - Group milestones when all members hit goals

**Privacy:**
- Display names + optional avatars
- No real names required
- Moderated groups (group creator = admin)

**Moderation:**
- Group-level moderation by admins
- User reporting
- Auto-moderation (profanity filter)

### 9.2 Premium Subscription Implementation
- Integrate RevenueCat
- In-app purchase flows
- Premium feature gating
- Trial period (7 days free)

### 9.3 Advanced Analytics
- Trigger pattern identification (time of day, day of week)
- Progress charts and trends
- Personalized insights
- Export progress reports (PDF)

### 9.4 Expanded Content
- Expand verse library to 100+ verses
- Original devotional content (20+ pieces)
- Audio devotionals for vision-impaired users
- Lectio Divina framework option for meditation

### 9.5 Personalization
- AI-contextual verse selection (based on time, streak, journal sentiment)
- Personalized notification timing
- Custom physical challenges
- User-curated verse collections

---

## 10. Open Questions & Future Considerations

### 10.1 Open Questions
- Should we add a "panic button" that immediately calls/texts accountability partner? (Safety concern)
- How to handle users who abuse streak restore feature?
- Should we add themed app icons for discretion?
- Integration with church management systems (Planning Center, etc.)?

### 10.2 Future Considerations
- **Internationalization:** Translate app + verses into Spanish, Portuguese, etc.
- **Pastoral Partnerships:** Approved counselor/pastor directory for professional help
- **Content Partnerships:** License devotional content from known Christian authors
- **Wearable Integration:** Apple Watch complication for quick crisis access
- **Web App:** Browser-based version for desktop accountability

### 10.3 Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low user engagement after initial download | High | Strong onboarding, twice-daily notifications, accountability partner prompts |
| Crisis feature not effective during real temptation | High | Beta test extensively, iterate based on feedback, add more intervention tools |
| Privacy breach / data leak | Critical | Supabase encryption, biometric lock, security audit before launch |
| App Store rejection (sensitive topic) | High | Careful positioning as "habit accountability," not explicit sexual content |
| Users feel judged or condemned | Medium | Grace-filled copy, restore features, focus on progress not perfection |

---

## 11. User Stories

### 11.1 Core User Journeys

**Journey 1: New User Onboarding**
- Sarah downloads Free from App Store
- Completes 3-screen onboarding (welcome, how it works, notification setup)
- Enables biometric lock for privacy
- Lands on home screen at Day 0
- Sets up accountability partner (generates code, texts to friend)
- Receives first encouragement notification that evening

**Journey 2: Daily Confirmation**
- David opens app in the morning
- Sees large "I Stayed Free Today" button
- Taps to confirm Day 15
- Receives encouraging animation and updated streak counter
- Reads today's verse in the encouragement card
- Closes app, continues day

**Journey 3: Crisis Intervention**
- Marcus faces temptation late at night
- Opens app, taps "Break the Chain" button
- Immediately sees calming full-screen verse
- Reads slowly, breathes
- Taps "Continue to Meditation" (premium feature)
- Works through 3 reflection questions
- Opts into physical challenge (50 jumping jacks)
- Completes challenge, temptation passes
- Returns to home screen, crisis averted

**Journey 4: Relapse & Recovery**
- Sarah relapses after 42-day streak
- Opens app honestly, reports relapse
- Streak resets to Day 0
- App shows:
  - "You're not starting over. You're starting with experience."
  - Lifetime stats: 112 total sober days (73% sobriety rate)
  - Longest streak: 42 days
- Prompted to journal: "What led to this?"
- Sarah writes reflection
- App suggests reaching out to accountability partner
- Sarah sends message, receives encouragement
- Starts Day 1 again with renewed commitment

**Journey 5: Milestone Achievement**
- David hits 30-day streak
- Receives push notification: "30 days free! You're a new creation!"
- Opens app to see new badge with scripture
- Badge includes: 2 Corinthians 5:17
- Shares milestone with accountability partner
- Partner sends congratulations message

---

## 12. Design Specifications

### 12.1 Visual Style Guide

**Colors:**
- **Primary Blue:** #4A90E2 (calm, trust)
- **Secondary Green:** #7ED321 (growth, renewal)
- **Accent Teal:** #50E3C2 (hope, freshness)
- **Background:** #F8F9FA (soft white)
- **Text Primary:** #2C3E50 (dark gray)
- **Text Secondary:** #7F8C8D (medium gray)
- **Error/Relapse:** #E74C3C (soft red, not harsh)
- **Success:** #27AE60 (affirming green)

**Typography:**
- **Primary Font:** SF Pro / Roboto (system default)
- **Headings:** Semi-bold, 24-32pt
- **Body:** Regular, 16-18pt
- **Verse Text:** Serif font (Georgia or similar), 18-20pt for readability

**Iconography:**
- Rounded, friendly icons (Feather Icons or SF Symbols)
- Consistent 2px stroke weight
- Avoid harsh or aggressive symbols

**Spacing:**
- Base unit: 8px
- Generous whitespace (16px minimum between major sections)
- Card padding: 16-24px
- Screen margins: 16px

### 12.2 Component Library

**Buttons:**
- **Primary:** Large, rounded (12px radius), blue background, white text
- **Secondary:** Outlined, rounded, teal border, teal text
- **Destructive:** Soft red background (use sparingly)

**Cards:**
- White background
- Subtle shadow: 0px 2px 8px rgba(0,0,0,0.08)
- Rounded corners: 12px
- Padding: 16px

**Illustrations:**
- Gentle, minimalist line art
- Use primary color palette
- Avoid overly detailed or busy imagery
- Focus on: light, growth, mountains, water, paths

### 12.3 Animation Principles
- **Subtle:** Avoid jarring or aggressive animations
- **Purposeful:** Animations guide attention (e.g., confirmation button success state)
- **Calming:** Slow, smooth transitions (300-400ms duration)
- **Examples:**
  - Streak counter increments with gentle scale animation
  - Break the Chain button subtle pulse (opacity 0.8 to 1.0)
  - Milestone badge "reveal" with fade + scale

---

## 13. Competitive Analysis

### 13.1 Direct Competitors

**1. Fortify (fortifyprogram.org)**
- **Strengths:** Comprehensive program, educational content, progress tracking
- **Weaknesses:** Not mobile-first, lacks real-time crisis intervention, less focus on community
- **Differentiation:** Free has simpler UX, instant crisis tools, mobile-optimized

**2. Covenant Eyes**
- **Strengths:** Accountability software, screen monitoring, partner reports
- **Weaknesses:** Invasive monitoring, expensive, feels surveillance-based
- **Differentiation:** Free is trust-based, non-invasive, focuses on internal motivation

**3. Trybe (trybe.app)**
- **Strengths:** Christian community, accountability groups, clean design
- **Weaknesses:** No crisis intervention tools, less focused on specific habits
- **Differentiation:** Free has dedicated crisis mode, streak mechanics, immediate support

### 13.2 Indirect Competitors

**1. Streaks / Habit Tracking Apps (Habitica, Streaks, etc.)**
- **Strengths:** Gamification, beautiful UI, broad habit tracking
- **Weaknesses:** No faith integration, no crisis tools, generic encouragement
- **Differentiation:** Free is faith-centered, crisis-focused, community-driven

**2. YouVersion Bible App**
- **Strengths:** Comprehensive Bible resource, devotionals, massive user base
- **Weaknesses:** Not accountability-focused, no streak tracking or crisis intervention
- **Differentiation:** Free is accountability-first with targeted scripture, not general Bible reading

---

## 14. Appendix

### 14.1 Glossary
- **Streak:** Consecutive days a user has stayed free from their habit
- **Break the Chain:** Crisis intervention feature triggered when facing temptation
- **Accountability Partner:** Trusted person who can see streak status and send encouragement
- **Restore:** Feature allowing users to undo streak break (3x per month)
- **Milestone:** Achievement at key streak intervals (7, 30, 90 days, etc.)
- **Power Verse:** Curated scripture specifically chosen for overcoming temptation

### 14.2 References
- **Scripture References:** ESV API, NIV API (licensing required)
- **Design Inspiration:** Headspace, Calm, YouVersion, Trybe
- **Accountability Research:** Studies on habit formation, addiction recovery, faith-based interventions

### 14.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-20 | Product Team | Initial PRD based on user interview |

---

## 15. Approval & Sign-Off

**Product Owner:** [Name]
**Engineering Lead:** [Name]
**Design Lead:** [Name]
**Stakeholder Approval:** [Name]

**Approved for Development:** ☐ Yes  ☐ No
**Target Kickoff Date:** [Date]

---

**END OF PRODUCT REQUIREMENTS DOCUMENT**
