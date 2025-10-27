const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/index');
require('dotenv').config();

describe('Registro', () => {
    describe('POST/register', () => {

        it('Ao cadastrar usuário comum com sucesso deve retornar 201 a mensagem usuário criado', async () => {
            const respostaComum = await request(process.env.BASE_URL)
                .post('/api/users/register')
                .set('Content-Type', 'application/json')

                .send(
                    {
                        'nome': 'Paulo',
                        'email': 'eu@paulo.com',
                        'senha': '123456',
                        'isAdmin': false
                    }
                )
            expect(respostaComum.status).to.equal(201);
            expect(respostaComum.body.id).to.be.a('number');
            expect(respostaComum.body.nome).to.be.a('string');
            expect(respostaComum.body.email).to.be.a('string');
  
        })

        it('Ao cadastrar administrador com sucesso deve retornar 201 a mensagem usuário criado', async () => {
            const respostaAdm = await request(process.env.BASE_URL)
                .post('/api/users/register')
                .set('Content-Type', 'application/json')

                .send(
                    {
                        'nome': 'Well',
                        'email': 'eu@well.com',
                        'senha': '123456',
                        'isAdmin': true
                    }
                )
            expect(respostaAdm.status).to.equal(201);
            expect(respostaAdm.body.id).to.be.a('number');
            expect(respostaAdm.body.nome).to.be.a('string');
            expect(respostaAdm.body.email).to.be.a('string');

        })

        it('Ao tentar cadastrar e-mail existente deve retornar 40', async () => {
            const respostaJacad = await request(process.env.BASE_URL)
                .post('/api/users/register')
                .set('Content-Type', 'application/json')

                .send(
                    {
                        'nome': 'karina',
                        'email': 'eu@well.com',
                        'senha': '123456',
                        'isAdmin': true
                    }
                )
            expect(respostaJacad.status).to.equal(400);
            expect(respostaJacad.body.message).to.equal('E-mail já cadastrado');
           
        })

    })

})