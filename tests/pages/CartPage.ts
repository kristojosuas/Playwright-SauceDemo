import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductComponent } from './components/inventory.component';

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    readonly quantityLabelForProduct: Locator;
    readonly priceLabelForProduct: Locator;
    readonly descriptionLabelForProduct: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.quantityLabelForProduct = page.locator('.cart_quantity');
        this.priceLabelForProduct = page.locator('.item_pricebar .inventory_item_price');
        this.descriptionLabelForProduct = page.locator('.cart_item_label');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.emptyCartMessage = page.locator('.cart_list');
    }

    async verifyCartPageLoaded() {
        await expect(this.page).toHaveURL(/.*cart.html/);
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
    }

    async getCartItemCount() {  
        return await this.cartItems.count();
    }

    async getCartItemByName(productName: string) {
        const itemLocator = this.cartItems.filter({ hasText: productName }).first();
        return new ProductComponent(itemLocator);
    }

    async getQuantity() {
        const quantityText = await this.quantityLabelForProduct.textContent();
        return quantityText ? parseInt(quantityText) : 0;
    }

    async getPrice() {
        const priceText = await this.priceLabelForProduct.textContent();
        return priceText ? parseFloat(priceText.replace('$', '')) : 0;
    }

    async getDescriptionLabelForProduct() {
        await expect(this.descriptionLabelForProduct).toBeVisible();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await this.page.waitForURL(/.*inventory.html/);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL(/.*checkout-step-one.html/);
    }

    async removeItemFromCart(productName: string) {
        const item = await this.getCartItemByName(productName);
        if (item) {
            await item.removeFromCart();
        }
    }
    
    async verifyCartIsEmpty() {
        const itemCount = await this.getCartItemCount();
        expect(itemCount).toBe(0);
    }
}