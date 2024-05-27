const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {management} = require('../controllers/extinguishers');

const express = require('express');
const router = express.Router();

//GET /
router.get('/',(req,res)=>{
    res.render('users/login');
});

//GET /extinguishers
router.get('/extinguishers',isLoggedIn,management);

//GET /registration
router.get('/registration',isLoggedIn,(req,res)=>{
    res.render('extinguishers/registration');
});

//TODO::
//GET /
router.get('/users',isLoggedIn,(req,res)=>{
    //req.params.id를 통해 user정보찾은후
    //users/profile로 렌더링
});

//GET /info
router.get('/info',isLoggedIn,(req,res)=>{
    res.render('pages/info')
})

module.exports = router;