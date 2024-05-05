
const express = require('express');
const router = express.Router();


//GET  /user/:id/management
router.get('/:id/management',(req,res)=>{
    res.render('users/management',{user:{name:"jjang",_id:"1234"},login:true,error:null,success:true});
});

//GET  /user/:id/profile
router.get('/:id/profile',(req,res)=>{
    res.render('users/profile',{user:{name:"jjang",_id:"1234"},login:true,error:null,success:true})
})

//GET /user/logout
router.get('/logout',)

module.exports = router;