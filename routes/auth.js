const express = require('express');
const { signUp, login } = require('../controllers/auth.controller');
const router = express.Router();
const {isEmail, isGoodPassword} = require('../middlewares/checkEmailPassword');

router.post('/signUp', isEmail, isGoodPassword, signUp);
router.post('/login', login);

module.exports = router