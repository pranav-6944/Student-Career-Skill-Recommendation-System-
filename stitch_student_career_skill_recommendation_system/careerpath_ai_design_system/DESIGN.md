# CareerPath AI — Design System

## Brand Identity
CareerPath AI is a modern AI-powered career guidance platform for college students. The design communicates trust, intelligence, personalization, and career growth.

## Color Palette
- **Primary**: Indigo `#4F46E5` — main brand color for CTAs, headings, active states
- **Secondary**: Purple `#7C3AED` — accents, gradients, highlights
- **Tertiary**: Sky Blue `#0EA5E9` — data visualizations, info elements
- **Success**: `#10B981` — matched skills, high percentages
- **Warning**: `#F59E0B` — missing skills, medium match
- **Error**: `#EF4444` — low match, gaps
- **Surface**: `#F8FAFC` — page backgrounds
- **Card BG**: `#FFFFFF` — card surfaces
- **Border**: `#E2E8F0` — subtle borders
- **Text Primary**: `#0F172A` — headings
- **Text Secondary**: `#475569` — body text
- **Text Muted**: `#94A3B8` — labels, captions

## Typography Scale
- **Display**: Plus Jakarta Sans, 700 weight — page titles, hero headings
- **H1**: 32px/700 — section headings
- **H2**: 24px/600 — card titles
- **H3**: 18px/600 — subsection titles
- **Body**: Inter 16px/400 — main content
- **Small**: Inter 14px/400 — captions, labels
- **Tiny**: Inter 12px/500 — badges, chips

## Spacing
- Base unit: 4px
- Cards: 24px padding
- Sections: 48px vertical spacing
- Elements: 16px gaps

## Component Patterns

### Skill Badges/Chips
- Matched skills: `#DCFCE7` background, `#16A34A` text, `#BBF7D0` border
- Missing skills: `#FEF3C7` background, `#D97706` text, `#FDE68A` border
- Neutral skills: `#EEF2FF` background, `#4338CA` text, `#C7D2FE` border

### Career Match Cards
- White background, subtle shadow `0 1px 3px rgba(0,0,0,0.1)`
- Left border accent (4px colored strip)
- Progress bar for match percentage

### Progress Bars
- Height: 8px, border-radius: full
- High (>75%): gradient `#10B981 → #059669`
- Medium (50–75%): gradient `#F59E0B → #D97706`
- Low (<50%): gradient `#EF4444 → #DC2626`

### Stat Cards
- Icon in colored circle (48px)
- Large number in Plus Jakarta Sans 700
- Label below in muted text

### Navigation Sidebar
- White background, 240px wide
- Active item: indigo background `#EEF2FF`, indigo text `#4338CA`
- Hover: `#F8FAFC`

## Layout
- Sidebar navigation: 240px fixed left
- Main content: fluid right panel
- Content max-width: 1200px
- Grid: 12-column, 24px gutters

## Visual Language
- Rounded cards (8px radius)
- Subtle card shadows
- Blue/purple gradients for headers and hero sections
- Clean white cards on light gray background
- Icon usage: outlined style, 20–24px
- No neon, no excessive glow, no dark glass
- Professional SaaS feel: Notion + Linear + Figma aesthetic