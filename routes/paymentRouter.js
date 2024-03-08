var express = require('express');
const { orders, paymentSuccess } = require('../controllers/paymentController');
var router = express.Router();
const {userAuth} = require('../middlewares/authorise')


router.post('/orders',orders) 
router.post('/success', userAuth, paymentSuccess) 
module.exports=router