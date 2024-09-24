import { chromium } from 'playwright';

(async () => {
    // Fun��o para registrar logs 
    function log(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    // Inicializando o navegador Chromium
    log('Inicializando o navegador Chromium...');
    const browser = await chromium.launch({
        headless: false  // headless: false para ver o navegador em a��o
    });
    const page = await browser.newPage();

    // **Cen�rio Adicional: Tentativas de Login com Credenciais Incorretas**
    log('Navegando para https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/');

    log('Preenchendo o campo de usu�rio com "invalid_user" (usu�rio inv�lido).');
    await page.fill('#user-name', 'invalid_user');  // Usu�rio inv�lido

    log('Preenchendo o campo de senha com "wrong_password" (senha inv�lida).');
    await page.fill('#password', 'wrong_password');  // Senha inv�lida

    log('Clicando no bot�o de login.');
    await page.click('#login-button');  // Clique no bot�o de login

    // Valida se a mensagem de erro aparece corretamente
    log('Verificando se a mensagem de erro � exibida.');
    const errorMessage = await page.textContent('.error-message-container');  // Seletor para a mensagem de erro
    if (errorMessage.includes('Username and password do not match')) {  // ERRO DE CREDENCIAL
        log('Teste passou: Mensagem de erro exibida corretamente.');
    } else {
        log('Teste falhou: Mensagem de erro n�o apareceu ou � incorreta.');
    }

    // Fechando o navegador
    log('Fechando o navegador.');
    await browser.close();
})();
