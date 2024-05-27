
const express = require('express');
const router = express.Router();
const {join, login, logout} = require('../controllers/users');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

// POST /users/join
router.post('/join', isNotLoggedIn, join); 

// POST /users/login
router.post('/login', isNotLoggedIn, login);

//GET /users/logout
router.get('/logout', isLoggedIn,logout);

module.exports = router;