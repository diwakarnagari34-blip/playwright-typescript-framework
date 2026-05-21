# 🎭 Playwright TypeScript Framework

A production-grade test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern. Designed for scalability, maintainability, and CI/CD integration.

## 🏗️ Architecture

```
src/
├── pages/              # Page Object classes (one per page)
├── components/         # Reusable UI component abstractions
├── tests/              # Test spec files
├── fixtures/           # Custom Playwright fixtures
├── utils/              # Helper functions and utilities
├── config/             # Environment configs and test data
reports/                # Test execution reports
.github/workflows/      # CI/CD pipeline (GitHub Actions)
```

## ✨ Features

- **Page Object Model** — Clean separation of locators and test logic
- **Component Abstractions** — Reusable components (tables, modals, dropdowns)
- **Custom Fixtures** — Extended Playwright fixtures for authentication, test data
- **Parallel Execution** — Multi-worker parallel test runs
- **Custom HTML Reporter** — Detailed reports with screenshots on failure
- **Retry Logic** — Automatic retry with screenshot capture for investigation
- **API + UI Hybrid Tests** — API calls for setup/teardown, UI for user journeys
- **Data-Driven Testing** — Test data factories, no hardcoded values
- **CI/CD Pipeline** — GitHub Actions workflow with matrix strategy
- **ESLint + Prettier** — Consistent code quality

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
git clone https://github.com/<your-username>/playwright-typescript-framework.git
cd playwright-typescript-framework
npm install
npx playwright install
```

### Run Tests
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test src/tests/login.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run with specific project (browser)
npx playwright test --project=chromium

# Run in debug mode
npx playwright test --debug
```

### View Report
```bash
npx playwright show-report
```

## 🔧 Configuration

Environment configs are in `src/config/`. Update `env.config.ts` with your target URLs:

```typescript
export const config = {
  baseUrl: process.env.BASE_URL || 'https://staging.example.com',
  apiUrl: process.env.API_URL || 'https://api.staging.example.com',
  timeout: 30000,
};
```

## 📊 CI/CD

Tests run automatically on every PR via GitHub Actions. See `.github/workflows/playwright.yml`.

Pipeline: Lint → Unit Tests → E2E Tests (Chrome, Firefox) → Report Upload

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD pipeline |
| ESLint + Prettier | Code quality |
| Custom HTML Reporter | Test reporting |

## 📝 Design Decisions

1. **Why POM?** — Single source of truth for locators. When UI changes, update one file, not 50 tests.
2. **Why Custom Fixtures?** — Encapsulate setup/teardown (auth, test data) so tests stay clean and focused.
3. **Why No Hardcoded Waits?** — Using Playwright's auto-waiting and custom wait utilities instead of `waitForTimeout`.
4. **Why Component Layer?** — Tables, modals, and dropdowns appear across pages. Abstract once, reuse everywhere.

## 📄 License

MIT
