# Patternal

Plateforme web interactive d'apprentissage des design patterns pour développeurs.

---

## Pourquoi ce projet ?

Les design patterns sont une connaissance fondamentale pour tout développeur, mais leur apprentissage reste souvent trop théorique : lire un livre ou un article ne suffit pas à les intérioriser. **Patternal** propose une approche pratique et progressive : lire, comprendre, puis implémenter soi-même chaque pattern dans un éditeur de code embarqué.

---

## Ce que vous trouverez ici

- **Fiches interactives** pour les 23 patterns du GoF (Gang of Four) + patterns modernes
- **Éditeur de code intégré** pour pratiquer directement dans le navigateur
- **Quiz et exercices** avec validation automatique
- **Suivi de progression** personnalisé avec badges et jalons
- **Comparateur de patterns** pour distinguer les patterns proches (ex : Factory vs Abstract Factory)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Style | Tailwind CSS + shadcn/ui |
| Éditeur de code | Monaco Editor (VS Code dans le browser) |
| Contenu | MDX — chaque pattern est un fichier versionable |
| Base de données | Prisma + SQLite (dev) / PostgreSQL (prod) |
| Authentification | NextAuth.js |
| Tests | Vitest + Playwright |
| Monorepo | Turborepo + pnpm workspaces |

---

## Patterns couverts

### Créationnels
`Singleton` · `Factory Method` · `Abstract Factory` · `Builder` · `Prototype`

### Structurels
`Adapter` · `Bridge` · `Composite` · `Decorator` · `Facade` · `Flyweight` · `Proxy`

### Comportementaux
`Chain of Responsibility` · `Command` · `Iterator` · `Mediator` · `Memento` · `Observer` · `State` · `Strategy` · `Template Method` · `Visitor` · `Interpreter`

### Modernes *(Phase 3)*
`Repository` · `CQRS` · `Event Sourcing` · `Dependency Injection` · `Circuit Breaker`

---

## Architecture du projet

```
patternal/
├── apps/
│   └── web/                    # Application Next.js
│       ├── app/
│       │   ├── (auth)/         # Authentification
│       │   ├── patterns/       # Catalogue des patterns
│       │   ├── learn/          # Mode apprentissage interactif
│       │   └── dashboard/      # Tableau de bord
│       ├── components/         # Composants UI
│       ├── lib/                # Utilitaires et helpers
│       └── content/            # Fichiers MDX des patterns
│           ├── creational/
│           ├── structural/
│           └── behavioral/
├── packages/
│   ├── ui/                     # Design system partagé
│   └── pattern-engine/         # Validation des exercices
├── prisma/
│   └── schema.prisma
├── CLAUDE.md
└── README.md
```

---

## Feuille de route & Issues

### Phase 1 — Fondations MVP

#### EPIC 1 — Infrastructure & Setup
- [ ] 1.1 Init monorepo Turborepo + pnpm workspaces
- [ ] 1.2 Setup Next.js 14 App Router + TypeScript strict
- [ ] 1.3 Intégration Tailwind CSS + shadcn/ui
- [ ] 1.4 Setup Prisma + SQLite (dev)
- [ ] 1.5 Setup CI (GitHub Actions)
- [ ] 1.6 Config Playwright + Vitest

#### EPIC 2 — Authentification & Utilisateur
- [ ] 2.1 Intégration NextAuth.js (providers email + GitHub)
- [ ] 2.2 Pages login / signup / logout
- [ ] 2.3 Modèle User en base (migration Prisma)
- [ ] 2.4 Middleware de protection des routes

#### EPIC 3 — Moteur de contenu MDX
- [ ] 3.1 Setup pipeline MDX dans App Router
- [ ] 3.2 Définir le frontmatter schema d'un pattern
- [ ] 3.3 Composants MDX custom (UMLDiagram, CodeExample, Quiz, Exercise)
- [ ] 3.4 Système de navigation entre patterns
- [ ] 3.5 Page catalogue `/patterns`
- [ ] 3.6 Page fiche `/patterns/[slug]`

#### EPIC 4 — Contenu Phase 1 : Patterns créationnels
- [ ] 4.1 Fiche Singleton
- [ ] 4.2 Fiche Factory Method
- [ ] 4.3 Fiche Abstract Factory
- [ ] 4.4 Fiche Builder
- [ ] 4.5 Fiche Prototype

#### EPIC 5 — Éditeur de code interactif
- [ ] 5.1 Intégration Monaco Editor
- [ ] 5.2 `packages/pattern-engine` — API de validation (sandbox)
- [ ] 5.3 Composant `<Exercise>` avec hints progressifs
- [ ] 5.4 Exercice Singleton (bout-en-bout)
- [ ] 5.5 Exercices Factory, Abstract Factory, Builder, Prototype

#### EPIC 6 — Progression & Dashboard
- [ ] 6.1 Modèle Progress en base (not_started / in_progress / completed)
- [ ] 6.2 API routes de mise à jour de progression
- [ ] 6.3 Page `/dashboard` — vue globale
- [ ] 6.4 Indicateurs de complétion par catégorie

---

### Phase 2 — Contenu complet

#### EPIC 7 — Quiz
- [ ] 7.1 Composant `<Quiz>` (QCM avec scoring et feedback)
- [ ] 7.2 Modèle QuizResult en base
- [ ] 7.3 Quiz pour les 5 patterns créationnels
- [ ] 7.4 Affichage du score sur le dashboard

#### EPIC 8 — Contenu Phase 2 : Patterns restants
- [ ] 8.1 Adapter · 8.2 Bridge · 8.3 Composite · 8.4 Decorator · 8.5 Facade · 8.6 Flyweight · 8.7 Proxy
- [ ] 8.8 Chain of Responsibility · 8.9 Command · 8.10 Iterator · 8.11 Mediator · 8.12 Memento
- [ ] 8.13 Observer · 8.14 State · 8.15 Strategy · 8.16 Template Method · 8.17 Visitor · 8.18 Interpreter

#### EPIC 9 — Système de badges
- [ ] 9.1 Modèle Badge en base
- [ ] 9.2 Logique de déclenchement post-quiz / post-exercice
- [ ] 9.3 UI notification badge obtenu
- [ ] 9.4 Badges : creational_master, structural_master, behavioral_master, gof_complete

#### EPIC 10 — Comparateur de patterns
- [ ] 10.1 Page `/compare?a=...&b=...` (layout côte-à-côte)
- [ ] 10.2 Contenu des comparaisons clés (Factory vs Abstract Factory, Strategy vs State, etc.)
- [ ] 10.3 Liens "voir aussi" dans les fiches

---

### Phase 3 — Expérience avancée

#### EPIC 11 — Patterns modernes
- [ ] 11.1 Repository · 11.2 CQRS · 11.3 Event Sourcing · 11.4 Dependency Injection · 11.5 Circuit Breaker

#### EPIC 12 — Expérience avancée
- [ ] 12.1 Mode challenge (timer)
- [ ] 12.2 Partage de solution (URL partageable)
- [ ] 12.3 PWA / mode hors-ligne

---

## Démarrage rapide

```bash
# Prérequis : Node 20+, pnpm 9+

git clone https://github.com/chainstrument/patternal.git
cd patternal

pnpm install

# Configurer les variables d'environnement
cp apps/web/.env.example apps/web/.env.local
# → Renseigner DATABASE_URL et NEXTAUTH_SECRET

# Initialiser la base de données
pnpm prisma db push

# Lancer en développement
pnpm dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

---

## Contribution

Chaque pattern est un fichier MDX autonome dans `apps/web/content/`. Contribuer un nouveau pattern ou améliorer une fiche existante ne nécessite pas de modifier le code applicatif.

---

## Licence

MIT
