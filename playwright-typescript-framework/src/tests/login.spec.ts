import { test, expect } from '../fixtures/custom.fixtures';
import { users } from '../config/env.config';

test.describe('Login Page Tests', () => {
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.admin.username, users.admin.password);
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('should show error with empty username', async ({ loginPage }) => {
    await loginPage.login('', users.admin.password);
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('should show error with empty password', async ({ loginPage }) => {
    await loginPage.login(users.admin.username, '');
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    expect(page.url()).toContain('/forgot-password');
  });
});
