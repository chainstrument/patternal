import type { Exercise } from '@patternal/pattern-engine'

export const singletonExercise: Exercise = {
  id: 'singleton-ex1',
  patternId: 'singleton',
  title: 'Implémenter un Singleton — AppConfig',
  description:
    'Créez une classe AppConfig qui ne peut avoir qu\'une seule instance. ' +
    'Elle doit stocker des paires clé/valeur et exposer les méthodes get() et set().',
  starterCode: `class AppConfig {
  // TODO : ajoutez les propriétés nécessaires

  // TODO : rendez le constructeur privé
  constructor() {
    // initialisation
  }

  // TODO : implémentez getInstance()
  static getInstance(): AppConfig {
    // ...
  }

  get(key: string): string | undefined {
    // TODO
  }

  set(key: string, value: string): void {
    // TODO
  }
}`,
  hints: [
    'Utilisez un champ statique privé pour stocker l\'instance unique : `static #instance: AppConfig | null = null`.',
    'Dans le constructeur, vérifiez si une instance existe déjà. Si oui, lancez une erreur.',
    'Dans getInstance(), créez l\'instance si elle n\'existe pas, puis retournez-la toujours.',
  ],
  assertions: [
    {
      description: 'AppConfig.getInstance() existe et retourne un objet',
      test: `
        if (typeof AppConfig === 'undefined') throw new Error('AppConfig n\\'est pas défini')
        if (typeof AppConfig.getInstance !== 'function') throw new Error('getInstance() est manquant')
        const config = AppConfig.getInstance()
        if (!config || typeof config !== 'object') throw new Error('getInstance() doit retourner un objet')
      `,
    },
    {
      description: 'Deux appels à getInstance() retournent la même instance',
      test: `
        const a = AppConfig.getInstance()
        const b = AppConfig.getInstance()
        if (a !== b) throw new Error('Les deux instances ne sont pas identiques — le Singleton n\\'est pas respecté')
      `,
    },
    {
      description: 'get() et set() fonctionnent correctement',
      test: `
        const config = AppConfig.getInstance()
        config.set('theme', 'dark')
        config.set('lang', 'fr')
        if (config.get('theme') !== 'dark') throw new Error('get(\\'theme\\') doit retourner \\'dark\\'')
        if (config.get('lang') !== 'fr') throw new Error('get(\\'lang\\') doit retourner \\'fr\\'')
        if (config.get('unknown') !== undefined) throw new Error('get() doit retourner undefined pour une clé inconnue')
      `,
    },
    {
      description: 'L\'état est partagé entre toutes les références à l\'instance',
      test: `
        const a = AppConfig.getInstance()
        const b = AppConfig.getInstance()
        a.set('shared', 'yes')
        if (b.get('shared') !== 'yes') throw new Error('Les deux références doivent partager le même état')
      `,
    },
    {
      description: 'new AppConfig() après getInstance() lève une erreur',
      test: `
        AppConfig.getInstance()
        try {
          new AppConfig()
          throw new Error('Le constructeur aurait dû lever une erreur')
        } catch(e) {
          if (e.message === 'Le constructeur aurait dû lever une erreur') throw e
        }
      `,
    },
  ],
}
