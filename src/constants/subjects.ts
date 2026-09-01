import { sitePath } from "@/lib/site-path"

export interface Subject {
  id: string
  label: string
  sidebarUrl: string
  tags: string[]
}

export const SUBJECTS: Subject[] = [
  {
    id: "Template",
    label: "Crucible Template",
    sidebarUrl: sitePath("/content/Template_Sidebar.json"),
    tags: ["Hardware", "Documentation", "Template"],
  },
];
