import Page from './page.js';

class BillPayPage extends Page {
    /**
     * Define selectors using getter methods for the Bill Payment page
     */
    get inputPayeeName() {
        return $("//input[@name='payee.name']");
    }

    get inputAddress() {
        return $("//input[@name='payee.address.street']");
    }

    get inputCity() {
        return $("//input[@name='payee.address.city']");
    }

    get inputState() {
        return $("//input[@name='payee.address.state']");
    }

    get inputZipCode() {
        return $("//input[@name='payee.address.zipCode']");
    }

    get inputPhone() {
        return $("//input[@name='payee.phoneNumber']");
    }

    get inputAccount() {
        return $("//input[@name='payee.accountNumber']");
    }

    get inputVerifyAccount() {
        return $("//input[@name='verifyAccount']");
    }

    get inputAmount() {
        return $("//input[@name='amount']");
    }

    get selectFromAccount() {
        return $("//select[@name='fromAccountId']");
    }

    get btnSendPayment() {
        return $("//input[@value='Send Payment']");
    }

    get titleBillPayment() {
        return $("//h1[normalize-space()='Bill Payment Service']");
    }

    get paymentCompleteTitle() {
        return $("//h1[normalize-space()='Bill Payment Complete']");
    }

    get errorMessage() {
        return $('.error');
    }

    get accountMismatchError() {
        return $("//span[@id='validationModel-verifyAccount-mismatch']");
    }

    get paymentConfirmation() {
        return $("//p[contains(text(),'was successful')]");
    }

    get paymentDetailsPayee() {
        return $("//td[contains(text(),'Payee:')]/following-sibling::td");
    }

    get paymentDetailsAmount() {
        return $("//td[contains(text(),'Amount:')]/following-sibling::td");
    }

    async verifyBillPayPage() {
        await this.titleBillPayment.waitForDisplayed({ timeout: 5000 });
        const text = await this.titleBillPayment.getText();
        return text === 'Bill Payment Service';
    }

    async fillPayeeInfo(payeeName, address, city, state, zipCode, phone, account, verifyAccount) {
        await this.inputPayeeName.setValue(payeeName);
        await this.inputAddress.setValue(address);
        await this.inputCity.setValue(city);
        await this.inputState.setValue(state);
        await this.inputZipCode.setValue(zipCode);
        await this.inputPhone.setValue(phone);
        await this.inputAccount.setValue(account);
        await this.inputVerifyAccount.setValue(verifyAccount);
    }

    async enterPayeeName(payeeName) {
        await this.inputPayeeName.setValue(payeeName);
    }

    async enterAddress(address) {
        await this.inputAddress.setValue(address);
    }

    async enterCity(city) {
        await this.inputCity.setValue(city);
    }

    async enterState(state) {
        await this.inputState.setValue(state);
    }

    async enterZipCode(zipCode) {
        await this.inputZipCode.setValue(zipCode);
    }

    async enterPhone(phone) {
        await this.inputPhone.setValue(phone);
    }

    async enterAccountNumber(account) {
        await this.inputAccount.setValue(account);
    }

    async verifyAccountNumber(account) {
        await this.inputVerifyAccount.setValue(account);
    }

    async enterAmount(amount) {
        await this.inputAmount.setValue(amount);
    }

    async selectSourceAccount(accountNumber) {
        await this.selectFromAccount.selectByVisibleText(accountNumber);
    }

    async clickSendPaymentButton() {
        await this.btnSendPayment.click();
    }

    async verifyPaymentComplete() {
        await this.paymentCompleteTitle.waitForDisplayed({ timeout: 5000 });
        const titleText = await this.paymentCompleteTitle.getText();
        return titleText === 'Bill Payment Complete';
    }

    async verifyPaymentDetails(payeeName, amount) {
        await this.paymentDetailsPayee.waitForDisplayed({ timeout: 5000 });
        await this.paymentDetailsAmount.waitForDisplayed({ timeout: 5000 });
        
        const displayedPayee = await this.paymentDetailsPayee.getText();
        const displayedAmount = await this.paymentDetailsAmount.getText();
        
        const cleanAmount = displayedAmount.replace('$', '').trim();
        
        return displayedPayee.includes(payeeName) && cleanAmount === amount;
    }

    async verifyErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.isDisplayed();
    }

    async verifyAccountMismatchError() {
        await this.accountMismatchError.waitForDisplayed({ timeout: 5000 });
        return await this.accountMismatchError.isDisplayed();
    }

    async isSendPaymentButtonEnabled() {
        return await this.btnSendPayment.isEnabled();
    }

    open() {
        return super.open('billpay');
    }
}

export default new BillPayPage();
