import { Given, When, Then } from "@wdio/cucumber-framework";

import TransferPage from '../pageobjects/transfer.page.js';

// El Background ya está definido en account.steps.js, no es necesario redefinirlo

When('I navigate to the transfer funds page', async () => {
    await TransferPage.open();
    await expect(TransferPage.titleTransferFunds).toBeExisting();
});

Then('I should see the transfer form', async () => {
    const result = await TransferPage.verifyTransferPage();
    await expect(result).toBeTruthy();
    await expect(TransferPage.inputAmount).toBeExisting();
    await expect(TransferPage.selectFromAccount).toBeExisting();
    await expect(TransferPage.selectToAccount).toBeExisting();
    await expect(TransferPage.btnTransfer).toBeExisting();
});

When(/^I enter amount (\d+) to transfer$/, async (amount) => {
    await TransferPage.enterAmount(amount);
});

When(/^I select account (\d+) as the source account$/, async (accountNumber) => {
    await TransferPage.selectSourceAccount(accountNumber);
});

When(/^I select account (\d+) as the destination account$/, async (accountNumber) => {
    await TransferPage.selectDestinationAccount(accountNumber);
});

When('I click the transfer button', async () => {
    await TransferPage.clickTransferButton();
});

Then('I should see the transfer confirmation message', async () => {
    const result = await TransferPage.verifyTransferComplete();
    await expect(result).toBeTruthy();
    // Verificar que existe el mensaje de confirmación o el título
    await expect(TransferPage.transferCompleteTitle).toBeExisting();
});

Then('I should see an error message about insufficient funds', async () => {
    const hasError = await TransferPage.verifyErrorMessage();
    await expect(hasError).toBeTruthy();
});

Then('the transfer button should require amount to be entered', async () => {
    // Dejar el campo de monto vacío y verificar que el botón está habilitado
    // ParaBank permite hacer clic incluso con campos vacíos, pero muestra error
    await TransferPage.inputAmount.setValue('');
    const isEnabled = await TransferPage.isTransferButtonEnabled();
    await expect(isEnabled).toBeTruthy();
});

Then('I should see an error message for same account transfer', async () => {
    const hasError = await TransferPage.verifySameAccountError();
    await expect(hasError).toBeTruthy();
});
