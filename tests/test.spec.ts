import { test, expect } from '@playwright/test'

test('page has a title', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page).toHaveTitle('The Logo Programming Language')
})

test('text input has focus', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const focusedElement = page.locator(':focus')
  await expect(focusedElement).toHaveAttribute('type', 'text')
})

test('cursor is drawn on the page', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  const cursor = page.locator('#cursor')
  await expect(cursor).toBeAttached()
})

test('cursor rotates 90 degrees on rt 90 command', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('rt 90')
  await page.getByRole('button', { name: 'Go' }).click()

  const cursor = page.locator('#cursor')
  await expect(cursor).toHaveAttribute('transform', 'rotate(90 200 210)')
})

test('cursor rotates 45 degrees on rt 30 and rt 15 commands', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')

  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('rt 30')
  await page.getByRole('button', { name: 'Go' }).click()
  await page.getByRole('textbox').fill('rt 15')
  await page.getByRole('button', { name: 'Go' }).click()

  const cursor = page.locator('#cursor')
  await expect(cursor).toHaveAttribute('transform', 'rotate(45 200 210)')
})

test('cursor rotates -90 degrees on rt -90 command', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('rt -90')
  await page.getByRole('button', { name: 'Go' }).click()

  const cursor = page.locator('#cursor')
  await expect(cursor).toHaveAttribute('transform', 'rotate(-90 200 210)')
})
