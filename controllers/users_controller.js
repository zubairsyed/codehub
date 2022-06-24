const User = require('../models/user');
console.log(User,"*************************************************")


// to send the user_profile i.e html file from server to browser
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile',{
            title: 'user profile',
            profile_user: user
        });
    })
    
}


module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        // {name: req.body.name, email: req.body.email} instead we r writing req.body
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorised');
    }
}

// to send the user_sign_up i.e html file from server to browser
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "codehub | Sign Up", 
    })
}

// to send the user_sign_in i.e html file from server to browser
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
        // return res.redirect('/posts/post');
    }

    return res.render('user_sign_in', {
        title:"codehub | Sign In"
    })
}

// // get the profile data
// module.exports.createprofile = function (req, res) {
//     console.log("req.profilecreate", req.body);
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }
//     User.findOne({ email: req.body.email }, function (err, user) {
//         console.log("found email",req.body.email);
//         if (err) {
//             console.log('error in finding user in sign up'); return;
//         }

//         if (!user) {
//             User.create(req.body, function (err, user) {
//                 if (err) {
//                     console.log('error in finding user in sign up');
//                     return;
//                 } 
//                 return res.redirect('/users/sign-in');
//             })
//         }

//         else {
//             return res.redirect('back');
//         }

//     })

// }

// get the sign up data
module.exports.create = function (req, res){
    console.log("req.signup", req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        console.log("found email",req.body.email);
        if (err) {
            console.log('error in finding user in sign up'); return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in finding user in sign up');
                    return;
                } 

                return res.redirect('/users/sign-in');
            })
        }

        else {
            return res.redirect('back');
        }

    })

}

// sign in and create a session for user
module.exports.createSession = function (req, res){
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
    //    return res.redirect('/users/sign-in');
      });
}
