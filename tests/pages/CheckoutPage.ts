import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    // Step One Locators
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    // Step Two Locators
    readonly finishButton: Locator;
    readonly itemTotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;

    // Step Three Locators
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);

        // Step One Locators
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('.error-message-container');

        // Step Two Locators
        this.finishButton = page.locator('[data-test="finish"]');
        this.itemTotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');

        // Step Three Locators
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async verifyCheckoutStepOneLoaded() {
        await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }

    async verifyCheckoutStepTwoLoaded() {
        await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
        await expect(this.itemTotalLabel).toBeVisible();
        await expect(this.taxLabel).toBeVisible();
        await expect(this.totalLabel).toBeVisible();
        await expect(this.finishButton).toBeVisible();
    }

    async verifyCheckoutCompleteLoaded() {
        await expect(this.page).toHaveURL(/.*checkout-complete.html/);
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
        await expect(this.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
