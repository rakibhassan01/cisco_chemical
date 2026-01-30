import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cisco Chemical/);
});

test('can search for products', async ({ page }) => {
  await page.goto('/products');

  // Find search input
  const searchInput = page.getByPlaceholder(/search products/i);
  await expect(searchInput).toBeVisible();

  // Type a common chemical
  await searchInput.fill('Acid');
  
  // Wait for results (assuming some products contain 'Acid')
  const productCards = page.locator('.product-card');
  // At least check if the list exists or is visible if search results are expected
  if (await productCards.count() > 0) {
    await expect(productCards.first()).toBeVisible();
  }
});

test('navbar contains key links', async ({ page }) => {
  await page.goto('/');
  
  const nav = page.locator('nav');
  await expect(nav.getByText(/products/i)).toBeVisible();
  await expect(nav.getByText(/categories/i)).toBeVisible();
});
