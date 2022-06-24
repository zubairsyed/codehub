const Post = require('../models/post');
const Comment = require('../models/comment');
console.log("in post js controller&**************&&&&&*");
console.log(Post,"bumbar&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*");


module.exports.createPost = function (req, res) {
    console.log(req.user.name,"nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function (err, post) {
        if (err) { console.log('error in creating post'); return; }
        console.log('req.boody',req.body);
        return res.redirect('back');
    })
}

// deleting a post
module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        // authorizing the user for deleting his own posts
        // and not of others
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    })
}