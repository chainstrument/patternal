# CLAUDE.md — Patternal

Guide de navigation pour l'assistant IA sur ce projet.

## Projet

**Patternal** est une plateforme web interactive d'apprentissage des design patterns, destinée aux développeurs souhaitant approfondir leurs connaissances des patterns GoF et modernes.

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Style | Tailwind CSS + shadcn/ui |
| Éditeur code | Monaco Editor |
| Contenu | MDX (fichiers versionables par pattern) |
| BDD | Prisma + SQLite (dev) / PostgreSQL (prod) |
| Auth | NextAuth.js |
| Tests | Vitest (unit) + Playwright (E2E) |
| Monorepo | Turborepo |

## Structure du monorepo

```
patternal/
├── apps/
│   └── web/                    # Application Next.js principale
│       ├── app/                # App Router (pages et layouts)
│       │   ├── (auth)/         # Routes login / signup
│       │   ├── patterns/       # Catalogue et fiches patterns
│       │   ├── learn/          # Mode apprentissage interactif
│       │   └── dashboard/      # Tableau de bord de progression
│       ├── components/         # Composants UI réutilisables
│       ├── lib/                # Utilitaires, client Prisma, helpers
│       ├── prisma/             # Schéma Prisma + base SQLite (dev.db)
│       └── content/            # Fichiers MDX (un par pattern)
│           ├── creational/     # Singleton, Factory, Builder, Prototype, Abstract Factory
│           ├── structural/     # Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
│           └── behavioral/     # Chain of Resp., Command, Iterator, Mediator, Memento,
│                               # Observer, State, Strategy, Template Method, Visitor, Interpreter
├── packages/
│   ├── ui/                     # Design system (composants shadcn customisés)
│   └── pattern-engine/         # Logique de validation des exercices de code
├── CLAUDE.md                   # Ce fichier
└── README.md                   # Documentation projet
```

## Patterns couverts (23 GoF + modernes)

### Créationnels (5)
- Singleton, Factory Method, Abstract Factory, Builder, Prototype

### Structurels (7)
- Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy

### Comportementaux (11)
- Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor, Interpreter

### Modernes (à ajouter en phase 2)
- Repository, CQRS, Event Sourcing, Dependency Injection, Circuit Breaker

## Modèle de données principal

```prisma
model User {
  id        String   @id
  email     String   @unique
  progress  Progress[]
  badges    Badge[]
}

model Progress {
  id        String   @id
  userId    String
  patternId String   // ex: "singleton", "observer"
  status    String   // "not_started" | "in_progress" | "completed"
  score     Int?     // score quiz 0-100
  updatedAt DateTime
}

model Badge {
  id        String   @id
  userId    String
  name      String   // ex: "creational_master", "gof_complete"
  earnedAt  DateTime
}
```

## Format d'un fichier MDX de pattern

Chaque pattern est décrit dans `apps/web/content/{category}/{pattern-name}.mdx` :

```mdx
---
id: singleton
title: Singleton
category: creational
difficulty: beginner
tags: [instance, global-state]
realWorld: [Redux store, Logger, Config manager]
---

## Intention
...

## Diagramme UML
<UMLDiagram src="singleton.svg" />

## Implémentation TypeScript
<CodeExample language="typescript" />

## Exercice
<Exercise id="singleton-ex1" hints={3} />

## Quiz
<Quiz questions={quizData} />
```

## Conventions de développement

- **Langue du code** : TypeScript strict (`strict: true`)
- **Langue des commentaires** : français
- **Composants** : Server Components par défaut, `"use client"` seulement si nécessaire
- **Nommage** : PascalCase composants, camelCase fonctions, kebab-case fichiers/routes
- **Commits** : `feat:`, `fix:`, `content:`, `chore:` en préfixe conventionnel
- **Tests** : chaque exercice de pattern a un test Vitest de validation

## Phases de développement

### Phase 1 — Fondations (MVP)
- [ ] Setup monorepo Turborepo + Next.js
- [ ] Design system de base (shadcn/ui)
- [ ] Schéma Prisma + migrations
- [ ] Auth (NextAuth)
- [ ] 5 patterns créationnels avec fiches MDX
- [ ] Éditeur Monaco intégré
- [ ] Dashboard de progression basique

### Phase 2 — Contenu complet
- [ ] 23 patterns GoF complets
- [ ] Quiz interactifs par pattern
- [ ] Système de badges
- [ ] Comparateur de patterns côte-à-côte

### Phase 3 — Expérience avancée
- [ ] Patterns modernes (Repository, CQRS, etc.)
- [ ] Mode "challenge" (temps limité)
- [ ] Partage de solution entre utilisateurs
- [ ] Mode hors-ligne (PWA)

## Commandes utiles

```bash
# Développement
pnpm dev              # Lance tous les apps en watch
pnpm dev --filter web # Lance uniquement l'app web

# Base de données
pnpm prisma db push   # Applique le schéma sans migration
pnpm prisma studio    # Interface visuelle de la BDD

# Tests
pnpm test             # Vitest (unit)
pnpm test:e2e         # Playwright

# Build
pnpm build
pnpm lint
pnpm typecheck
```
