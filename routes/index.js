const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');


router.get('/', homeController.home);
// this /posts can be defined for search url part and 
// require(./posts) is used for file name in routes.
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
// calling the route comments.js in here as its a hub for all other route files
router.use('/comments',require('./comments'))
router.use('/api',require('./api'));


// ?for any other routs access from here
// router.user('routerName',require('./routerfile))

module.exports = router; 