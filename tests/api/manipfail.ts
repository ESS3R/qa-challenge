import { test, expect } from '@playwright/test';

// Função para medir o tempo de resposta com controle de erro
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

test.describe('Teste da API Reqres - Manipulação de Falhas', () => {

    test('Deletar um usuário que não existe', async ({ request }) => {
        console.log('Tentando deletar um usuário que não existe...');

        // Fazendo a requisição DELETE
        const { response, duration } = await measureResponseTime(
            request.delete('https://reqres.in/api/users/999')
        );

        // Validação do status da resposta
        console.log('Status da resposta ao deletar usuário:', response.status());
        expect(response.status()).toBe(404); // Esperamos um erro 404
        console.log('Usuário não encontrado. Tempo de resposta:', duration, 'ms');
    });

    test('Simular falha de rede ou tempo limite', async ({ request }) => {
        console.log('Tentando simular uma falha de rede...');

        // Simulando uma falha de rede
        try {
            // Uma requisição inválida (usando um URL que não existe)
            await measureResponseTime(
                request.get('https://reqres.in/api/nonexistent')
            );
        } catch (error) {
            console.log('Falha esperada na requisição:', error);
            expect(error.message).toContain('Request failed'); // Verifica se a mensagem de erro contém 'Request failed'
        }

        // Outra forma de simular tempo limite: Você pode configurar um timeout na requisição
        try {
            const { response } = await Promise.race([
                request.get('https://reqres.in/api/users?page=2', { timeout: 1 }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
            ]);
        } catch (error) {
            console.log('Timeout esperado:', error);
            expect(error.message).toContain('Timeout'); // Verifica se a mensagem de erro contém 'Timeout'
        }
    });
});
