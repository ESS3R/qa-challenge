import { chromium } from 'playwright';

(async () => {
    // Função para registrar logs 
    function log(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    // Inicializando o navegador Google Chrome
    log('Inicializando o navegador Chrome...');
    const browser = await chromium.launch({
        channel: 'chrome',  // Especifica o Chrome
        headless: false     // headless: false para ver o navegador em ação
    });

    const page = await browser.newPage();

    // Navegando para a página
    log('Navegando para https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/');

    // Preenchendo o formulário de login
    log('Preenchendo o campo "user-name" com "standard_user"');
    await page.fill('input[name="user-name"]', 'standard_user');

    log('Preenchendo o campo "password" com "secret_sauce"');
    await page.fill('input[name="password"]', 'secret_sauce');

    log('Clicando no botão de login');
    await Promise.all([
        page.click('#login-button'),
        page.waitForNavigation({ waitUntil: 'load' }) // Aguarda a navegação após o login
    ]);

    // Validação de sucesso
    log('Verificando se o login foi bem-sucedido...');
    const isLoggedIn = await page.isVisible('.title'); // Verifica se o elemento da página principal está visível

    if (isLoggedIn) {
        log('Teste passou: Login bem-sucedido.');
    } else {
        log('Teste falhou: Login não foi bem-sucedido.');
    }

    // Fechando o navegador
    log('Fechando o navegador...');
    await browser.close();
})();
