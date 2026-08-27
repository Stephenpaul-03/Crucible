# Crucible

Crucible is a markdown-powered workshop for documenting hardware projects. It brings project overviews, build logs, experiments, measurements, firmware, references, images, and lessons learned into a searchable workspace.

## Features

- Project cards with tags and searchable project metadata
- Per-project navigation loaded from JSON
- Markdown pages with frontmatter, fenced code, images, and quiz blocks
- Light and dark themes
- Command-palette search and desktop-oriented navigation

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Radix UI and shadcn/ui patterns
- `marked` for Markdown rendering and Prism for code highlighting

## Getting started

Requirements: Node.js 18+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The production build can be checked with:

```sh
npm run build
npm run preview
```

## Content model

Each hardware build is a project workspace made from three parts:

```text
src/constants/subjects.ts
public/content/<ProjectId>_Sidebar.json
public/content/<ProjectId>/home.md
public/content/<ProjectId>/<Category>/<entry-slug>.md
```

Register the project in `src/constants/subjects.ts`, add its sidebar JSON, then add the Markdown files referenced by that sidebar. Update the matching project copy in `src/constants/ui-copy.json` when adding a new workspace.

Topic routes use the category title and URL slug to resolve Markdown files. Numeric filename prefixes such as `01-first-power-on.md` are supported. See [USAGE.md](USAGE.md) for the complete authoring workflow and [ADDING_PROJECTS.md](ADDING_PROJECTS.md) for the short checklist.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

Before opening a change, run `npm run build`, `npm run lint`, and `git diff --check`.
