# QA Challenge

## Introdução
Essa é a solução dos testes que eu desenvolvi =D

### Passos para instalação:

1. Clone este repositório:

   ```bash
   git clone <link-do-repositorio>
   cd nome-do-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para rodar os testes de UI e API 

   ```bash
   npx playwright test
   ```

### Estrutura do Projeto

```plaintext
.
├── playwright-report/
│   ├── index.html/
├── tests/
│   ├── api/                  # Testes de API 
│   │   └── criaraut.ts       # **Criar e atualizar um usuário:**
│   │   └── listrval.ts       # **Listar usuários e validar dados:**
│   │   └── manipfail.ts      # **Manipulação de falhas na API:**
│   ├── ui/                         # Testes de UI
│   │   └── add_remove.ts           # **Adicionar e remover produtos ao carrinho:**
│   │   └── errocheckout.ts         # **Simulação de erro na finalização da compra:**
│   │   └── testlogin.ts            # **Login no sistema:**
│   │   └── testlogin_ca.ts         # **Login no sistema:**/**Cenário adicional:**
├── playwright.config.ts          # Configuração do Playwright
├── package.json
├── README.md
├── tsconfig.json                 # Configuração do TypeScript
└── ...
```

## Descrição dos Testes

### Parte 1: Automação de UI com Playwright

Foram feitos todos os scripts para testes de UI com sucesso, o comando npx playwright test retornará no console todos os passos realizados pelo script para a realização dos testese também se foram concluídos com êxito ou não.

### Parte 2: Automação de API com Playwright

Foram feitos todos os scripts para testes de UI com sucesso, o comando npx playwright test retornará em um arquivo HTLM todos as requisiçoes de API requisitadas e retornaram o seu sucesso ou seu respectivo erro.

### Melhorias Técnicas Realizadas

1. **Relatórios de Testes:**
   A primeira melhoria realizada foi a inclusão do relatório HTML localizado em 'Projeto clo\playwright-report\index.html' ou digitando o comando npx playwright show-report.

2. **Execução Paralela:**
   Foi concluído todos os testes de forma parelea ultilizando os workes de forma que deixe os testes interamente automatizados.
 
3.**Pipeline de CI/CD:**
   Foi a unica melhoria não atingida, infelizmente não consegui colocar essa melhoria.
