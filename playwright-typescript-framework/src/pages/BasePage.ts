import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage - Parent class for all Page Objects.
 * Contains common methods shared across all pages.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a specific path relative to baseURL */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait for page to be fully loaded */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Get page title */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /** Get current URL */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /** Click element with auto-waiting */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Fill input field after clearing */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  /** Get text content from element */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }

  /** Check if element is visible */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /** Select dropdown option by value */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  /** Take screenshot with custom name */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}
