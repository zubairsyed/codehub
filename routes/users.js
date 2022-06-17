const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
console.log('user router loaded');


router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);
router.post('/createprofile', userController.createprofile);


module.exports = router;