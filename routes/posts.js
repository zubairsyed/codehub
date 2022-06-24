const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller');
const passport = require('passport');
console.log('user router loaded');


router.post('/createPost', passport.checkAuthentication, postController.createPost);
// this is where we check the authentication before deleting posts
router.get('/destroy/:id',passport.checkAuthentication, postController.destroy);
module.exports = router;
