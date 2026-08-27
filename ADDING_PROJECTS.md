# Adding a Project

Crucible treats each hardware build as a project workspace. For the complete registration, content, copy, and validation workflow, see [USAGE.md](USAGE.md).

The minimum project consists of:

```text
src/constants/subjects.ts
public/content/<ProjectId>_Sidebar.json
public/content/<ProjectId>/home.md
public/content/<ProjectId>/<Category Title>/<entry-slug>.md
```

Although `subjects.ts` retains its original internal filename for compatibility, the product and its documentation refer to these workspaces as **projects**.
