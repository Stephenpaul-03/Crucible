# How a Workspace Works

I treat each project as a workspace made from a project definition, a sidebar, and a content directory.

## Project definition

I give each project an ID, a display label, a set of tags, and the URL of its sidebar JSON file. The ID becomes part of the route, such as `Template-home`.

## Sidebar definition

I use the sidebar JSON to define the overview, categories, and entries I want to show. Each entry path becomes both a page route and a markdown lookup path.

## Content directory

I keep the markdown under `public/content/<project-id>`. My category folders mirror the sidebar titles, which lets Crucible resolve every entry without a database.
