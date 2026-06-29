import type { Exercise } from '@patternal/pattern-engine'

export const builderExercise: Exercise = {
  id: 'builder-ex1',
  patternId: 'builder',
  title: 'Implémenter un Builder — Constructeur de profil utilisateur',
  description:
    'Créez un UserProfileBuilder avec une API fluente permettant de construire ' +
    'un profil utilisateur étape par étape. La méthode build() doit valider les champs obligatoires.',
  starterCode: `interface UserProfile {
  name: string
  email: string
  age?: number
  bio?: string
  role: 'user' | 'admin' | 'moderator'
  tags: string[]
}

class UserProfileBuilder {
  // TODO : ajoutez les propriétés privées

  // TODO : implémentez les méthodes fluentes
  setName(name: string): this {
    // ...
  }

  setEmail(email: string): this {
    // ...
  }

  setAge(age: number): this {
    // ...
  }

  setBio(bio: string): this {
    // ...
  }

  setRole(role: UserProfile['role']): this {
    // ...
  }

  addTag(tag: string): this {
    // ...
  }

  build(): UserProfile {
    // TODO : validez name et email, puis retournez le profil
  }
}`,
  hints: [
    'Stockez les données dans un objet privé partial : `private profile: Partial<UserProfile> = { role: "user", tags: [] }`.',
    'Chaque méthode fluente modifie `this.profile` et retourne `this` pour permettre le chaînage.',
    'Dans build(), vérifiez que name et email sont présents (sinon throw new Error), puis retournez une copie du profil.',
  ],
  assertions: [
    {
      description: 'Le chaînage de méthodes fonctionne',
      test: `
        const builder = new UserProfileBuilder()
        const result = builder.setName('Alice').setEmail('alice@example.com')
        if (!(result instanceof UserProfileBuilder)) throw new Error('Les méthodes doivent retourner this pour le chaînage')
      `,
    },
    {
      description: 'build() retourne un profil valide avec les champs fournis',
      test: `
        const profile = new UserProfileBuilder()
          .setName('Bob')
          .setEmail('bob@example.com')
          .setAge(30)
          .setRole('admin')
          .addTag('typescript')
          .addTag('node')
          .build()
        if (profile.name !== 'Bob') throw new Error('name incorrect')
        if (profile.email !== 'bob@example.com') throw new Error('email incorrect')
        if (profile.age !== 30) throw new Error('age incorrect')
        if (profile.role !== 'admin') throw new Error('role incorrect')
        if (!profile.tags.includes('typescript')) throw new Error('tag manquant')
      `,
    },
    {
      description: 'build() lève une erreur si name est absent',
      test: `
        try {
          new UserProfileBuilder().setEmail('test@test.com').build()
          throw new Error('build() aurait dû lever une erreur sans name')
        } catch(e) {
          if (e.message === 'build() aurait dû lever une erreur sans name') throw e
        }
      `,
    },
    {
      description: 'build() lève une erreur si email est absent',
      test: `
        try {
          new UserProfileBuilder().setName('Alice').build()
          throw new Error('build() aurait dû lever une erreur sans email')
        } catch(e) {
          if (e.message === 'build() aurait dû lever une erreur sans email') throw e
        }
      `,
    },
    {
      description: 'addTag() accumule les tags (pas de remplacement)',
      test: `
        const profile = new UserProfileBuilder()
          .setName('Eve').setEmail('eve@example.com')
          .addTag('a').addTag('b').addTag('c')
          .build()
        if (profile.tags.length !== 3) throw new Error(\`Attendu 3 tags, reçu \${profile.tags.length}\`)
      `,
    },
  ],
}
