const request = require('supertest');
const app = require('../src/index');

const obterToken = async (email, senha) => {
    const respostaLogin = await request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({ email, senha });

    return respostaLogin.body ? respostaLogin.body.token : null;
};

module.exports = {
    obterToken,
};