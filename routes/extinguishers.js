const express = require('express');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const dotenv =require('dotenv');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {registerExtinguisher,patchExtinguisher,deleteExtinguisher} = require('../controllers/extinguishers');

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
// POST /extinguishers
router.post('', isLoggedIn, upload.single("img") ,registerExtinguisher);

//PATCH /extinguishers
router.patch('',isLoggedIn,patchExtinguisher);

//DELETE /extinguishers
router.delete('',isLoggedIn,deleteExtinguisher);

module.exports = router;