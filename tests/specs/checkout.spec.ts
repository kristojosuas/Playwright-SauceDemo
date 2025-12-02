import { test, expect } from '../fixtures/test-fixtures';
import { TestUsers, TestProduct, CheckoutInfo } from '../data/test-data';
import { TestTags } from '../utils/tags';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('TS-04: Checkout Process', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.navigateTo('/');
        await loginPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);    
        
        // Add a product to the cart for checkout tests
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();
        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
    });

    test('TC-01: Checkout process start', { tag: [TestTags.SMOKE, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();
        await checkoutPage.verifyCheckoutStepOneLoaded();
    });

    test('TC-02: Complete checkout process with valid information', { tag: [TestTags.SMOKE, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            CheckoutInfo.valid.lastName,
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.verifyCheckoutStepTwoLoaded();
    });

    test('TC-03: Checkout with missing first name', { tag: [TestTags.NEGATIVE, TestTags.HIGH, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        // Leave out first name
        await checkoutPage.fillCheckoutInformation(
            '',
            CheckoutInfo.valid.lastName,
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.verifyErrorMessage('Error: First Name is required');
    });

    test('TC-04: Checkout with missing last name', { tag: [TestTags.NEGATIVE, TestTags.HIGH, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        // Leave out last name
        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            '',
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.verifyErrorMessage('Error: Last Name is required');
    });

    test('TC-05: Checkout with missing postal code', { tag: [TestTags.NEGATIVE, TestTags.HIGH, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        // Leave out postal code
        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            CheckoutInfo.valid.lastName,
            ''
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.verifyErrorMessage('Error: Postal Code is required');
    });

    test('TC-06: Checkout with invalid inputs', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        // Input invalid characters
        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.invalid.numbersInName,
            CheckoutInfo.invalid.specialCharsInName,
            CheckoutInfo.invalid.textInPostalCode
        );

        await checkoutPage.continueToOverview();
        // Assuming the application shows a generic error for invalid inputs
        await checkoutPage.verifyErrorMessage('Error: Invalid input. Please check your information and try again.');
    });

    test('TC-07: Complete purchase and verify order completion', { tag: [TestTags.SMOKE, TestTags.E2E, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            CheckoutInfo.valid.lastName,
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.completePurchase();
        await checkoutPage.verifyCheckoutCompleteLoaded();
    });

    test('TC-08: Cancel checkout from step one and return to cart', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage }) => {
        await cartPage.proceedToCheckout();

        await checkoutPage.cancelButton.click();
        await cartPage.verifyCartPageLoaded();
    });

    test('TC-09: Cancel checkout from step two and return to inventory page', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage, inventoryPage }) => {
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            CheckoutInfo.valid.lastName,
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.cancelButton.click();
        await inventoryPage.verifyProductPageLoaded();
    });

    test('TC-09: Verify price calculations on checkout overview', { tag: [TestTags.POSITIVE, TestTags.HIGH, TestTags.CHECKOUT] }, async ({ cartPage, checkoutPage, inventoryPage }) => {
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutInformation(
            CheckoutInfo.valid.firstName,
            CheckoutInfo.valid.lastName,
            CheckoutInfo.valid.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.verifyCheckoutStepTwoLoaded();

        // Verify item total, tax, and total calculations
        const itemTotalText = await checkoutPage.itemTotalLabel.textContent();
        const taxText = await checkoutPage.taxLabel.textContent();
        const totalText = await checkoutPage.totalLabel.textContent();
       
        const itemTotal = parseFloat(itemTotalText!.replace('Item total: $', ''));
        
        // Tax should be 8% of item total
        const tax = parseFloat(taxText!.replace('Tax: $', ''));
        expect(tax).toBeCloseTo(itemTotal * 0.08, 2);

        const total = parseFloat(totalText!.replace('Total: $', ''));
        expect(total).toBeCloseTo(itemTotal + tax, 2);
    });
});