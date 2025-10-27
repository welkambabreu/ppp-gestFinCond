const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Login', () => {

    describe('POST/login', () => {

        it('Ao logar com o usuário adminsitrador com sucesso deve retornar 200 com o token', async () => {
            const respostaAdm = await request(process.env.BASE_URL)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send(
                    {
                        'email': 'eu@well.com',
                        'senha': '123456',
                    })

            expect(respostaAdm.status).to.equal(200);
            expect(respostaAdm.body.token).to.be.a('string');
        })

        it('Ao logar com o usuário comum com sucesso deve retornar 200 com o token', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send(
                    {
                        'email': 'eu@well.com',
                        'senha': '123456',
                    })

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('Ao logar com o usuário inválido deve retornar status 401', async () => {
            const respostaInv = await request(process.env.BASE_URL)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send(
                    {
                        'email': 'eu@karina.com',
                        'senha': '123456',
                    })

            expect(respostaInv.status).to.equal(401);
            expect(respostaInv.body.message).to.equal('Usuário ou senha inválidos');
        })

    })

})