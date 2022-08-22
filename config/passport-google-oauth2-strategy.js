const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User=require('../models/user');

// tell passport to use strategy for google login
passport.use(new googleStrategy({
        clientID: "375253120169-rquldtjflb4o5ommbatgb4m80ho5sgil.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:1200/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null, user);
            }else{
                // if not found create the user and set it as req.use(sign-in user)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // generating random pwd
                    password: crypto.randomBytes(20).toString('hex')
                    // if any error again using this calback function
                }, function(err, user){
                    if(err){console.log('error in  creating usergoogle strategy-passport', err); return;}

                    return done(null, user);
                })
            }
        });
    }


));

module.exports = passport;