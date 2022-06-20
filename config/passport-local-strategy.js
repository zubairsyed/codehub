//import passport
const passport = require('passport');

// we also require passport-local library & specifically require
// strategy from it

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('error in finding user');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('invalid username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// serializing user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserialzing the user from the key in the cookies

passport.deserializeUser(function(id, done){
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user');
            return done(err);
        }

        return done(null, user);
    });
});

// check if the user is auhenticated
passport.checkAuthentication = function(req, res, next) {
    // if the user is signed in, then pass on the requests to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// this middleware function is called from index.js file app.use(passport.setAuthenticatedUser);
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // request.user contains the current 
        // signed in user from the session 
        // cookie and we are just sending
        // this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;