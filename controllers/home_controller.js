const Post = require('../models/post');
const User = require('../models/user');



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

// now to show comments on home page
// loading 2 attributes comment and user od that comment
        

module.exports.home = function (req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });
        });

       
    })

}
// module.exports .actionName = function(req,res)