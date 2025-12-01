import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductDetailPage } from './ProductDetailPage';
import { HeaderComponent } from './components/header.component';
import { ProductComponent } from './components/inventory.component';

export class InventoryPage extends BasePage {
    readonly header: HeaderComponent;
    readonly sortDropdown: Locator;
    readonly productContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.sortDropdown = page.locator('.product_sort_container');
        this.productContainer = page.locator('.inventory_item');
    }

    async verifyProductPageLoaded() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.sortDropdown).toBeVisible();
    }

    async getProductByName(productName: string) {
        const productCount = await this.productContainer.count();
        for (let i = 0; i < productCount; i++) {
            const product = new ProductComponent(this.productContainer.nth(i));
            const name = await product.getName();
            if (name === productName) {
                return product;
            }
        }
        return null;
    }

    async getProductNamesList() {
        const names: string[] = [];
        const productCount = await this.productContainer.count();

        for (let i = 0; i < productCount; i++) {
            const product = new ProductComponent(this.productContainer.nth(i));
            const name = await product.getName();
            names.push(name);   
        }
        
        return names;
    }
    
    async viewProductDetails(productName: string) {
        const product = await this.getProductByName(productName);
        if (product) {
            await product.viewDetails();
            return new ProductDetailPage(this.page);
        }
        return null;
    }

    async getProductPriceFromList(productName: string) {
        const product = await this.getProductByName(productName);
        if (product) {
            return await product.getPrice();
        }
        return null;
    }

    async getProductDescriptionFromList(productName: string) {
        const product = await this.getProductByName(productName);
        if (product) {
            const description = await product.productDescription.textContent();
            return description ? description.trim() : '';
        }
        return null;   
    }

    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        const optionValue = {
            'az': 'az',
            'za': 'za',
            'lohi': 'lohi',
            'hilo': 'hilo'
        } [option];

        await this.sortDropdown.selectOption(optionValue);
    }

    async verifySortOrderAZ() {
        const names = await this.getProductNamesList();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    }

    async verifySortOrderZA() {
        const names = await this.getProductNamesList();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    }

    async verifySortOrderLowToHigh() {
        const prices: number[] = [];
        const productCount = await this.productContainer.count();

        for (let i = 0; i < productCount; i++) {
            const product = new ProductComponent(this.productContainer.nth(i));
            const price = await product.getPrice();
            prices.push(price);   
        }
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }

    async verifySortOrderHighToLow() {
        const prices: number[] = [];
        const productCount = await this.productContainer.count();

        for (let i = 0; i < productCount; i++) {
            const product = new ProductComponent(this.productContainer.nth(i));
            const price = await product.getPrice();
            prices.push(price);   
        }

        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    }
}