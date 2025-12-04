# SauceDemo Playwright TypeScript Framework

A comprehensive test automation framework for the SauceDemo web application using Playwright and TypeScript, built following Page Object Model (POM) with KISS and DRY principles.

## Test Plan and Scenario Documentation

- [Test Plan Documentation](https://docs.google.com/document/d/1hVKvV5rbE9PKwwA_cLB7tVxAZh44NimV/edit?usp=sharing&ouid=114940986815050772395&rtpof=true&sd=true)
- [Test Scenario Documentation](https://docs.google.com/spreadsheets/d/1Np31MMEFzXZ7h1iNPdaPyU_ikXIagx1ijXJCk9FCqw4/edit?usp=sharing)

## 🎯 Features

- TypeScript Support: Fully typed for better IDE support and error catching
- Page Object Model: Organized and maintainable page classes
- DRY Principle: Reusable component and utilities
- KISS Principle: Favor simple, easy-to-understand solutions
- Cross-browser Testing: Chrome, Firefox, and Safari support
- Reporting: HTML report with screenshot and Allure report
- CI/CD Ready: Configured for continuous integration

## 🏗️ Project Structure

```bash
├── tests/
│   ├── data/                    # Test data and constants
│   │   └── test-data.ts
│   ├── fixtures/                # Test setup
│   │   └── test-fixtures.ts
│   ├── pages/                   # POM classes
│   │   ├── BasePage.ts          # Base page class
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── ProductDetailPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── components/          # UI component classes
│   │       ├── header.component.ts
│   │       └── inventory.component.ts
│   ├── specs/                   # Test case
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── shopping-cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── logout.spec.ts
│   └── utils/                   # Utility classes
│       └── tags.ts
├── playwright-report/           # Test report (generated)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/kristojosuas/SauceDemo-Website-Testing.git
cd SauceDemo-Website-Testing
```

2. Install dependencies

```bash
npm install
```

3. Install Playwright

```bash
npx playwright install
```

### 🧪 Running Tests

#### Basic Commands

```bash
# Run all test
npm test

# Run tests in Chrome
npm run test:chrome

# Run tests in Firefox
npm run test:firefox

# Run tests in Safari
npm run test:safari

# Run tests in debug mode
npm run test:debug
```

#### Additional Commands

```bash
# Convenient npm scripts for common test runs
npm run test:smoke # Run smoke tests
npm run test:e2e # run end to end journey tests
npm run test:positive # Run positive test cases
npm run test:negative # Run negative test cases
npm run test:login # Run login tests
npm run test:inventory # Run inventory tests
npm run test:cart # Run cart tests
npm run test:checkout # Run checkout tests

# Utility commands
npm run report # Generate HTML report
```

### 🎭 Test Scenarios Covered

#### Authentication (`@login`)

- ✅ Successful login with valid credentials
- ✅ Login with different user types
- ❌ Locked out user handling
- ❌ Invalid credentials validation
- ❌ Empty field validations

#### Product Inventory (`@inventory`)

- ✅ Product display and information
- ✅ Add/remove products to/from cart
- ✅ Product sorting (Alphabetical, Price)
- ✅ Shopping cart badge update
- ✅ Product navigation

#### Shopping Cart (`@cart`)

- ✅ View cart contents
- ✅ Remove items from cart
- ✅ Continue shopping functionality
- ✅ Proceed to checkout
- ✅ Empty cart handling

#### Checkout Process (`@checkout`)

- ✅ Complete end-to-end checkout
- ✅ Order summary validation
- ✅ Price calculations
- ❌ Form validation errors
- ✅ Checkout cancellation
- ✅ Order completion confirmation

### 🏷️ Test Tags

- `@smoke` - Critical functionality tests
- `@e2e` - End-to-end user journeys
- `@positive` - Happy path scenarios
- `@negative` - Error handing scenarios
- `@login` - Authentication tests
- `@inventory` - Product management tests
- `@cart` - Shopping cart tests
- `@checkout` - Checkout process tests

### 🗝️ Environment Variables

```bash
# URL configuration
BASE_URL=https://www.saucedemo.com

# Run tests in headless mode
HEADLESS=true

# Timeout
TIMEOUT=30000
```

### 📊 Reporting

1. Console Output: Real-time test execution feedback
2. HTML Report: `playwright-reports/index.html`

### 📝 Test Data

Test users available in SauceDemo:

- `standard_user` - Normal user
- `locked_out_user` - Blocked user
- `problem_user` - User with UI issues
- `performance_glitch_user`- Slow user
- `error_user` - User with errors
- `visual_user` - Visual testing user

Password for all users: `secret_sauce`

### 🔄 CI/CD Integration

GitHub Action workflow included for:

- Automated testing on push
  = Test result artifact

### 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [SauceDemo Application](https://www.saucedemo.com/)
