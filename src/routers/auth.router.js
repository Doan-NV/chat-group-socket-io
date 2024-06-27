const express = require('express');
const { authController } = require('../modules/auth/index');
const { authValidator } = require('../validators/index');

const router = express.Router();

router.post('/register',authValidator.validateRegistration, authController.register);
router.post('/login',authValidator.validateLogin, authController.login);

module.exports = router;
