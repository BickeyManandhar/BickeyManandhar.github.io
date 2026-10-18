# bickeymanandhar.com.np

Personal portfolio of Bickey Manandhar, built as a "live system": the hero is an animated architecture graph, each section is a service with a health check, and the career history reads as a deployment log.

**Live:** https://bickeymanandhar.com.np

## Stack

- React 19 + TypeScript, bundled with Vite
- Canvas 2D for the architecture graph, SVG for the journey animation
- Plain CSS with design tokens and light/dark themes
- GitHub Actions builds and deploys to GitHub Pages on every push to `main`
- Cloudflare DNS for the custom domain

No backend, no database.

## Structure

```
src/
  content.ts            all site copy (edit this to update the portfolio)
  App.tsx               page layout, command palette commands
  components/
    ArchitectureGraph   animated canvas graph with hover highlighting
    Hero                headline, graph, simulated traffic log, stats
    Journey             Nepal → United States footsteps animation
    About, Experience, Skills, Projects, Education, Contact
    CommandPalette      ⌘K / Ctrl K navigation
  hooks/                theme, reduced motion, active section, scroll progress, copy
public/
  photo.webp, CNAME
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Accessibility

Respects `prefers-reduced-motion` (animations stop, graph renders still), supports keyboard navigation, and follows the OS light/dark setting until a theme is chosen.
