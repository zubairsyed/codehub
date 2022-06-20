const Post = require('../models/post');

module.exports.post = function (req, res) {
    return res.render('home', {
        title: 'Posts'
    })
}

module.exports.createPost = function (req, res) {
    console.log("POST CREATE", req.body.content);
    return res.redirect('/');
}