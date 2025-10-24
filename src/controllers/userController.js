const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

exports.register = (req, res) => {
  const { nome, email, senha, isAdmin } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'E-mail já cadastrado' });
  }
  const hash = bcrypt.hashSync(senha, 8);
  const user = { id: users.length + 1, nome, email, senha: hash, isAdmin: !!isAdmin };
  users.push(user);
  res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, 'segredo_jwt', { expiresIn: '1h' });
  res.json({ token });
};

exports.getAll = (req, res) => {
  const result = users.map(({ senha, ...rest }) => rest);
  res.json(result);
};

exports.getById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  const { senha, ...rest } = user;
  res.json(rest);
};
