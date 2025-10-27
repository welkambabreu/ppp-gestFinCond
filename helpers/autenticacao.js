const request = require('supertest');
const obterToken = async(email, senha) => {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send(
            {
                'email': email,
                'senha': senha
            })

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}