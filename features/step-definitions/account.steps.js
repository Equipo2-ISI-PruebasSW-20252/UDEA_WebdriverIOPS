import { When, Then } from "@wdio/cucumber-framework";

import AccountPage from '../pageobjects/account.page.js';

Then('I should see the account overview page', async () => {
    const result = await AccountPage.verifyUser("Accounts Overview");
    await expect(result).toBeTruthy();
});

When(/^I navigate to an (\d+) details$/, async (account) => {
    const result = await AccountPage.verifyAccountLink(account);
    await expect(result).toBeTruthy();
    await expect($("//td[normalize-space()='Account Type:']")).toHaveTextContaining("Account Type");
});

Then(/^I should see my account number as (\d+) in the details page$/, async (account) => {
    const result = await AccountPage.verifyDetails(account, "Account Details");
    await expect(result).toBeTruthy();
});