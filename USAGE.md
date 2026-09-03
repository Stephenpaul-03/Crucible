# Crucible Usage

## Adding a hardware project

A **project** is a top-level workspace in Crucible. It is backed by three pieces:

1. Project registration in `src/constants/subjects.ts` (the legacy filename is retained for compatibility).
2. A sidebar definition at `public/content/<ProjectId>_Sidebar.json`.
3. Markdown entries under `public/content/<ProjectId>/`.

### 1. Register the project

Add an entry to `src/constants/subjects.ts`:

```ts
{
  id: "NEW_ID",
  label: "Project Name",
  sidebarUrl: "/content/NEW_ID_Sidebar.json",
  tags: ["ESP32", "Sensors", "In progress"],
}
```

The ID must match the content folder name and should contain only letters and digits. Tags appear on the project card and are included in project search.

### 2. Create the sidebar

Create `public/content/NEW_ID_Sidebar.json` with an overview and categories:

```json
{
  "home": { "label": "Overview", "path": "/" },
  "categories": [
    {
      "title": "Build Log",
      "icon": "wrench",
      "topics": {
        "First power-on": "/build-log/first-power-on"
      }
    }
  ]
}
```

Category titles double as directory names. Topic paths become routes and markdown filenames.

The optional `icon` field configures the accordion-header icon. Supported names include `activity`, `bike`, `book`, `box`, `circle-dot`, `cog`, `compass`, `cpu`, `factory`, `file-text`, `flame`, `folder`, `gauge`, `git-branch`, `history`, `rocket`, `ruler`, `search`, `settings`, `shield`, `shopping-cart`, `sliders`, `sparkles`, `trophy`, `user`, `waves`, `wind`, `wrench`, and `zap`. Unknown or omitted names use the folder icon.

### 3. Add project entries

Create the overview at `public/content/NEW_ID/home.md`. For the example above, create the entry at:

```text
public/content/NEW_ID/Build Log/first-power-on.md
```

Numeric ordering prefixes such as `01-first-power-on.md` and `1-first-power-on.md` are also supported.

Entries are ordinary markdown and can contain images, fenced code, optional frontmatter, and `:::quiz` blocks for structured project checks. Useful project categories include Design, Bill of Materials, Build Log, Firmware, Experiments, Failures, and References.

### 4. Add picker copy

Add matching keys for the new project under `globalHome.workspaces` and `workspaceLoader.workspaces` in `src/constants/ui-copy.json`.

### 5. Validate

```sh
npm run build
npm run lint
git diff --check
```

Confirm the project appears on the home screen, its overview opens, its sidebar entries resolve, and referenced images load from a direct entry URL.
