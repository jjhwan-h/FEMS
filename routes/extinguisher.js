const express = require('express');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const dotenv =require('dotenv');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {registerExtinguisher} = require('../controllers/extinguisher');
const {management, extinguisherUpdate} = require('../controllers/extinguisher');;

dotenv.config();

const router = express.Router();

const upload= 
    multer({
    storage: multerGoogleStorage.storageEngine({
        bucket: process.env.BUCKET,
        keyFilename: process.env.KEY_FILENAME,
        projectId:process.env.PROJECT_ID,
        filename: (req, file, cb) => {
            cb(null, `extinguisherImg/${Date.now()}_${file.originalname}`);
          },
     }),
     limits:{
        fileSize:5*1024*1024,
     }
    });
// POST /extinguisher/register
router.post('/register', isLoggedIn, upload.single("img") ,registerExtinguisher);

//GET /extinguisher/register
router.get('/register', isLoggedIn, (req,res)=>
        res.render('extinguishers/register')
);

//GET  /extinguisher/management
router.get('/management',isLoggedIn,management);

//POST /extinguisher/update
router.post('/update',isLoggedIn,extinguisherUpdate);

module.exports = router;