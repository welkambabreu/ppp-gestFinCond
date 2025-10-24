# API Gestão Financeira de Condomínio

Esta API permite o controle financeiro de um condomínio, incluindo cadastro de despesas, receitas, usuários, upload/download de comprovantes e cálculo automático de saldos.

## Funcionalidades
- Cadastro e login de usuários (admin e comum)
- Cadastro e consulta de despesas e receitas
- Upload e download de comprovantes de pagamento
- Cálculo automático de saldo e total em caixa
- Autenticação JWT via middleware
- Documentação Swagger disponível em `/api-docs`

## Camadas
- **routes**: Rotas da API
- **controllers**: Lógica dos endpoints
- **services**: Regras de negócio (pode ser expandido)
- **models**: Estruturas de dados em memória
- **middleware**: Autenticação JWT
- **resources**: Swagger e comprovantes

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```
3. Acesse a documentação em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Observações
- O primeiro saldo do mês deve ser lançado manualmente via endpoint `/api/resumo/saldo-anterior`.
- O saldo dos meses seguintes é calculado automaticamente.
- Apenas administradores podem cadastrar receitas/despesas.
- Consultas podem ser feitas por qualquer usuário autenticado.

## Estrutura dos Endpoints
Consulte o arquivo `resources/swagger.json` para detalhes de cada endpoint, modelos de resposta e códigos de erro.
