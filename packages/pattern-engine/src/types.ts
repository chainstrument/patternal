export interface Exercise {
  id: string
  patternId: string
  title: string
  description: string
  starterCode: string
  hints: string[]
  assertions: Assertion[]
}

export interface Assertion {
  description: string
  test: string
}

export interface ValidationResult {
  success: boolean
  passed: number
  total: number
  errors: string[]
}
