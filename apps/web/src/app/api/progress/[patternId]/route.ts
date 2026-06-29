import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { upsertProgress, getPatternProgress } from '@/lib/dal/progress'
import type { ProgressStatus } from '@/lib/dal/progress'

interface RouteContext {
  params: Promise<{ patternId: string }>
}

export async function GET(_req: Request, { params }: RouteContext) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { patternId } = await params
  const progress = await getPatternProgress(session.user.id, patternId)

  return NextResponse.json(progress ?? { patternId, status: 'not_started' })
}

export async function POST(req: Request, { params }: RouteContext) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { patternId } = await params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 })
  }

  const VALID_STATUSES: ProgressStatus[] = ['not_started', 'in_progress', 'completed']
  const status = (body as Record<string, unknown>)?.status as ProgressStatus

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `status invalide. Valeurs acceptées : ${VALID_STATUSES.join(', ')}` },
      { status: 400 },
    )
  }

  const progress = await upsertProgress(session.user.id, patternId, status)
  return NextResponse.json(progress)
}
