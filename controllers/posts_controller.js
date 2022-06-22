const Post = require('../models/post');
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

