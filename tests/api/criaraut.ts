import { test, expect } from '@playwright/test';

// Fun��o para medir o tempo de resposta
const measureResponseTime = async (promise: Promise<Response>) => {
    const start = Date.now();
    const response = await promise;
    const duration = Date.now() - start;
    return { response, duration };
};

test.describe('Teste da API Reqres - Criar e Atualizar Usu�rio', () => {

    test('Criar um usu�rio', async ({ request }) => {
        // Payload para criar um usu�rio
        const newUser = {
            name: 'Ricardo Niuco',
            job: 'Software Engineer',
        };

        console.log('Criando um novo usu�rio:', newUser);

        // Fazendo a requisi��o POST
        const { response, duration } = await measureResponseTime(
            request.post('https://reqres.in/api/users', {
                data: newUser,
            })
        );

        // Valida��o do status da resposta
        console.log('Status da resposta ao criar usu�rio:', response.status());
        expect(response.status()).toBe(201);

        // Convertendo a resposta em JSON
        const data = await response.json();
        console.log('Dados retornados ap�s cria��o:', data);

        // Validando os dados do usu�rio criado
        expect(data).toHaveProperty('name', newUser.name);
        expect(data).toHaveProperty('job', newUser.job);
        expect(data).toHaveProperty('id'); // Verifica se o ID foi gerado
        expect(data).toHaveProperty('createdAt'); // Verifica se a data de cria��o existe

        // Valida o tempo de resposta
        console.log('Tempo de resposta para criar usu�rio:', duration, 'ms');
        expect(duration).toBeLessThan(2000); // Ajuste o limite conforme necess�rio
    });

    test('Atualizar um usu�rio', async ({ request }) => {
        // Payload para atualizar um usu�rio
        const updatedUser = {
            name: 'Rafa Niuco',
            job: 'CEO',
        };

        console.log('Atualizando o usu�rio com os dados:', updatedUser);

        // Fazendo a requisi��o PUT
        const { response, duration } = await measureResponseTime(
            request.put('https://reqres.in/api/users/2', {
                data: updatedUser,
            })
        );

        // Valida��o do status da resposta
        console.log('Status da resposta ao atualizar usu�rio:', response.status());
        expect(response.status()).toBe(200);

        // Convertendo a resposta em JSON
        const data = await response.json();
        console.log('Dados retornados ap�s atualiza��o:', data);

        // Validando os dados do usu�rio atualizado
        expect(data).toHaveProperty('name', updatedUser.name);
        expect(data).toHaveProperty('job', updatedUser.job);
        expect(data).toHaveProperty('updatedAt'); // Verifica se a data de atualiza��o existe

        // Valida o tempo de resposta
        console.log('Tempo de resposta para atualizar usu�rio:', duration, 'ms');
        expect(duration).toBeLessThan(2000); // Ajuste o limite conforme necess�rio
    });
});
