const express = require('express');
const controller = require('../controllers/expenseController');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../resources/comprovantes'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const authMiddleware = require('../middleware/auth');
router.post('/', upload.single('comprovante'), authMiddleware, controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
