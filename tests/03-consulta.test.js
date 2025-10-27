const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')

describe('Consulta', () => {

    describe('GET/users', () => {
        let token

        beforeEach(async () => {

            token = await obterToken('eu@well.com', '123456')
        })

        it('Ao inserir o token válido deverá retornar a relação de uusários cadastrados', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
      
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');

        })

    })
})
		