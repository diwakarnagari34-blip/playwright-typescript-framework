/**
 * Utility functions for test automation.
 */

/** Generate a unique string for test data */
export function generateUniqueId(prefix: string = 'test'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/** Generate a random email for test accounts */
export function generateTestEmail(): string {
  return `testuser_${Date.now()}@example.com`;
}

/** Format date to YYYY-MM-DD */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Wait for a specific duration (use sparingly — prefer Playwright auto-waiting) */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retry an async operation with exponential backoff */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const waitTime = baseDelay * Math.pow(2, attempt - 1);
        await delay(waitTime);
      }
    }
  }

  throw lastError;
}

/** Parse API response safely */
export function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
