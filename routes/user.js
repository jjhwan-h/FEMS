
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {join, login, logout} = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

//GET  /user/management
router.get('/management',isLoggedIn,(req,res)=>{
    res.render('users/management');
});

//GET  /user/profile
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('users/profile',{user:{name:"jjang",_id:"1234"},login:true,error:null,success:true})
})

// POST /user/join
router.post('/join', isNotLoggedIn, join); 

// POST /user/login
router.post('/login', isNotLoggedIn, login);

//GET /user/logout
router.get('/logout', isLoggedIn,logout);

module.exports = router;