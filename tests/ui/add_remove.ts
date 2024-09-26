import { chromium } from 'playwright';

(async () => {
    // Função para registrar logs 
    function log(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    log('Inicializando o navegador Chromium...');
    const browser = await chromium.launch({
        headless: false // headless: false para ver o navegador em ação
    });
    const page = await browser.newPage();

    // Limpar cookies antes de iniciar
    log('Limpando cookies...');
    await page.context().clearCookies();

    // **Login**
    log('Navegando para a página de login...');
    await page.goto('https://www.saucedemo.com/');

    log('Preenchendo o campo de usuário com "standard_user".');
    await page.fill('#user-name', 'standard_user');  // Campo de usuário usando ID

    log('Preenchendo o campo de senha com "secret_sauce".');
    await page.fill('#password', 'secret_sauce');    // Campo de senha usando ID

    log('Clicando no botão de login e aguardando navegação...');
    await Promise.all([
        page.click('#login-button'),                // Clique no botão de login
        page.waitForNavigation({ waitUntil: 'load' }) // Aguarda a navegação
    ]);

    // **Adicionar Produtos ao Carrinho**
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    log('Adicionando produtos ao carrinho...');
    for (const product of productsToAdd) {
        log(`Clicando no produto: ${product}`);
        await page.click(`text=${product}`);          // Clica no produto para visualizar

        log(`Clicando no botão "Add to cart" para: ${product}`);
        await page.click('.btn_primary');              // Clica no botão "Add to cart"

        log('Retornando à página de produtos...');
        await Promise.all([
            page.goBack(),                             // Retorna à página de produtos
            page.waitForNavigation({ waitUntil: 'load' }) // Aguarda a navegação
        ]);
    }

    // **Navegar até o Carrinho**
    log('Clicando no ícone do carrinho...');
    await page.click('.shopping_cart_link');  // Clica no ícone do carrinho

    log('Aguardando a página do carrinho...');
    await page.goto('https://www.saucedemo.com/cart.html'); // aguarda a página do carrinho

    // **Remover Produtos do Carrinho**
    log('Removendo produtos do carrinho...');
    await page.click('#remove-sauce-labs-backpack');
    log('Produto removido: Sauce Labs Backpack.');

    await page.click('#remove-sauce-labs-bike-light');
    log('Produto removido: Sauce Labs Bike Light.');

    // **Validação dos Produtos Restantes no Carrinho**
    log('Validando os produtos restantes no carrinho...');
    const remainingProducts = await page.locator('.cart_item');  // Seleciona todos os itens do carrinho
    const remainingProductNames = await remainingProducts.locator('.inventory_item_name').allTextContents();  // Captura todos os nomes dos produtos

    // Verifica se o produto restante no carrinho é o correto
    if (remainingProductNames.includes('Sauce Labs Bolt T-Shirt') && remainingProductNames.length === 1) {
        log('Teste passou: O produto restante no carrinho está correto.');
    } else {
        log('Teste falhou: O produto restante no carrinho não está correto ou há mais produtos.');
    }

    // Fechando o navegador
    log('Fechando o navegador...');
    await browser.close();
})();
