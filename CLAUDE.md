# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for "Nixon" — vanilla HTML5, CSS3, and JavaScript. No build tools, frameworks, or package manager.

## Development

Open `Main.html` directly in a browser — no build step required. Preferred local dev server (Node is available):

```bash
npx serve . --listen 3000
# then open http://localhost:3000/Main.html
```

## Architecture

Single-page site with all content in `Main.html`, styled by `style.css`, and interactivity in `script.js` (currently empty).

**External dependencies (CDN only):**
- Font Awesome 6.0.0 — icons
- Google Fonts — Space Grotesk (headings) + Poppins (body)

**CSS conventions:**
- Theme colors defined as CSS custom properties at `:root` — primary accent is `#00d4bd` (teal), background `#1a1a1a`
- Responsive breakpoint at `768px`
- Layout uses Flexbox and CSS Grid

**Sections in `Main.html` (in order):** nav → hero → about → projects → contact → footer

## Remote

GitHub: `https://github.com/nixonlemon24-dev/portfolio.git`
Active branch: `portfolio` (main branch: `main`)
