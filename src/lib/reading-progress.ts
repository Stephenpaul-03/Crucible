export type ReadingProgress = {
  subjectId: string
  subjectLabel: string
  path: string
  slug: string
  lessonLabel: string
}

export function readReadingProgress(storageKey: string): ReadingProgress | null {
  try {
    const value = window.localStorage.getItem(storageKey)
    if (!value) return null
    const parsed = JSON.parse(value) as Partial<ReadingProgress>
    if (
      typeof parsed.subjectId !== "string"
      || typeof parsed.subjectLabel !== "string"
      || typeof parsed.path !== "string"
      || typeof parsed.slug !== "string"
      || typeof parsed.lessonLabel !== "string"
    ) return null
    return parsed as ReadingProgress
  } catch {
    return null
  }
}

export function saveReadingProgress(storageKey: string, progress: ReadingProgress) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress))
}

