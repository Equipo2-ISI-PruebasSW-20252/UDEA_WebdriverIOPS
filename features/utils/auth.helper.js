import LoginPage from '../pageobjects/login.page.js';

export async function loginWithValidCredentials() {    
    await LoginPage.open();
    
    await LoginPage.login("john", "demo");
    
    const accountsOverview = $("//h1[normalize-space()='Accounts Overview']");
    await accountsOverview.waitForDisplayed({ timeout: 10000 });
}

