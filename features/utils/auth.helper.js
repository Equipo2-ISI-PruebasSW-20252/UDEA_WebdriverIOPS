import LoginPage from '../pageobjects/login.page.js';

export async function loginWithValidCredentials() {    
    await LoginPage.open();
    
    await LoginPage.login("john", "demo");
    
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('overview.htm'),
        {
            timeout: 10000,
        }
    );
    
    const accountsOverview = $("//h1[normalize-space()='Accounts Overview']");
    await accountsOverview.waitForDisplayed({ timeout: 10000 });
    
    console.log('Login completed successfully');
}

