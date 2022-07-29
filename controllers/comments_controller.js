// this files gets the data from views folder file
const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.createComment = async function (req, res) {
    // req.body.post this post is from home.ejs 2nd form
    // 2nd input name
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user
            });
        // updating the post comment in post schema
        post.comments.push(comment);
        // save tells the database to save the post finally
         post.save();
                
            console.log("*COMMENT*",comment);
            if(req.xhr){
                // similar for commment to dfetch the user's id!
                // comment = await comment.populate('user','name');
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: "comment created"
                });
            }

            req.flash('success','comment published');
            

            res.redirect('/');
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }
}

    module.exports.destroyComment = async function (req, res) {
        try{
        let comment = await Comment.findById(req.params.id);
        console.log("^^^^^^^^^^^^^^^",req.params.id);
            if (comment.user == req.user.id) {
                let postId = comment.post;
                
                comment.remove();
                // pulling the post id which is matching with comment id comment
                let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }) 
               
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment_id: req.params.id
                        },
                        message: "post deleted!"
                    })
                }
               
                req.flash('success','comment deleted');    
                return res.redirect('back');
                
            } else {
                req.flash('error','Unauthorised!');
                return res.redirect('back');
            }
        } catch (err) {
            console.log('Error', err);
            return;
        }
    }