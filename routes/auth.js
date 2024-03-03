var express = require('express');
const { doSignup, doLogin } = require('../controllers/authcontroller');
var router = express.Router();

router.post('/dosignup',doSignup)
router.post('/dologin',doLogin)

module.exports = router;
