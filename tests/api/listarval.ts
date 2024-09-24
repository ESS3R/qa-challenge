import { test, expect } from '@playwright/test';

// Função para validar formato de email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

test.describe('Teste da API Reqres', () => {
    test('Listar usuários e validar dados', async ({ request }) => {
        console.log('Fazendo a requisição para listar usuários...');

        // Fazendo a requisição GET
        const response = await request.get('https://reqres.in/api/users?page=2');

        // Validação do status da resposta
        console.log('Status da resposta:', response.status());
        expect(response.status()).toBe(200);

        // Convertendo a resposta em JSON
        const data = await response.json();
        console.log('Dados retornados:', data);

        // Validando a estrutura da resposta
        expect(data).toHaveProperty('data'); // Verifica se 'data' existe
        expect(Array.isArray(data.data)).toBe(true); // Verifica se 'data' é um array
        console.log('Número de usuários retornados:', data.data.length);

        // Iterando sobre os usuários e validando os campos
        for (const user of data.data) {
            console.log('Validando usuário:', user);
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('email');

            // Validação do formato do email
            const isEmailValid = isValidEmail(user.email);
            console.log(`Email '${user.email}' é válido:`, isEmailValid);
            expect(isEmailValid).toBe(true);
        }
    });
});
