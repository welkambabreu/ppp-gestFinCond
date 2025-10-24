const incomes = require('../models/incomeModel');

exports.create = (req, res) => {
  const { tipo, valor, data, comprovante } = req.body;
  const income = { id: incomes.length + 1, tipo, valor, data, comprovante };
  incomes.push(income);
  res.status(201).json(income);
};

exports.getAll = (req, res) => {
  res.json(incomes);
};

exports.getById = (req, res) => {
  const income = incomes.find(i => i.id === parseInt(req.params.id));
  if (!income) return res.status(404).json({ message: 'Receita não encontrada' });
  res.json(income);
};
