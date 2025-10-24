const express = require('express');
const controller = require('../controllers/summaryController');
const router = express.Router();

router.get('/', controller.getSummary);
router.post('/saldo-anterior', controller.setSaldoAnterior);

module.exports = router;
