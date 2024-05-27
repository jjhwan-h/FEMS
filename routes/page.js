
const express = require('express');
const router = express.Router();

//GET /
router.get('/',(req,res)=>{
    res.render('users/login');
});

//GET /info
router.get('/info',(req,res)=>{
    res.render('pages/info')
})

module.exports = router;