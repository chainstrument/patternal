import { describe, it, expect } from 'vitest'
import { validateExercise } from '../validator'
import type { Exercise } from '../types'

const singletonExercise: Exercise = {
  id: 'singleton-ex1',
  patternId: 'singleton',
  title: 'Implémenter un Singleton',
  description: 'Créez une classe Counter qui ne peut avoir qu\'une seule instance.',
  starterCode: '',
  hints: [],
  assertions: [
    {
      description: 'Counter doit avoir une méthode statique getInstance()',
      test: `
        if (typeof Counter === 'undefined') throw new Error('Counter n\\'est pas défini')
        if (typeof Counter.getInstance !== 'function') throw new Error('getInstance() manquant')
      `,
    },
    {
      description: 'getInstance() doit toujours retourner la même instance',
      test: `
        const a = Counter.getInstance()
        const b = Counter.getInstance()
        if (a !== b) throw new Error('Les instances ne sont pas identiques')
      `,
    },
    {
      description: 'Appeler new Counter() après getInstance() doit lever une erreur',
      test: `
        Counter.getInstance()
        try {
          new Counter()
          throw new Error('Le constructeur aurait dû lever une erreur')
        } catch(e) {
          if (e.message === 'Le constructeur aurait dû lever une erreur') throw e
        }
      `,
    },
  ],
}

const correctCode = `
class Counter {
  static #instance = null
  #count = 0

  constructor() {
    if (Counter.#instance) throw new Error('Utilisez Counter.getInstance()')
    Counter.#instance = this
  }

  static getInstance() {
    if (!Counter.#instance) new Counter()
    return Counter.#instance
  }

  increment() { this.#count++ }
  getCount() { return this.#count }
}
`

const incorrectCode = `
class Counter {
  static getInstance() {
    return new Counter()  // crée une nouvelle instance à chaque fois
  }
}
`

describe('validateExercise', () => {
  it('retourne success=true quand toutes les assertions passent', () => {
    const result = validateExercise(singletonExercise, correctCode)
    expect(result.success).toBe(true)
    expect(result.passed).toBe(result.total)
  })

  it('retourne success=false quand une assertion échoue', () => {
    const result = validateExercise(singletonExercise, incorrectCode)
    expect(result.success).toBe(false)
    expect(result.passed).toBeLessThan(result.total)
  })

  it('renseigne le message d\'erreur pour les assertions échouées', () => {
    const result = validateExercise(singletonExercise, incorrectCode)
    const failed = result.results.filter((r) => !r.passed)
    expect(failed.length).toBeGreaterThan(0)
    expect(failed[0]?.error).toBeDefined()
  })

  it('gère le code syntaxiquement invalide sans crasher', () => {
    const result = validateExercise(singletonExercise, 'const x = {{{')
    expect(result.success).toBe(false)
    expect(result.results[0]?.error).toBeDefined()
  })
})
