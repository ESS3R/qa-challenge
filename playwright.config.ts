import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'API Tests',
            testMatch: [
                'tests/api/criaraut.ts',
                'tests/api/listarval.ts',
                'tests/api/manipfail.ts',
            ],
            use: {
                headless: true,  // Modo headless para os testes de API
                trace: 'on-first-retry',  // Rastreio na primeira tentativa de reexecução
            }
        },
        {
            name: 'UI Tests',
            testMatch: [
                'tests/ui/testlogin_ca.ts',
                'tests/ui/testlogin.ts',
                'tests/ui/errocheckout.ts',
                'tests/ui/add_remove.ts',
            ],
            use: {
                headless: false,  // UI com interface gráfica
                trace: 'on-first-retry',  // Rastreio na primeira tentativa de reexecução
            }
        }
    ],
    workers: process.env.CI ? 1 : undefined,  // Para execução em ambientes CI
    retries: process.env.CI ? 2 : 0,  // Tenta novamente em caso de falha
    // Adicionando o repórter HTML para todos os testes
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }]
    ],
});
