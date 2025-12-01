import { test, expect } from '../fixtures/test-fixtures';
import { TestUsers } from '../data/test-data';
import { TestTags } from '../utils/tags';

test.describe('TS-01: Login Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo('/');
    });

    test('TC-01: Successful login with valid user', { tag: [TestTags.SMOKE, TestTags.POSITIVE, TestTags.CRITICAL, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);
        await loginPage.verifyLoginSuccessful();
    });

    test('TC-02: Login with invalid username', { tag: [TestTags.NEGATIVE, TestTags.HIGH, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login('invalid_user', TestUsers.standardUser.password);
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-03: Login with invalid password', { tag: [TestTags.NEGATIVE, TestTags.HIGH, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login(TestUsers.standardUser.username, 'wrong_password');
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-04: Login with locked out user', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login(TestUsers.lockedOutUser.username, TestUsers.lockedOutUser.password);
        await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC-05: Login with empty username', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login('', TestUsers.standardUser.password);
        await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });

    test('TC-06: Login with empty password', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login(TestUsers.standardUser.username, '');
        await loginPage.verifyErrorMessage('Epic sadface: Password is required');
    });

    test('TC-07: Login with empty username and password', { tag: [TestTags.NEGATIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login('', '');
        await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });

    test('TC-08: Login with problem user', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login(TestUsers.problemUser.username, TestUsers.problemUser.password);
        await loginPage.verifyLoginSuccessful();
    });

    test('TC-09: Login with performance glitch user', { tag: [TestTags.POSITIVE, TestTags.MEDIUM, TestTags.LOGIN] }, async ({ loginPage }) => {
        await loginPage.login(TestUsers.performanceGlitchUser.username, TestUsers.performanceGlitchUser.password);
        await loginPage.verifyLoginSuccessful();
    });
});