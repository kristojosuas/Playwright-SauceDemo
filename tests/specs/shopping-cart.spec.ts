import { test, expect } from '../fixtures/test-fixtures';
import { TestUsers, TestProduct } from '../data/test-data';
import { TestTags } from '../utils/tags';

test.describe('TS-03: Shopping Cart Management', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo('/');
        await loginPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);
    });

    test('TC-01: Add single product to cart and verify in cart page', { tag: [TestTags.SMOKE, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();
        
        expect(await inventoryPage.header.getCartItemCount()).toBe(1);

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
        expect(await cartPage.getCartItemCount()).toBe(1);

        const cartItem = await cartPage.getCartItemByName(TestProduct.backpack.name);
        expect(cartItem).not.toBeNull();

        expect(await cartPage.getQuantity()).toBe(1);
        expect(await cartItem.getName()).toBe(TestProduct.backpack.name);
        expect(await cartPage.getPrice()).toBe(TestProduct.backpack.price);
    });

    test('TC-02: Add single product from product details to cart', { tag: [TestTags.POSITIVE, TestTags.HIGH, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const productDetailPage = await inventoryPage.viewProductDetails(TestProduct.backpack.name);
        expect(productDetailPage).not.toBeNull();
        await productDetailPage!.addToCart();

        expect(await inventoryPage.header.getCartItemCount()).toBe(1);
        
        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
        expect(await cartPage.getCartItemCount()).toBe(1);
    });

    test('TC-03: Add multiple items to cart', { tag: [TestTags.POSITIVE, TestTags.HIGH, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const productsToAdd = [TestProduct.backpack.name, TestProduct.bikeLight.name];

        for (const productName of productsToAdd) {
            const product = await inventoryPage.getProductByName(productName);
            expect(product).not.toBeNull();
            await product!.addToCart();
        }
        expect(await inventoryPage.header.getCartItemCount()).toBe(productsToAdd.length);

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
        expect(await cartPage.getCartItemCount()).toBe(productsToAdd.length);
    });

    test('TC-04: Remove item from inventory page', { tag: [TestTags.POSITIVE, TestTags.HIGH, TestTags.CART] }, async ({ inventoryPage }) => {
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();

        expect(await inventoryPage.header.getCartItemCount()).toBe(1);

        await product!.removeFromCart();
        expect(await inventoryPage.header.getCartItemCount()).toBe(0);
    });

    test('TC-05: View cart contents', { tag: [TestTags.SMOKE, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
    });

    test('TC-06: Remove item from cart page', { tag: [TestTags.POSITIVE, TestTags.HIGH, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.removeItemFromCart(TestProduct.backpack.name);
        await cartPage.verifyCartIsEmpty();
    });

    test('TC-07: Continue shopping from cart page', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        const product = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product).not.toBeNull();
        await product!.addToCart();

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();
        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.continueShopping();
        await inventoryPage.verifyProductPageLoaded();
        expect(await inventoryPage.header.getCartItemCount()).toBe(1);
    });

    test('TC-08: Cart badge updates correctly', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.CART] }, async ({ inventoryPage }) => {
        expect(await inventoryPage.header.getCartItemCount()).toBe(0);
        const product1 = await inventoryPage.getProductByName(TestProduct.backpack.name);
        expect(product1).not.toBeNull();
        await product1!.addToCart();
        expect(await inventoryPage.header.getCartItemCount()).toBe(1);

        const product2 = await inventoryPage.getProductByName(TestProduct.bikeLight.name);
        expect(product2).not.toBeNull();
        await product2!.addToCart();
        expect(await inventoryPage.header.getCartItemCount()).toBe(2);

        await product1!.removeFromCart();
        expect(await inventoryPage.header.getCartItemCount()).toBe(1);
        await product2!.removeFromCart();
        expect(await inventoryPage.header.getCartItemCount()).toBe(0);
    });

    test('TC-09: Empty cart validation', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.CART] }, async ({ inventoryPage, cartPage }) => {
        expect(await inventoryPage.header.getCartItemCount()).toBe(0);

        await inventoryPage.header.goToCart();
        await cartPage.verifyCartPageLoaded();

        await cartPage.verifyCartIsEmpty();
        await cartPage.proceedToCheckout();

        // Expect to remain on cart page since cart is empty
        await cartPage.verifyCartPageLoaded();
    });
});