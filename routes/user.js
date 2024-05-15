
const express = require('express');
const router = express.Router();
const {join, login, logout} = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

//GET  /user/profile
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('users/profile',)
});

// POST /user/join
router.post('/join', isNotLoggedIn, join); 

// POST /user/login
router.post('/login', isNotLoggedIn, login);

//GET /user/logout
router.get('/logout', isLoggedIn,logout);

module.exports = router;