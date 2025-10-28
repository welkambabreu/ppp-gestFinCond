const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')

describe('ConsultaDespesas', () => {

    describe('GET/despesas', () => {
        let token

        beforeEach(async () => {

            token = await obterToken('eu@well.com', '123456')
        })

        it('Ao inserir o token válido deverá retornar a relação de despesas cadastrados', async () => {
            const resposta = await request(app)
                .get('/api/despesas')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
      
            expect(resposta.status).to.equal(200);
            console.log(resposta.body)

        })

    })
})
        