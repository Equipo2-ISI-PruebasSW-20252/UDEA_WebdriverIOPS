import Page from './page.js';

class TransferPage extends Page {
    get inputAmount() {
        return $("//input[@id='amount']");
    }

    get selectFromAccount() {
        return $("//select[@id='fromAccountId']");
    }

    get selectToAccount() {
        return $("//select[@id='toAccountId']");
    }

    get btnTransfer() {
        return $("//input[@value='Transfer']");
    }

    get titleTransferFunds() {
        return $("//h1[normalize-space()='Transfer Funds']");
    }

    get transferCompleteTitle() {
        return $("//h1[normalize-space()='Transfer Complete!']");
    }

    get errorMessage() {
        return $('.error');
    }

    get transferConfirmation() {
        return $("//p[contains(text(),'has been transferred')]");
    }

    async verifyTransferPage() {
        await this.titleTransferFunds.waitForDisplayed({ timeout: 5000 });
        const text = await this.titleTransferFunds.getText();
        return text === 'Transfer Funds';
    }

    async performTransfer(amount, fromAccount, toAccount) {
        await this.inputAmount.setValue(amount);
        await this.selectFromAccount.selectByVisibleText(fromAccount);
        await this.selectToAccount.selectByVisibleText(toAccount);
        await this.btnTransfer.click();
    }

    async enterAmount(amount) {
        await this.inputAmount.setValue(amount);
    }

    async selectSourceAccount(accountNumber) {
        await this.selectFromAccount.selectByVisibleText(accountNumber);
    }

    async selectDestinationAccount(accountNumber) {
        await this.selectToAccount.selectByVisibleText(accountNumber);
    }

    async clickTransferButton() {
        await this.btnTransfer.click();
    }

    async verifyTransferComplete() {
        await this.transferCompleteTitle.waitForDisplayed({ timeout: 5000 });
        const titleText = await this.transferCompleteTitle.getText();
        return titleText === 'Transfer Complete!';
    }

    async verifyErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.isDisplayed();
    }

    async verifySameAccountError() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.isDisplayed();
    }

    async isTransferButtonEnabled() {
        return await this.btnTransfer.isEnabled();
    }

    /**
     * Open transfer page
     */
    open() {
        return super.open('transfer');
    }
}

export default new TransferPage();
