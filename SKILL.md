---
name: create-crucible-project
description: Create and register a new Crucible hardware project from files placed in a staging folder. Use when a user asks to add, import, or turn staged markdown content into a new project workspace, including sidebar generation, route registration, workspace copy, assets, structured reviews, and validation.
---

# Create a Crucible project

Use this workflow when the user has placed a new hardware project's files into a staging folder and wants the project added to Crucible.

## Guardrails

- Work only inside the Crucible repository.
- Treat the staging folder as source material. Do not delete or rewrite it unless the user explicitly asks.
- Preserve existing projects and unrelated user changes.
- Ask for the project ID and display label if they cannot be inferred safely from the staged files.
- Use a short ID with letters and digits only; prefer PascalCase, for example `Databases` or `FrontendBasics`.
- Do not add Playground, sandbox, or workspace-specific React components. Projects are markdown and JSON data.

## 1. Locate and inspect staging

Find likely staging directories before editing:

```sh
find . -maxdepth 3 -type d \( -iname "staging" -o -iname "stagging" \) -print
rg --files <staging-directory>
```

If there is more than one candidate, inspect each and ask which one to use. Identify:

- the intended project ID and display label;
- an overview or README that can become the project overview;
- project-entry markdown files;
- category folders or an existing sidebar JSON;
- images and other assets referenced by markdown;
- frontmatter, `:::quiz` blocks, and any unsupported interactive content.

Do not silently discard unsupported files. Explain where they can be represented as markdown or ask for direction.

## 2. Map the staged structure

Create the runtime structure below:

```text
public/content/<ProjectId>_Sidebar.json
public/content/<ProjectId>/home.md
public/content/<ProjectId>/<Category Title>/<entry-slug>.md
```

The category title in the sidebar must exactly match the directory name because the app uses that title when resolving entry files.

Each sidebar topic path must have this shape:

```text
/<category-slug>/<entry-slug>
```

The entry slug is the third segment of the path and must match the markdown filename, ignoring an optional numeric ordering prefix. The loader checks these filename forms:

```text
entry-slug.md
01-entry-slug.md
1-entry-slug.md
```

Use `home.md` for the workspace overview. If the staged material has no clear overview, create a short one that explains the hardware project, its current status, and where the build log begins.

## 3. Generate or validate the sidebar

Use this schema:

```json
{
  "home": { "label": "Overview", "path": "/" },
  "categories": [
    {
      "title": "Category Title",
      "topics": {
        "Readable Entry Name": "/category-slug/entry-slug"
      }
    }
  ]
}
```

Prefer an existing staged sidebar when it is complete and consistent. Otherwise generate one from the staged folders and filenames. Keep labels human-readable; keep paths lowercase and URL-safe.

Before continuing, verify every topic maps to one staged or created markdown file and every created markdown file is reachable from the sidebar unless it is an intentional asset or overview.

## 4. Prepare markdown and assets

- Keep project entries in markdown.
- Preserve frontmatter such as `title`, `layout`, and `mdn` when supported by the app.
- Use `layout: document` by default. Do not add sandbox fields.
- Use root-relative image paths such as `/content/<ProjectId>/images/example.png` so images work from every entry route.
- Place referenced images under `public/content/<ProjectId>/...` and verify their paths case-sensitively.
- Keep image alt text meaningful; markdown images are rendered centered and responsive by the app.
- Preserve valid `:::quiz` blocks. Multiple blocks in one entry are supported and become a sequential structured review.
- Convert unsupported interactive examples into explanatory markdown, code blocks, or a clear TODO rather than inventing a new component.

## 5. Register the project

Add one entry to `src/constants/subjects.ts`:

```ts
{
  id: "<ProjectId>",
  label: "<Display Label>",
  sidebarUrl: "/content/<ProjectId>_Sidebar.json",
  tags: ["<Hardware>", "<Status>"],
}
```

Add concise tags that describe the platform, hardware type, techniques, or project status. Tags appear on the project card and participate in project search.

Add matching copy to `src/constants/ui-copy.json`:

```json
{
  "globalHome": {
    "workspaces": {
      "<ProjectId>": "Short description shown on the project picker."
    }
  },
  "workspaceLoader": {
    "workspaces": {
      "<ProjectId>": {
        "title": "Opening <Display Label>",
        "description": "Short loading message for this workspace."
      }
    }
  }
}
```

The copy keys must match the project ID exactly. Missing keys make the global homepage or workspace loader render incomplete content.

## 6. Validate before handoff

Run:

```sh
npm run build
npm run lint
git diff --check
```

Also verify:

- the new project appears in the global project picker;
- `/` still opens the app-level homepage;
- `/<ProjectId>-home` opens the project overview;
- at least one category entry opens from the sidebar;
- images resolve from an entry route;
- an entry with multiple quiz blocks renders a sequential structured review;
- existing projects and staged source files remain intact.

If browser access is available, smoke-test the picker, loader, sidebar, search, light/dark themes, and a direct project-entry URL. If browser access is unavailable, report that limitation while still reporting build and lint results.

## Handoff

Summarize the new project ID and label, the overview route, the categories added, the asset handling, and the validation commands and results. Mention any staged files that could not be represented without additional product decisions.
