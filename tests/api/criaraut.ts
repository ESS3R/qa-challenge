import { test, expect } from '@playwright/test';

// Função para medir o tempo de resposta
const measureResponseTime = async (promise: Promise<Response>) => {
    const start = Date.now();
    const response = await promise;
    const duration = Date.now() - start;
    return { response, duration };
};

test.describe('Teste da API Reqres - Criar e Atualizar Usuário', () => {

    test('Criar um usuário', async ({ request }) => {
        // Payload para criar um usuário
        const newUser = {
            name: 'Ricardo Niuco',
            job: 'Software Engineer',
        };

        console.log('Criando um novo usuário:', newUser);

        // Fazendo a requisição POST
        const { response, duration } = await measureResponseTime(
            request.post('https://reqres.in/api/users', {
                data: newUser,
            })
        );

        // Validação do status da resposta
        console.log('Status da resposta ao criar usuário:', response.status());
        expect(response.status()).toBe(201);

        // Convertendo a resposta em JSON
        const data = await response.json();
        console.log('Dados retornados após criação:', data);

        // Validando os dados do usuário criado
        expect(data).toHaveProperty('name', newUser.name);
        expect(data).toHaveProperty('job', newUser.job);
        expect(data).toHaveProperty('id'); // Verifica se o ID foi gerado
        expect(data).toHaveProperty('createdAt'); // Verifica se a data de criação existe

        // Valida o tempo de resposta
        console.log('Tempo de resposta para criar usuário:', duration, 'ms');
        expect(duration).toBeLessThan(2000); // Ajuste o limite conforme necessário
    });

    test('Atualizar um usuário', async ({ request }) => {
        // Payload para atualizar um usuário
        const updatedUser = {
            name: 'Rafa Niuco',
            job: 'CEO',
        };

        console.log('Atualizando o usuário com os dados:', updatedUser);

        // Fazendo a requisição PUT
        const { response, duration } = await measureResponseTime(
            request.put('https://reqres.in/api/users/2', {
                data: updatedUser,
            })
        );

        // Validação do status da resposta
        console.log('Status da resposta ao atualizar usuário:', response.status());
        expect(response.status()).toBe(200);

        // Convertendo a resposta em JSON
        const data = await response.json();
        console.log('Dados retornados após atualização:', data);

        // Validando os dados do usuário atualizado
        expect(data).toHaveProperty('name', updatedUser.name);
        expect(data).toHaveProperty('job', updatedUser.job);
        expect(data).toHaveProperty('updatedAt'); // Verifica se a data de atualização existe

        // Valida o tempo de resposta
        console.log('Tempo de resposta para atualizar usuário:', duration, 'ms');
        expect(duration).toBeLessThan(2000); // Ajuste o limite conforme necessário
    });
});
