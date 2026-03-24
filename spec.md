# AtherixCloud

## Current State
Full-stack dark/cyber-themed hosting landing page with video hero, 3D canvas animation, 8 sections (Navbar, Hero, Features, Pricing, Testimonials, FAQ, ContactAbout, Footer), and a working contact form backed by a Motoko canister. Uses glass-card components, neon glow utilities, and motion/react animations.

## Requested Changes (Diff)

### Add
- Cinematic horizontal divider lines between sections with gradient fade
- Animated gradient border effect on the "Most Popular" pricing card
- Subtle animated shimmer/glow sweep on primary CTA buttons
- Premium stat counters in hero (larger, more dramatic type scale)
- "Trusted by" logo row section beneath hero stats
- More refined section badge labels (borderless pill with dot accent)

### Modify
- **Global typography**: increase heading sizes, tighten letter-spacing, switch display font weight to 800+ for hero, use more contrast between heading and body text
- **Color palette**: deepen background slightly, increase primary cyan vibrancy, add subtle gold/amber accent for premium highlight touches
- **Navbar**: add subtle frosted glass border line, refine logo treatment, add active-section underline indicator
- **Hero**: increase heading scale to 7xl/8xl on large screens, remove generic subtitle text verbosity, make stat row more dramatic (larger values, refined labels), make CTA buttons more substantial with icon animations on hover
- **Features section**: increase card padding, add top gradient bar per card, improve icon container to look more premium
- **Pricing cards**: larger price display, more generous padding, premium border treatment, animated glow on hover for popular card, improved button style
- **Testimonials**: add avatar initials circle, show company name more prominently, improve quote styling with large quotation mark watermark
- **Footer**: more polished layout, subtle top border gradient
- **index.css**: add `animate-shimmer`, `premium-border` utilities, tighten global spacing scale

### Remove
- Generic "Why AtherixCloud" section badge label (replace with refined version)
- Overly verbose hero subtitle text

## Implementation Plan
1. Update `index.css` with new utilities: `animate-shimmer`, `premium-card`, `text-gradient-gold`, tighter letter-spacing helpers
2. Rewrite `Navbar.tsx` - frosted glass refinement, bolder logo, active link glow
3. Rewrite `Hero.tsx` - larger heading, more dramatic stats, refined CTA buttons with hover micro-animations
4. Rewrite `Features.tsx` - premium card style with gradient top bar per card
5. Rewrite `Pricing.tsx` - larger price type, animated border on popular card, premium button styles
6. Rewrite `Testimonials.tsx` - avatar initials, large quote mark watermark, more premium card feel
7. Polish `Footer.tsx` - cleaner layout, refined newsletter section
