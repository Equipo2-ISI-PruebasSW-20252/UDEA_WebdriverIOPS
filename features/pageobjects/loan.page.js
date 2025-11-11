import Page from './page.js';

class LoanPage extends Page {
    get inputLoanAmount() {
        return $("//input[@id='amount']");
    }

    get inputDownPayment() {
        return $("//input[@id='downPayment']");
    }

    get selectFromAccount() {
        return $("//select[@id='fromAccountId']");
    }

    get btnApplyNow() {
        return $("//input[@value='Apply Now']");
    }

    get titleLoanApplication() {
        return $("//h1[normalize-space()='Apply for a Loan']");
    }

    get loanProcessedTitle() {
        return $("//h1[normalize-space()='Loan Request Processed']");
    }

    get loanApprovalMessage() {
        return $("//p[normalize-space()='Congratulations, your loan has been approved.']");
    }

    get newAccountLabel() {
        return $("//b[normalize-space()='Your new account number:']");
    }

    get newAccountNumber() {
        return $("//a[@id='newAccountId']");
    }

    get errorTitle() {
        return $("//h1[normalize-space()='Error!']");
    }

    get insufficientFundsMessage() {
        return $("//p[contains(text(),'You do not have sufficient funds for the given dow')]");
    }

    async verifyLoanApplicationPage() {
        await this.titleLoanApplication.waitForDisplayed({ timeout: 5000 });
        const text = await this.titleLoanApplication.getText();
        return text === 'Apply for a Loan';
    }

    async enterLoanAmount(amount) {
        await this.inputLoanAmount.setValue(amount);
    }

    async enterDownPayment(downPayment) {
        await this.inputDownPayment.setValue(downPayment);
    }

    async selectSourceAccount(accountNumber) {
        await this.selectFromAccount.selectByVisibleText(accountNumber);
    }

    async clickApplyNowButton() {
        await this.btnApplyNow.click();
    }

    async verifyLoanProcessed() {
        await this.loanProcessedTitle.waitForDisplayed({ timeout: 5000 });
        const titleText = await this.loanProcessedTitle.getText();
        return titleText === 'Loan Request Processed';
    }

    async verifyLoanApproval() {
        await this.loanApprovalMessage.waitForDisplayed({ timeout: 5000 });
        return await this.loanApprovalMessage.isDisplayed();
    }

    async verifyErrorMessage() {
        await this.errorTitle.waitForDisplayed({ timeout: 5000 });
        return await this.errorTitle.isDisplayed();
    }

    async verifyInsufficientFundsMessage() {
        await this.insufficientFundsMessage.waitForDisplayed({ timeout: 5000 });
        return await this.insufficientFundsMessage.isDisplayed();
    }

    async verifyNewAccountNumber() {
        await this.newAccountLabel.waitForDisplayed({ timeout: 5000 });
        await this.newAccountNumber.waitForDisplayed({ timeout: 5000 });
        return await this.newAccountNumber.isDisplayed();
    }

    async getNewAccountNumber() {
        await this.newAccountNumber.waitForDisplayed({ timeout: 5000 });
        return await this.newAccountNumber.getText();
    }

    open() {
        return super.open('requestloan');
    }
}

export default new LoanPage();
