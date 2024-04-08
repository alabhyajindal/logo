import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page).toHaveTitle('The Logo Programming Language')
})

test('input has focus', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const focusedElement = page.locator(':focus')
  await expect(focusedElement).toHaveAttribute('type', 'text')
})
