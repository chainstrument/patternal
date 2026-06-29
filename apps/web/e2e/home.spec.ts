import { test, expect } from '@playwright/test'

test('page d\'accueil affiche le titre', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Patternal' })).toBeVisible()
})

test('lien vers le catalogue des patterns', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Voir les patterns' }).click()
  await expect(page).toHaveURL('/patterns')
})
