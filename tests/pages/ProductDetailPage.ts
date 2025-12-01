import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
    readonly productImage: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly backButton: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productImage = page.locator('.inventory_details_img_container img');
        this.productName = page.locator('.inventory_details_name.large_size');
        this.productDescription = page.locator('.inventory_details_desc.large_size');
        this.productPrice = page.locator('.inventory_details_price');
        this.backButton = page.locator('#back-to-products');
        this.addToCartButton = page.locator('button[data-test="add-to-cart"]');
        this.removeButton = page.locator('button[data-test="remove"]');
    }

    async verifyProductDetailPageLoaded() {
        await expect(this.page).toHaveURL(/.*inventory-item.html/);
        await expect(this.productImage).toBeVisible();
        await expect(this.productName).toBeVisible();
        await expect(this.backButton).toBeVisible();
    }

    async getProductName() {
        return await this.productName.textContent() || '';
    }

    async getProductDescription() {
        return await this.productDescription.textContent() || '';
    }

    async getProductPrice() {
        const priceText = await this.productPrice.textContent() || ''
        return parseFloat(priceText.replace('$', ''));
    }

    async goBackToProducts() {
        await this.backButton.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
    
    async removeFromCart() {
        await this.removeButton.click();
    }

    async isInCart() {
        return await this.removeButton.isVisible();
    }
}