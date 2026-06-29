import type { Exercise } from '@patternal/pattern-engine'

export const abstractFactoryExercise: Exercise = {
  id: 'abstract-factory-ex1',
  patternId: 'abstract-factory',
  title: 'Implémenter une Abstract Factory — Thèmes UI',
  description:
    'Créez une fabrique abstraite UIFactory produisant des composants cohérents. ' +
    'Implémentez deux familles : LightTheme et DarkTheme, chacune créant Button et Badge.',
  starterCode: `// Produits abstraits
interface Button {
  render(): string
}

interface Badge {
  render(text: string): string
}

// TODO : déclarez l'interface UIFactory avec createButton() et createBadge()
interface UIFactory {
  // ...
}

// TODO : implémentez LightThemeFactory
class LightThemeFactory implements UIFactory {
  // ...
}

// TODO : implémentez DarkThemeFactory
class DarkThemeFactory implements UIFactory {
  // ...
}

// Client — ne connaît que UIFactory
class Page {
  private button: Button
  private badge: Badge

  constructor(factory: UIFactory) {
    this.button = factory.createButton()
    this.badge = factory.createBadge()
  }

  render(badgeText: string): string {
    return \`\${this.button.render()} \${this.badge.render(badgeText)}\`
  }
}`,
  hints: [
    'UIFactory déclare deux méthodes : createButton(): Button et createBadge(): Badge.',
    'LightThemeFactory retourne des composants avec un style clair (ex: "light-btn", "light-badge"). DarkThemeFactory fait pareil en sombre.',
    'Chaque factory crée des classes anonymes ou nommées qui implémentent Button et Badge.',
  ],
  assertions: [
    {
      description: 'LightThemeFactory crée un Button et un Badge',
      test: `
        const factory = new LightThemeFactory()
        const button = factory.createButton()
        const badge = factory.createBadge()
        if (typeof button.render !== 'function') throw new Error('Button.render() manquant')
        if (typeof badge.render !== 'function') throw new Error('Badge.render() manquant')
      `,
    },
    {
      description: 'DarkThemeFactory crée un Button et un Badge',
      test: `
        const factory = new DarkThemeFactory()
        const button = factory.createButton()
        const badge = factory.createBadge()
        if (typeof button.render !== 'function') throw new Error('Button.render() manquant')
        if (typeof badge.render !== 'function') throw new Error('Badge.render() manquant')
      `,
    },
    {
      description: 'Page fonctionne avec LightThemeFactory',
      test: `
        const page = new Page(new LightThemeFactory())
        const html = page.render('Nouveau')
        if (typeof html !== 'string' || html.length === 0) throw new Error('render() doit retourner une string non vide')
      `,
    },
    {
      description: 'Les rendus Light et Dark sont différents',
      test: `
        const lightPage = new Page(new LightThemeFactory())
        const darkPage = new Page(new DarkThemeFactory())
        const light = lightPage.render('test')
        const dark = darkPage.render('test')
        if (light === dark) throw new Error('Les deux thèmes doivent produire des rendus différents')
      `,
    },
  ],
}
