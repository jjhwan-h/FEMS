
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {management} = require('../controllers/user');
const router = express.Router();

//GET /
router.get('/',(req,res)=>{
    res.render('users/login');
});

//GET /info
router.get('/info',(req,res)=>{
    res.render('pages/info')
})

//GET  /management
router.get('/management',isLoggedIn,management);

module.exports = router;