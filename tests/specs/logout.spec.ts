import {test, expect} from '../fixtures/test-fixtures';
import { TestUsers } from '../data/test-data';

test.describe('TS-04: Logout Functionality', () => {
    test('TC-01: Succesful logout', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigateTo('/');
        await loginPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);
        await inventoryPage.verifyProductPageLoaded();

        await inventoryPage.header.logout();
        await loginPage.verifyLoginPageLoaded();
    });
});