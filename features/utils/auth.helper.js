import LoginPage from '../pageobjects/login.page.js';

export async function loginWithValidCredentials() {
    console.log('Starting login process...');
    
    await LoginPage.open();
    
    await LoginPage.login("john", "demo");
    
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('overview.htm'),
        {
            timeout: 10000,
            timeoutMsg: 'No se pudo llegar a la página de overview'
        }
    );
    
    const accountsOverview = $("//h1[normalize-space()='Accounts Overview']");
    await accountsOverview.waitForDisplayed({ timeout: 10000 });
    
    console.log('Login completed successfully');
}

