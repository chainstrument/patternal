import type { Exercise, ValidationResult, AssertionResult } from './types'

export function validateExercise(exercise: Exercise, userCode: string): ValidationResult {
  const results: AssertionResult[] = []

  for (const assertion of exercise.assertions) {
    try {
      // Exécute le code utilisateur + le test dans un contexte isolé
      // new Function crée une portée locale : les variables du code utilisateur
      // ne fuient pas dans le module, et le code du module n'est pas accessible.
      const fn = new Function(`
        "use strict";
        ${userCode}
        ${assertion.test}
      `)
      fn()
      results.push({ description: assertion.description, passed: true })
    } catch (err) {
      results.push({
        description: assertion.description,
        passed: false,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const passed = results.filter((r) => r.passed).length

  return {
    success: passed === exercise.assertions.length,
    passed,
    total: exercise.assertions.length,
    results,
  }
}
