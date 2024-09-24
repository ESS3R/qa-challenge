import { chromium } from 'playwright';

(async () => {
    // Função para registrar logs 
    function log(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    // Inicializando o navegador Chromium
    log('Inicializando o navegador Chromium...');
    const browser = await chromium.launch({
        headless: false  // headless: false para ver o navegador em ação
    });
    const page = await browser.newPage();

    // **Cenário Adicional: Tentativas de Login com Credenciais Incorretas**
    log('Navegando para https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/');

    log('Preenchendo o campo de usuário com "invalid_user" (usuário inválido).');
    await page.fill('#user-name', 'invalid_user');  // Usuário inválido

    log('Preenchendo o campo de senha com "wrong_password" (senha inválida).');
    await page.fill('#password', 'wrong_password');  // Senha inválida

    log('Clicando no botão de login.');
    await page.click('#login-button');  // Clique no botão de login

    // Valida se a mensagem de erro aparece corretamente
    log('Verificando se a mensagem de erro é exibida.');
    const errorMessage = await page.textContent('.error-message-container');  // Seletor para a mensagem de erro
    if (errorMessage.includes('Username and password do not match')) {  // ERRO DE CREDENCIAL
        log('Teste passou: Mensagem de erro exibida corretamente.');
    } else {
        log('Teste falhou: Mensagem de erro não apareceu ou é incorreta.');
    }

    // Fechando o navegador
    log('Fechando o navegador.');
    await browser.close();
})();
