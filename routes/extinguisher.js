const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {registerExtinguisher} = require('../controllers/extinguisher');

const router = express.Router();

// POST /extinguishers/register
router.post('/register', isLoggedIn,registerExtinguisher); //TODO::multer추가


module.exports = router;