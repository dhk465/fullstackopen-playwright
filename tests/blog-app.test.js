const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL);
  });

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('#login-form');
    await expect(loginForm).toBeVisible();
  });

  test('User can log in', async ({ page }) => {
    await page.getByRole('textbox').first().fill(process.env.USER_NAME);
    await page.getByRole('textbox').last().fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText(`${process.env.NAME} logged in`)).toBeVisible();
  });
});
