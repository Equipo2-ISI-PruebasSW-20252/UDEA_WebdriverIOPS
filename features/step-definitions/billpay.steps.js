import { Given, When, Then } from "@wdio/cucumber-framework";

import BillPayPage from '../pageobjects/billpay.page.js';

// El Background ya está definido en account.steps.js, no es necesario redefinirlo

When('I navigate to the bill payment page', async () => {
    await BillPayPage.open();
    await expect(BillPayPage.titleBillPayment).toBeExisting();
});

Then('I should see the bill payment form', async () => {
    const result = await BillPayPage.verifyBillPayPage();
    await expect(result).toBeTruthy();
    await expect(BillPayPage.inputPayeeName).toBeExisting();
    await expect(BillPayPage.inputAddress).toBeExisting();
    await expect(BillPayPage.inputCity).toBeExisting();
    await expect(BillPayPage.inputState).toBeExisting();
    await expect(BillPayPage.inputZipCode).toBeExisting();
    await expect(BillPayPage.inputPhone).toBeExisting();
    await expect(BillPayPage.inputAccount).toBeExisting();
    await expect(BillPayPage.inputVerifyAccount).toBeExisting();
    await expect(BillPayPage.inputAmount).toBeExisting();
    await expect(BillPayPage.selectFromAccount).toBeExisting();
    await expect(BillPayPage.btnSendPayment).toBeExisting();
});

When(/^I enter payee name "([^"]*)"$/, async (payeeName) => {
    await BillPayPage.enterPayeeName(payeeName);
});

When(/^I enter address "([^"]*)"$/, async (address) => {
    await BillPayPage.enterAddress(address);
});

When(/^I enter city "([^"]*)"$/, async (city) => {
    await BillPayPage.enterCity(city);
});

When(/^I enter state "([^"]*)"$/, async (state) => {
    await BillPayPage.enterState(state);
});

When(/^I enter zip code "([^"]*)"$/, async (zipCode) => {
    await BillPayPage.enterZipCode(zipCode);
});

When(/^I enter phone number "([^"]*)"$/, async (phone) => {
    await BillPayPage.enterPhone(phone);
});

When(/^I enter account number "([^"]*)"$/, async (account) => {
    await BillPayPage.enterAccountNumber(account);
});

When(/^I verify account number "([^"]*)"$/, async (account) => {
    await BillPayPage.verifyAccountNumber(account);
});

When(/^I enter payment amount "([^"]*)"$/, async (amount) => {
    await BillPayPage.enterAmount(amount);
});

When(/^I select account "([^"]*)" as the payment source$/, async (accountNumber) => {
    await BillPayPage.selectSourceAccount(accountNumber);
});

When('I click the send payment button', async () => {
    await BillPayPage.clickSendPaymentButton();
});

Then('I should see the bill payment confirmation message', async () => {
    const result = await BillPayPage.verifyPaymentComplete();
    await expect(result).toBeTruthy();
    await expect(BillPayPage.paymentCompleteTitle).toBeExisting();
});

Then(/^I should see the payment details with payee "([^"]*)" and amount "([^"]*)"$/, async (payeeName, amount) => {
    const result = await BillPayPage.verifyPaymentDetails(payeeName, amount);
    await expect(result).toBeTruthy();
});

Then('I should see an error message about insufficient funds for payment', async () => {
    const hasError = await BillPayPage.verifyErrorMessage();
    await expect(hasError).toBeTruthy();
});

Then('the send payment button should require all fields to be filled', async () => {
    const isEnabled = await BillPayPage.isSendPaymentButtonEnabled();
    await expect(isEnabled).toBeTruthy();
});

Then('I should see an error message about account mismatch', async () => {
    const hasError = await BillPayPage.verifyAccountMismatchError();
    await expect(hasError).toBeTruthy();
});
