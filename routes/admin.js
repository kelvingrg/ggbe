var express = require('express');
var router = express.Router();
const multer = require('multer');
const { createNewCourt, addTimeSlotData, getlatestcreatedDate } = require('../controllers/adminController');
const { adminAuth } = require('../middlewares/authorise');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/createnewcourt' ,upload.array('files'), createNewCourt )
router.post('/addtimeslots' , addTimeSlotData )
router.get('/getlatestcreatedDate' , getlatestcreatedDate )

module.exports = router;