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
    sidebarUrl: "/content/Template_Sidebar.json",
    tags: ["Hardware", "Documentation", "Template"],
  },
];
