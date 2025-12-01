import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    readonly page: Page;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async getCartItemCount() {
        if (!(await this.cartBadge.isVisible())) {
            return 0;
        }

        const itemCountText = await this.cartBadge.textContent();
        return itemCountText ? parseInt(itemCountText) : 0;
    }

    async openMenu() {
        await this.menuButton.click();
        await this.page.waitForTimeout(500); 
    }

    async logout() {
        await this.openMenu();
        await this.logoutLink.click();
    }
}