import type { Exercise } from '@patternal/pattern-engine'

export const prototypeExercise: Exercise = {
  id: 'prototype-ex1',
  patternId: 'prototype',
  title: 'Implémenter un Prototype — Clonage de documents',
  description:
    'Créez une classe Document avec une méthode clone() qui produit une copie profonde indépendante. ' +
    'Modifier le clone ne doit pas affecter l\'original.',
  starterCode: `interface Cloneable<T> {
  clone(): T
}

class Tag {
  constructor(public name: string, public color: string) {}

  // TODO : implémentez clone() sur Tag
  clone(): Tag {
    // ...
  }
}

class Document implements Cloneable<Document> {
  public tags: Tag[] = []

  constructor(
    public title: string,
    public content: string,
    public metadata: Record<string, string> = {},
  ) {}

  addTag(tag: Tag): this {
    this.tags.push(tag)
    return this
  }

  // TODO : implémentez clone() — copie profonde
  clone(): Document {
    // Attention : tags et metadata doivent être copiés, pas partagés
  }
}`,
  hints: [
    'Pour Tag.clone(), retournez simplement `new Tag(this.name, this.color)` — les propriétés sont des primitives.',
    'Pour Document.clone(), copiez le titre et le contenu (primitives), puis clonez chaque tag avec tag.clone() et copiez metadata avec { ...this.metadata }.',
    'Testez que `clone.tags !== original.tags` (tableaux différents) et que modifier un tag du clone n\'affecte pas l\'original.',
  ],
  assertions: [
    {
      description: 'clone() retourne un nouveau Document (pas la même référence)',
      test: `
        const doc = new Document('Mon doc', 'Contenu initial')
        const clone = doc.clone()
        if (doc === clone) throw new Error('clone() doit retourner un nouvel objet')
        if (!(clone instanceof Document)) throw new Error('Le clone doit être une instance de Document')
      `,
    },
    {
      description: 'Le titre et le contenu sont copiés correctement',
      test: `
        const doc = new Document('Rapport Q1', 'Résultats...')
        const clone = doc.clone()
        if (clone.title !== 'Rapport Q1') throw new Error('Le titre doit être copié')
        if (clone.content !== 'Résultats...') throw new Error('Le contenu doit être copié')
      `,
    },
    {
      description: 'Modifier le titre du clone ne modifie pas l\'original',
      test: `
        const doc = new Document('Original', 'Contenu')
        const clone = doc.clone()
        clone.title = 'Modifié'
        if (doc.title !== 'Original') throw new Error('L\\'original ne doit pas être affecté')
      `,
    },
    {
      description: 'Les tags sont copiés profondément (tableaux indépendants)',
      test: `
        const doc = new Document('Doc', 'Contenu')
        doc.addTag(new Tag('important', 'red'))
        const clone = doc.clone()
        if (clone.tags === doc.tags) throw new Error('Le tableau tags doit être une copie, pas la même référence')
        clone.tags.push(new Tag('nouveau', 'blue'))
        if (doc.tags.length !== 1) throw new Error('Ajouter un tag au clone ne doit pas modifier l\\'original')
      `,
    },
    {
      description: 'Les propriétés de tags clonés sont indépendantes',
      test: `
        const doc = new Document('Doc', 'x')
        doc.addTag(new Tag('draft', 'grey'))
        const clone = doc.clone()
        clone.tags[0].name = 'published'
        if (doc.tags[0].name !== 'draft') throw new Error('Modifier un tag du clone ne doit pas toucher l\\'original')
      `,
    },
  ],
}
