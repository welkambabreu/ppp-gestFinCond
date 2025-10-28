const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const path = require('path');
const filePath = path.resolve(__dirname, 'files', 'Teste_upload_arquivos.pdf');

describe('Cadastro de receitas', () => {

    describe('POST/receitas', () => {
    
        it('Validar o cadastro de receitas', async () => {
            const token = await obterToken('eu@well.com', '123456');
            const resposta = await request(app)
                .post('/api/receitas')
                .set('Authorization', `Bearer ${token}`)
                .field('receita', 'Cota Extra')
                .field('valor', 100)
                .field('data', '2025-10-15')
                .attach('comprovante', filePath);

            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.receita).to.equal('Cota Extra');
            expect(resposta.body.comprovante).to.be.a('string');

            console.log(resposta.body);
        });
       
    })
})