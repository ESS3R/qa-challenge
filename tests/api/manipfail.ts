import { test, expect } from '@playwright/test';

// Fun��o para medir o tempo de resposta com controle de erro
const measureResponseTime = async (promise: Promise<Response>) => {
    const start = Date.now();
    try {
        const response = await promise;
        const duration = Date.now() - start;
        return { response, duration };
    } catch (error) {
        const duration = Date.now() - start;
        throw new Error(`Request failed after ${duration}ms: ${error}`);
    }
};

test.describe('Teste da API Reqres - Manipula��o de Falhas', () => {

    test('Deletar um usu�rio que n�o existe', async ({ request }) => {
        console.log('Tentando deletar um usu�rio que n�o existe...');

        // Fazendo a requisi��o DELETE
        const { response, duration } = await measureResponseTime(
            request.delete('https://reqres.in/api/users/999')
        );

        // Valida��o do status da resposta
        console.log('Status da resposta ao deletar usu�rio:', response.status());
        expect(response.status()).toBe(404); // Esperamos um erro 404
        console.log('Usu�rio n�o encontrado. Tempo de resposta:', duration, 'ms');
    });

    test('Simular falha de rede ou tempo limite', async ({ request }) => {
        console.log('Tentando simular uma falha de rede...');

        // Simulando uma falha de rede
        try {
            // Uma requisi��o inv�lida (usando um URL que n�o existe)
            await measureResponseTime(
                request.get('https://reqres.in/api/nonexistent')
            );
        } catch (error) {
            console.log('Falha esperada na requisi��o:', error);
            expect(error.message).toContain('Request failed'); // Verifica se a mensagem de erro cont�m 'Request failed'
        }

        // Outra forma de simular tempo limite: Voc� pode configurar um timeout na requisi��o
        try {
            const { response } = await Promise.race([
                request.get('https://reqres.in/api/users?page=2', { timeout: 1 }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
            ]);
        } catch (error) {
            console.log('Timeout esperado:', error);
            expect(error.message).toContain('Timeout'); // Verifica se a mensagem de erro cont�m 'Timeout'
        }
    });
});
