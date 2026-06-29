import { db } from '@/lib/db'

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

export interface PatternProgress {
  patternId: string
  status: ProgressStatus
  updatedAt: Date
}

export async function getUserProgress(userId: string): Promise<PatternProgress[]> {
  const rows = await db.progress.findMany({
    where: { userId },
    select: { patternId: true, status: true, updatedAt: true },
  })
  return rows as PatternProgress[]
}

export async function getPatternProgress(
  userId: string,
  patternId: string,
): Promise<PatternProgress | null> {
  const row = await db.progress.findUnique({
    where: { userId_patternId: { userId, patternId } },
    select: { patternId: true, status: true, updatedAt: true },
  })
  return row as PatternProgress | null
}

export async function upsertProgress(
  userId: string,
  patternId: string,
  status: ProgressStatus,
): Promise<PatternProgress> {
  const row = await db.progress.upsert({
    where: { userId_patternId: { userId, patternId } },
    create: { userId, patternId, status },
    update: { status },
    select: { patternId: true, status: true, updatedAt: true },
  })
  return row as PatternProgress
}
