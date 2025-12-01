import { Locator } from '@playwright/test';

export class ProductComponent {
    readonly productContainer: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;
    
    constructor(productContainer: Locator) {
        this.productContainer = productContainer;
        this.productName = productContainer.locator('.inventory_item_name');
        this.productDescription = productContainer.locator('.inventory_item_desc');
        this.productPrice = productContainer.locator('.inventory_item_price');
        this.productImage = productContainer.locator('.inventory_item_img img');
        this.addToCartButton = productContainer.locator('button').filter({ hasText: 'Add to cart' }).first();
        this.removeFromCartButton = productContainer.locator('button').filter({ hasText: 'Remove' }).first();
    }

    async getName(): Promise<string> {
        const text = await this.productName.textContent();
        return text?.trim() || '';
    }

    async getPrice() {
        const priceText = await this.productPrice.textContent();
        return priceText ? parseFloat(priceText.replace('$', '')) : 0;
    }

    async isImageVisible() {
        return await this.productImage.isVisible();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeFromCartButton.click();
    }  

    async viewDetails() {
        await this.productName.click();
    }
}