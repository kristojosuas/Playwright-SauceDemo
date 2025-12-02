import { test, expect } from '../fixtures/test-fixtures';
import { TestUsers, TestProduct } from '../data/test-data';
import { TestTags } from '../utils/tags';

test.describe('TS-02: Product Catalog Management', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigateTo('/');
        await loginPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);    
        await inventoryPage.verifyProductPageLoaded();
    });

    test('TC-01: Display product inventory', { tag: [TestTags.SMOKE, TestTags.E2E, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await expect(inventoryPage.page).toHaveURL(/.*inventory.html/);

        await expect(inventoryPage.header.cartIcon).toBeVisible();
        await expect(inventoryPage.header.menuButton).toBeVisible();

        const productCount = await inventoryPage.productContainer.count();
        expect(productCount).toBe(6);
    });

    test('TC-02: Display product details and verify information', { tag: [TestTags.E2E, TestTags.POSITIVE, TestTags.HIGH, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        const listPrice = await inventoryPage.getProductPriceFromList(TestProduct.backpack.name);
        const listDescription = await inventoryPage.getProductDescriptionFromList(TestProduct.backpack.name);   

        const product = await inventoryPage.viewProductDetails(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        if (product) {
            await product.verifyProductDetailPageLoaded();
        }

        const productName = await product!.getProductName();
        const productDescription = await product!.getProductDescription();
        const productPrice = await product!.getProductPrice();
        
        expect(productName).toBe(TestProduct.backpack.name);
        expect(productDescription).toBe(TestProduct.backpack.description);
        expect(productPrice).toBe(TestProduct.backpack.price);

        expect(productPrice).toBe(listPrice);
        expect(productDescription).toBe(listDescription);   
    });

    test('TC-03: Sort products by name (A to Z)', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await inventoryPage.sortProducts('az');
        await inventoryPage.verifySortOrderAZ();
    });

    test('TC-04: Sort products by name (Z to A)', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await inventoryPage.sortProducts('za');
        await inventoryPage.verifySortOrderZA();
    });

    test('TC-05: Sort products by price (Low to High)', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await inventoryPage.sortProducts('lohi');
        await inventoryPage.verifySortOrderLowToHigh();
    });

    test('TC-06: Sort products by price (High to Low)', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await inventoryPage.sortProducts('hilo');
        await inventoryPage.verifySortOrderHighToLow();
    });

    test('TC-07: Back to products from product detail page with applied filter', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        await inventoryPage.sortProducts('lohi');
        await inventoryPage.verifySortOrderLowToHigh();

        const product = await inventoryPage.viewProductDetails(TestProduct.backpack.name)
        expect(product).not.toBeNull();

        if (product) {
            await product.verifyProductDetailPageLoaded();
            await product.goBackToProducts();
            await inventoryPage.verifyProductPageLoaded();
        }

        await inventoryPage.verifySortOrderLowToHigh();
    });

    test('TC-08: Product images are displayed correctly', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.INVENTORY] }, async ({ inventoryPage }) => {
        const productCount = await inventoryPage.productContainer.count();
        
        for (let i = 0; i < productCount; i++) {
            const product = inventoryPage.productContainer.nth(i);
            const productImage = product.locator('.inventory_item_img img');
            await expect(productImage).toBeVisible();
        }
    });
});