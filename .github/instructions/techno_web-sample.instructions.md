---
description: "Use when creating new plain HTML/CSS/JavaScript web samples in this repository. Enforces techno_ naming, semantic markup, and vanilla JS/CSS conventions."
name: "Techno Web Sample Conventions"
applyTo: ["**/*.html", "**/*.css", "**/*.js"]
---
# Techno Web Sample Conventions

- Name new sample entry files with the `techno_` prefix (required):
  - `techno_*.html`
  - `techno_*.css`
  - `techno_*.js`
- Keep new sample files at repository root unless the user asks for a subfolder.
- Use semantic HTML with external stylesheet and external JavaScript file.
- Use vanilla JavaScript only (no frameworks or build tooling).
- Use 2-space indentation.
- Use single quotes in JavaScript.
- Use kebab-case for CSS class names.
- Keep changes focused on the requested sample; avoid refactoring unrelated files.
