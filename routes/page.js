const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {management} = require('../controllers/extinguishers');
const {getProfile} = require('../controllers/users');

const express = require('express');
const router = express.Router();

//GET /
router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('users/login');
});

//GET /extinguishers
router.get('/extinguishers',isLoggedIn,management);

//GET /registration
router.get('/registration',isLoggedIn,(req,res)=>{
    res.render('extinguishers/registration');
});

//TODO::
//GET /users
router.get('/users',isLoggedIn,getProfile);

//GET /info
router.get('/info',isLoggedIn,(req,res)=>{
    res.render('pages/info')
})

module.exports = router;