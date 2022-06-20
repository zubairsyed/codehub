const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts',require('./post'));

// ?for any other routs access from here
// router.user('routerName',require('./routerfile))

module.exports = router; 