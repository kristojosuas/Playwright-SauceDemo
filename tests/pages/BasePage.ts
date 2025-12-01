import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
        await this.page.waitForLoadState(state);
    }

    async getTitle() {
        return await this.page.title();
    }
}