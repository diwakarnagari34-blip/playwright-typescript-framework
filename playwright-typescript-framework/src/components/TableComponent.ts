import { Page, Locator } from '@playwright/test';

/**
 * TableComponent - Reusable component for data tables.
 * Abstracts common table operations used across multiple pages.
 */
export class TableComponent {
  private page: Page;
  private tableLocator: Locator;

  constructor(page: Page, tableSelector: string) {
    this.page = page;
    this.tableLocator = page.locator(tableSelector);
  }

  /** Get total number of rows */
  async getRowCount(): Promise<number> {
    const rows = this.tableLocator.locator('tbody tr');
    return await rows.count();
  }

  /** Get cell text by row and column index (0-based) */
  async getCellText(rowIndex: number, colIndex: number): Promise<string> {
    const cell = this.tableLocator.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`);
    return (await cell.textContent()) || '';
  }

  /** Get all values in a specific column */
  async getColumnValues(colIndex: number): Promise<string[]> {
    const cells = this.tableLocator.locator(`tbody tr td:nth-child(${colIndex + 1})`);
    return await cells.allTextContents();
  }

  /** Click on a specific row */
  async clickRow(rowIndex: number): Promise<void> {
    const row = this.tableLocator.locator(`tbody tr:nth-child(${rowIndex + 1})`);
    await row.click();
  }

  /** Check if table is empty */
  async isEmpty(): Promise<boolean> {
    const count = await this.getRowCount();
    return count === 0;
  }

  /** Search for a row containing specific text */
  async findRowByText(text: string): Promise<Locator> {
    return this.tableLocator.locator(`tbody tr:has-text("${text}")`);
  }

  /** Get header texts */
  async getHeaders(): Promise<string[]> {
    const headers = this.tableLocator.locator('thead th');
    return await headers.allTextContents();
  }
}
