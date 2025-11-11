import { Given, When, Then } from "@wdio/cucumber-framework";

import LoanPage from '../pageobjects/loan.page.js';

// El Background ya está definido en account.steps.js, no es necesario redefinirlo

When('I navigate to the loan application page', async () => {
    await LoanPage.open();
    await expect(LoanPage.titleLoanApplication).toBeExisting();
});

Then('I should see the loan application form', async () => {
    const result = await LoanPage.verifyLoanApplicationPage();
    await expect(result).toBeTruthy();
    await expect(LoanPage.inputLoanAmount).toBeExisting();
    await expect(LoanPage.inputDownPayment).toBeExisting();
    await expect(LoanPage.selectFromAccount).toBeExisting();
    await expect(LoanPage.btnApplyNow).toBeExisting();
});

When(/^I enter loan amount "([^"]*)"$/, async (loanAmount) => {
    await LoanPage.enterLoanAmount(loanAmount);
});

When(/^I enter down payment "([^"]*)"$/, async (downPayment) => {
    await LoanPage.enterDownPayment(downPayment);
});

When(/^I select account "([^"]*)" as the loan source$/, async (accountNumber) => {
    await LoanPage.selectSourceAccount(accountNumber);
});

When('I click the apply now button', async () => {
    await LoanPage.clickApplyNowButton();
});

Then('I should see the loan request processed message', async () => {
    const result = await LoanPage.verifyLoanProcessed();
    await expect(result).toBeTruthy();
});

Then('I should see the loan approval confirmation', async () => {
    const result = await LoanPage.verifyLoanApproval();
    await expect(result).toBeTruthy();
});

Then('I should see an error message', async () => {
    const hasError = await LoanPage.verifyErrorMessage();
    await expect(hasError).toBeTruthy();
});

Then('I should see an error message about insufficient funds for down payment', async () => {
    const hasError = await LoanPage.verifyInsufficientFundsMessage();
    await expect(hasError).toBeTruthy();
});

Then('I should see my new account number', async () => {
    const hasNewAccount = await LoanPage.verifyNewAccountNumber();
    await expect(hasNewAccount).toBeTruthy();
    
    // Verificar que el número de cuenta no esté vacío
    const accountNumber = await LoanPage.getNewAccountNumber();
    await expect(accountNumber).toBeTruthy();
    await expect(accountNumber.length).toBeGreaterThan(0);
});
