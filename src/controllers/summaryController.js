const incomes = require('../models/incomeModel');
const expenses = require('../models/expenseModel');
const summary = require('../models/summaryModel');

exports.getSummary = (req, res) => {
  // Cálculo das receitas
  const totalReceita = incomes.reduce((acc, i) => acc + Number(i.valor), 0);
  const totalDespesas = expenses.reduce((acc, e) => acc + Number(e.valor), 0);
  const saldoAnterior = summary.saldoAnterior;
  const saldoAtual = saldoAnterior + totalReceita - totalDespesas;
  summary.saldoAtual = saldoAtual;
  res.json({
    saldoAnterior,
    totalReceita,
    totalDespesas,
    saldoAtual,
    totalCaixa: saldoAtual
  });
};

exports.setSaldoAnterior = (req, res) => {
  const { saldoAnterior } = req.body;
  summary.saldoAnterior = Number(saldoAnterior);
  res.json({ saldoAnterior: summary.saldoAnterior });
};
