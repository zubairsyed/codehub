// this file gets the data from controller 
// and sends to the index.js under routes 

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments_controller');
const passport = require('passport');
console.log('user router loaded');


router.post('/createComment', passport.checkAuthentication,commentController.createComment);

module.exports = router;

