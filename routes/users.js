const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');


console.log('user router loaded');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);
// router.post('/createprofile/:id', userController.createprofile);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);



router.get('/sign-out', userController.destroySession);

// this will be /users/auth/google  , profile is the  -{array of strings}
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
// it passes from the middle ware passport for authentication and goes for creates session 
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);



module.exports = router;