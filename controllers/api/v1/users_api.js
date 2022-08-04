const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



// copied from users_controller
// sign in and create a session for user
module.exports.createSession = async function (req, res){
    try{
        // finding user
        let user = await User.findOne({email: req.body.email});

        // if user not found
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "invalid username"
            });
        }
        //if user found
        return res.json(200, {
            message: " Sign in successfull, here is your token , please keep it safe",
            data: {
                // 'codiel' key from passport-jwt-strategy
                // user.toJSON() - for adding external JSON to it
                // 'codeil' = header
                // {expiresIn: '10000'} - timing 1s
                token: jwt.sign(user.toJSON(), 'codiel', {expiresIn: '100000'})
            }
        })
    }   
    catch(err){
        console.log('********************', err);
        return res.json(500, {
            message: "internal Server Error"
        })
    } 
}

