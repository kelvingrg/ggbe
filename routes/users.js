var express = require('express');
const { getCourtData, getSingleCourtData } = require('../controllers/userControllers');
const { userAuth } = require('../middlewares/authorise');
var router = express.Router();

/* GET users listing. */
router.get('/getCourtData',userAuth,getCourtData );
router.get('/getSingleCourtData',userAuth,getSingleCourtData );

module.exports = router;
