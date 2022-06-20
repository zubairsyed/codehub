const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller');
console.log('user router loaded');


router.get('/post', postController.post);
router.post('/createPost', postController.createPost);

module.exports = router;
