const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const comprovantesDir = path.join(__dirname, '../../resources/comprovantes');

router.get('/:filename', (req, res) => {
  const filePath = path.join(comprovantesDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Arquivo não encontrado' });
  }
  res.download(filePath);
});

module.exports = router;
