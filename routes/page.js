
const express = require('express');
<<<<<<< Updated upstream
=======
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
>>>>>>> Stashed changes
const router = express.Router();

//GET /
router.get('/',(req,res)=>{
    res.render('users/login');
});

//GET /info
router.get('/info',(req,res)=>{
    res.render('pages/info')
})

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
module.exports = router;