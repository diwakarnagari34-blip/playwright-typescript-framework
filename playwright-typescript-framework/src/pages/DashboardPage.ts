import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage - Page Object for the Dashboard page.
 * Represents the main page after successful login.
 */
export class DashboardPage extends BasePage {
  // Locators
  private readonly welcomeMessage: Locator;
  private readonly userAvatar: Locator;
  private readonly logoutButton: Locator;
  private readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    this.userAvatar = page.locator('[data-testid="user-avatar"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.navigationMenu = page.locator('[data-testid="nav-menu"]');
  }

  /** Get welcome message text */
  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  /** Check if dashboard is loaded */
  async isDashboardVisible(): Promise<boolean> {
    return await this.isElementVisible(this.welcomeMessage);
  }

  /** Perform logout */
  async logout(): Promise<void> {
    await this.clickElement(this.userAvatar);
    await this.clickElement(this.logoutButton);
  }

  /** Navigate to a section via navigation menu */
  async navigateToSection(sectionName: string): Promise<void> {
    const sectionLink = this.navigationMenu.locator(`text=${sectionName}`);
    await this.clickElement(sectionLink);
  }
}
