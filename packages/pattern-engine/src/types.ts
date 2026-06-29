export interface Assertion {
  description: string
  // Code JS exécuté dans le contexte du code utilisateur.
  // Doit lever une erreur si l'assertion échoue.
  test: string
}

export interface Exercise {
  id: string
  patternId: string
  title: string
  description: string
  starterCode: string
  hints: string[]
  assertions: Assertion[]
}

export interface ValidationResult {
  success: boolean
  passed: number
  total: number
  results: AssertionResult[]
}

export interface AssertionResult {
  description: string
  passed: boolean
  error?: string
}
