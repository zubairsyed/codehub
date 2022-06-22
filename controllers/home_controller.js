const Post = require('../models/post');




// module.exports.home = function (req, res) {
//     // console.log(req.cookies);
//     // res.cookie('user',890 )

//     // returns all the posts
//     Post.find({}, function (err, posts) {
//         return res.render('home', {
//             title: 'Home | CODEHUB',
//             // showing these posts in home /views
//             posts: posts
//         })
//     })
//     console.log('billa');
    
// }


module.exports.home = function (req, res) {
    // populate the user of each post
    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', {
            title: 'codehub|home',
            posts: posts
        })
    })
}
// module.exports .actionName = function(req,res)