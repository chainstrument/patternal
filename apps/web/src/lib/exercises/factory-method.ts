import type { Exercise } from '@patternal/pattern-engine'

export const factoryMethodExercise: Exercise = {
  id: 'factory-method-ex1',
  patternId: 'factory-method',
  title: 'Implémenter un Factory Method — Système de notifications',
  description:
    'Créez un système de notifications avec une classe abstraite Notifier et deux ' +
    'sous-classes concrètes : EmailNotifier et SMSNotifier.',
  starterCode: `// Interface du produit
interface Notification {
  send(recipient: string, message: string): string
}

// Créateur abstrait
abstract class Notifier {
  // TODO : déclarez la factory method createNotification()
  abstract createNotification(): Notification

  // Méthode de template — utilise la factory method
  notify(recipient: string, message: string): string {
    const notification = this.createNotification()
    return notification.send(recipient, message)
  }
}

// TODO : implémentez EmailNotifier
class EmailNotifier extends Notifier {
  createNotification(): Notification {
    // ...
  }
}

// TODO : implémentez SMSNotifier
class SMSNotifier extends Notifier {
  createNotification(): Notification {
    // ...
  }
}`,
  hints: [
    'Chaque NotifierConcret doit retourner une implémentation de Notification qui contient la logique d\'envoi.',
    'Les produits concrets (EmailNotification, SMSNotification) implémentent l\'interface Notification avec leur propre méthode send().',
    'La méthode notify() dans Notifier ne connaît pas les classes concrètes — elle utilise uniquement createNotification().',
  ],
  assertions: [
    {
      description: 'EmailNotifier.notify() retourne une chaîne contenant "email"',
      test: `
        const notifier = new EmailNotifier()
        const result = notifier.notify('user@test.com', 'Bonjour')
        if (typeof result !== 'string') throw new Error('notify() doit retourner une string')
        if (!result.toLowerCase().includes('email')) throw new Error('Le résultat doit mentionner "email"')
      `,
    },
    {
      description: 'SMSNotifier.notify() retourne une chaîne contenant "sms"',
      test: `
        const notifier = new SMSNotifier()
        const result = notifier.notify('+33600000000', 'Bonjour')
        if (typeof result !== 'string') throw new Error('notify() doit retourner une string')
        if (!result.toLowerCase().includes('sms')) throw new Error('Le résultat doit mentionner "sms"')
      `,
    },
    {
      description: 'Les deux notifiers partagent la même méthode notify() (héritage)',
      test: `
        const email = new EmailNotifier()
        const sms = new SMSNotifier()
        if (email.notify === undefined || sms.notify === undefined) throw new Error('notify() manquant')
        if (typeof email.notify !== 'function' || typeof sms.notify !== 'function') {
          throw new Error('notify() doit être une fonction')
        }
      `,
    },
    {
      description: 'Le résultat contient le destinataire',
      test: `
        const notifier = new EmailNotifier()
        const result = notifier.notify('alice@example.com', 'Test')
        if (!result.includes('alice@example.com')) {
          throw new Error('Le résultat doit inclure le destinataire')
        }
      `,
    },
  ],
}
