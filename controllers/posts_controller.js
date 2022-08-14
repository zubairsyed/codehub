const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


console.log("in post js controller&**************&&&&&*");
console.log(Post,"bumbar&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*");


module.exports.createPost = async function (req, res) {
    try {
        console.log(req.body.content, "nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        let post = await Post.create({
            
            content: req.body.content,
            user: req.user
        });
        
        console.log("post created successfully");


        if (req.xhr) {
            // post = await post.populate('user','name');
            
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            });
        }
        
        req.flash('success', 'post published!');
        return res.redirect('back');
    } catch(err) {
        console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// deleting a post
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // authorizing the user for deleting his own posts
        // and not of others
        // .id means converting the object id into string
        
        if (post.user == req.user.id) {

            
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});
            
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        postId: req.params.id
                    },
                    message: "post deleted"
                });

            }
            req.flash('success', 'post and associated comments deleted!');
            return res.redirect('back');
            
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log('Error', err);
        return res.redirect('back');
    }
        
}