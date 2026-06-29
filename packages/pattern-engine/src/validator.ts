import type { Exercise, ValidationResult } from './types'

export async function validateExercise(
  exercise: Exercise,
  userCode: string,
): Promise<ValidationResult> {
  const errors: string[] = []
  let passed = 0

  for (const assertion of exercise.assertions) {
    try {
      const fn = new Function('userCode', `
        ${userCode}
        ${assertion.test}
      `)
      fn(userCode)
      passed++
    } catch (err) {
      errors.push(`${assertion.description}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return {
    success: passed === exercise.assertions.length,
    passed,
    total: exercise.assertions.length,
    errors,
  }
}
