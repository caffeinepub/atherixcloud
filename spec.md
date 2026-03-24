# AtherixCloud

## Current State
Single-page landing site with: Navbar, Hero (video bg), Features, Pricing (generic 4-plan), Testimonials, FAQ (has 3D icosahedron), ContactAbout (has 3D rings/spheres canvas), Footer (has 3D GridPlane canvas).

## Requested Changes (Diff)

### Add
- New VPS pricing section with two categories:
  **Intel VPS Plans** (Indian Node, high-performance):
  - 8 GB RAM | 2 vCores | 50 GB NVMe — ₹30/mo
  - 16 GB RAM | 4 vCores | 100 GB NVMe — ₹90/mo
  - 32 GB RAM | 6 vCores | 200 GB NVMe — ₹100/mo
  - 48 GB RAM | 8 vCores | 350 GB NVMe — ₹200/mo
  - 64 GB RAM | 12 vCores | 500 GB NVMe — ₹300/mo
  
  **Cheap VPS Plans**:
  - Basic Tier 1 — ₹60/mo: 4GB RAM, 1 Core, 30GB NVMe
  - Standard Tier 2 — ₹120/mo: 8GB RAM, 2 Cores, 50GB NVMe
  - Pro Tier 3 — ₹200/mo: 12GB RAM, 3 Cores, 100GB NVMe
  - Elite Tier 4 — ₹320/mo: 16GB RAM, 4 Cores, 150GB NVMe
  
  All plans include: Full Root Access, DDoS Protection, Ubuntu/Debian OS, NVMe Storage, Monthly Billing, Pterodactyl + Wings Supported, Share IPv4, No Refunds.
  Notice: INR or NPR payments only, IPv4 included.
  
  Buy button: opens https://discord.gg/PyawmEuCgp in new tab, with a note "No billing panel — open a ticket on our Discord to purchase".

### Modify
- Navbar: remove "About" and "Contact" links (those sections are deleted). Update Discord social link in footer to https://discord.gg/PyawmEuCgp.
- Footer: remove 3D GridPlane Canvas, replace with a CSS animated gradient line or simple decorative element.
- App.tsx: remove FAQ and ContactAbout imports and usages.

### Remove
- FAQ section (FAQ.tsx — entire section removed from page)
- ContactAbout section (ContactAbout.tsx — entire section removed from page)
- Old Pricing section (Pricing.tsx — replaced with new VPS pricing)
- All Three.js/React Three Fiber 3D code from remaining components (Footer GridPlane, any leftover Canvas)

## Implementation Plan
1. Create new `VPSPlans.tsx` component with Intel VPS + Cheap VPS categories, CSS/framer-motion animations only, buy button opens Discord link in new tab.
2. Update `App.tsx`: remove FAQ, ContactAbout, Pricing imports; add VPSPlans.
3. Update `Navbar.tsx`: remove About and Contact nav links.
4. Update `Footer.tsx`: remove 3D Canvas/GridPlane, replace with CSS decoration; update Discord social link to https://discord.gg/PyawmEuCgp.
5. Delete/ignore FAQ.tsx, ContactAbout.tsx, Pricing.tsx (no longer rendered).
