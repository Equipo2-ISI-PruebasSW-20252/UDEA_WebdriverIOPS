import Page from './page.js';

class AccountPage extends Page {
    get titleAccountOverview() {
        return $("//h1[normalize-space()='Accounts Overview']");
    }

    get titleAccountDetails() {
        return $("//h1[normalize-space()='Account Details']");
    }

    async verifyUser(title) {
        const text = await this.titleAccountOverview.getText();
        return text === title;
    }

    async verifyAccountLink(account) {
        const link = await $(`//a[normalize-space()='${account}']`);

        const linkText = await link.getText();
        await link.click();
        return linkText === account.toString();
    }

    async verifyDetails(account, title) {
        const accountNumber = await $("//*[@id='accountId'] | //td[normalize-space()='Account Number:']/following-sibling::td");
        await browser.waitUntil(
            async () => {
                const text = await accountNumber.getText();
                return text && text.trim().length > 0;
            },
            {
                timeout: 10000
            });
            
        const accountText = await accountNumber.getText();
        const detailsText = await this.titleAccountDetails.getText();
        return accountText === account.toString() && detailsText === title;
    }
}

export default new AccountPage();