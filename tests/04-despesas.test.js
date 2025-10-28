const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const path = require('path');
const filePath = path.resolve(__dirname, 'files', 'Teste_upload_arquivos.pdf');

describe('Cadastro de despesas', () => {

    describe('POST/despesas', () => {
    
        it('Validar o cadastro de despesas', async () => {
            const token = await obterToken('eu@well.com', '123456');
            const resposta = await request(app)
                .post('/api/despesas')
                .set('Authorization', `Bearer ${token}`)
                .field('despesa', 'Limpeza do condomínio')
                .field('valor', 100)
                .field('data', '2025-10-03')
                .attach('comprovante', filePath);

            expect(resposta.status).to.equal(201);
            expect(resposta.body.id).to.be.a('number');
            expect(resposta.body.despesa).to.equal('Limpeza do condomínio');
            expect(resposta.body.comprovante).to.be.a('string');

            console.log(resposta.body);
        });
       
    })
})