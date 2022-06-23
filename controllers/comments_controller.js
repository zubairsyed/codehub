// this files gets the data from views folder file
const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.createComment = function (req, res) {
    // req.body.post this post is from home.ejs 2nd form
    // 2nd input name
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log("cannot post a comment!");
                }
                // updating the post comment in post schema
                post.comments.push(comment);
                // save tells the database to save the post finally
                post.save();
                res.redirect('/');
            });
        }
    });
}