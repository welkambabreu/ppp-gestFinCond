const expenses = require('../models/expenseModel');
const fs = require('fs');
const path = require('path');

exports.create = (req, res) => {
  const { despesa, valor, data } = req.body;
  let comprovante = null;
  if (req.file) {
    comprovante = req.file.filename;
  }
  const expense = { id: expenses.length + 1, despesa, valor, data, comprovante };
  expenses.push(expense);
  res.status(201).json(expense);
};

exports.getAll = (req, res) => {
  res.json(expenses);
};

exports.getById = (req, res) => {
  const expense = expenses.find(e => e.id === parseInt(req.params.id));
  if (!expense) return res.status(404).json({ message: 'Despesa não encontrada' });
  res.json(expense);
};
