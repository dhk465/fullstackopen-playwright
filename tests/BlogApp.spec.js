const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test');
const LoginPage = require('../page-objects/LoginPage'); // Adjust the path as needed

describe('Blog app', () => {
  let loginPage;

  beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  test('Login form is shown', async () => {
    await expect(await loginPage.isLoginFormVisible()).toBe(true);
    await expect(await loginPage.isUsernameInputVisible()).toBe(true);
    await expect(await loginPage.isPasswordInputVisible()).toBe(true);
    await expect(await loginPage.isLoginButtonVisible()).toBe(true);
    await expect(await loginPage.isNotificationVisible()).toBe(false);
  });

  test('User can log in', async () => {
    await loginPage.login(process.env.USER_NAME, process.env.PASSWORD);
    await expect(loginPage.page.getByText(`${process.env.NAME} logged in`)).toBeVisible();
  });

  test('Wrong credentials do not log in', async () => {
    await expect(await loginPage.isNotificationVisible(3000)).toBe(false);
    await loginPage.login('wronguser', 'wrongpassword');
    await expect(await loginPage.isNotificationVisible(3000)).toBe(true);
    await expect(loginPage.page.getByText('wrong username or password')).toBeVisible();
  });
});