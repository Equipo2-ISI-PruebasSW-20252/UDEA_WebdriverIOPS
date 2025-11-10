import { Given } from "@wdio/cucumber-framework";
import { loginWithValidCredentials } from '../utils/auth.helper.js';

Given('I am logged in with valid credentials', async () => {
    await loginWithValidCredentials();
});