import { test, expect } from '../fixtures/custom.fixtures';

test.describe('Dashboard Tests', () => {
  test('should display welcome message after login', async ({ authenticatedPage, dashboardPage }) => {
    const message = await dashboardPage.getWelcomeMessage();
    expect(message).toContain('Welcome');
  });

  test('should display dashboard content', async ({ authenticatedPage, dashboardPage }) => {
    const isVisible = await dashboardPage.isDashboardVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should logout successfully', async ({ authenticatedPage, dashboardPage, page }) => {
    await dashboardPage.logout();
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');
  });
});
