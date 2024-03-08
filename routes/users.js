var express = require('express');
const { getCourtData, getSingleCourtData, getslotsdata, ordersdata } = require('../controllers/userControllers');
const { userAuth } = require('../middlewares/authorise');
var router = express.Router();

/* GET users listing. */
router.get('/getCourtData',userAuth,getCourtData );
router.get('/getSingleCourtData',userAuth,getSingleCourtData );
router.get('/getslotsdata',userAuth,getslotsdata );
router.get('/ordersdata',userAuth,ordersdata );

module.exports = router;
