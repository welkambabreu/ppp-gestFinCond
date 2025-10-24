const express = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getById);

module.exports = router;
