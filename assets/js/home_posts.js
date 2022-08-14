                    {  
                        // method to submit the form data for new post using AJAX
                        let createPost1 = function(){
                            let newPostForm = $('#new-post-form');
                            newPostForm.submit(function(e){
                                e.preventDefault();
                                $.ajax({
                                    type: 'post',
                                    url: '/posts/createPost',//A string containing the URL to which the request is sent.
                                    // where does this data come from? It looks like a databade stored data but we didn't connect anything
                                    data: newPostForm.serialize(),

                                    success: function(data){
                                        let newPost = newPostDom(data.data.post);
                                        $('#posts-list-container>ul').prepend(newPost);
                                        console.log($('.delete-post-button', newPost));
                                        deletePost($('.delete-post-button', newPost));



                                        createComment(data.data.post._id);
                                        // CHANGE :: enable the functionality of the toggle like button on the new post
                                        toggleLike($('.toggle-like-button', newPost));

                                        console.log(data);
                                        new Noty({
                                            theme: 'relax',
                                            text: "Post Created",
                                            type: 'success',
                                            layout: 'topRight',
                                            timeout: 1000
                                        }).show();
                                        
                                    }, error: function(error){
                                        console.log(error.responseText);
                                    }
                                });
                            });
                        } 

                        // method to create a post in DOM
                        let newPostDom = function(post){
                            // CHANGE :: show the count of zero likes on this post
                            return $(`<li id="post-${post._id}">
                            <p>           
                                
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                                </small>
                                ${post.content}
                                <br>
                                <small>
                                ${post.user.name}
                                </small>
                                <br>
                                            <small>
                                                
                                                    <a id = "toggle-like-id" class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                                        0 Likes
                                                    </a>
                                                
                                            </small>

                            </p>
                            <div class="post-comments">
                                    
                                    <form action="/comments/createComment" id="add-comment-form-${ post._id }" method="POST">
                                        <input type="text" name="content" placeholder="Type here to add comment.." required>
                                        <input type="hidden" name="post" value="${post._id}">
                                        <input type="submit" value="Add Comment">
                                
                                    </form>
                                <div class="post-comments-list">
                                    <ul id="post-comments-${post._id}">
                                        
                                    </ul>
                                </div>
                            </div>
                        </li>
                    `);
                        }



                        // method to delete a post from dom
                        let deletePost = function(deleteLink){
                            console.log("Hello world", deleteLink);
                            $(deleteLink).click(function(e){
                                e.preventDefault();
                                $.ajax({
                                    type: 'get',
                                    url: $(deleteLink).prop('href'),
                                    success: function(data){
                                        $(`#post-${data.data.postId}`).remove();
                                        new Noty({
                                            theme: 'relax',
                                            text: "Post Deleted",
                                            type: 'warning',
                                            layout: 'topRight',
                                            timeout: 1000
                                        }).show();
                                    
                                    }, error: function(error){
                                        console.log(error.responseText);
                                    }
                                });
                            });
                        }





                        // function to submit the form data for new comment using AJAX
                        let createComment = function(PostId){
                            let comments = $(`post-comments-${PostId}`);
                            console.log(comments);
                            let commentForm = $(`#add-comment-form-${ PostId }`);
                            console.log(commentForm);
                            commentForm.submit(function(e){
                                e.preventDefault();
                                $.ajax({
                                    type: 'post',
                                    url: '/comments/createComment',
                                    data: commentForm.serialize(),
                                    success: function(data){
                                        console.log(data);
                                        let newComment = newCommentDOM(data.data.comment);
                                        $(`#post-comments-${ PostId }`).prepend(newComment);
                                        deleteComment($('.delete-comment-button', newComment));


                                        // CHANGE :: enable the functionality of the toggle like button on the new comment
                                        toggleLike($(' .toggle-like-button', newComment));
                                        new Noty({
                                            theme: 'relax',
                                            text: "Comment published!",
                                            type: 'success',
                                            layout: 'topRight',
                                            timeout: 1500
                                            
                                        }).show();


                                    },error: function(err){
                                        console.log(err);
                                    }
                                });
                            });
                        }


                        let newCommentDOM = function(comment){
                                console.log(comment.content);
                                console.log(comment._id);
                                console.log(comment.user.name)
                                return $(`<li id = "comment-${comment._id}">
                                <p>
                                    
                                <small>
                                    <a class="delete-comment-button" href="/comments/destroyComment/${comment._id}">X</a>
                                </small>
                                <p> comment :
                                    ${comment.content}
                                    <br>
                                    <small>
                                        ${comment.user.name}
                                    </small>
                                    <small>
                                        <a id = "toggle-like-id" class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                            0 Likes
                                        </a>
                                    </small>
                                </p>
                            </p>
                            </li>`)
                                
                        }


                        let deleteComment = function(deleteLink){
                            $(deleteLink).click(function(e){
                                e.preventDefault();

                                $.ajax({
                                    type: 'get',
                                    url: $(deleteLink).prop('href'),
                                    success: function(data){
                                        $(`#comment-${data.data.comment_id}`).remove();

                                        new Noty({
                                            theme: 'relax',
                                            text: 'Comment Deleted!',
                                            type: 'success',
                                            layout: 'topRight',
                                            timeout: 1000
                                        }).show();
                                    },error: function(er){
                                        console.log(er.responseText);
                                    }
                                })
                            })
                        }


                         // console.log("this home_posts.........",this);

                         let toggleLike = function(toggleElement){
                            $(toggleElement).click(function(e){
                                e.preventDefault();
                                let selfLink = $('.toggle-like-button');

                                console.log("this home_posts.........",this);
                                // this is a new way of writing ajax which you might've studied, it looks like the same as promises
                            $.ajax({
                                type: 'POST',
                                url: $(selfLink).attr('href'),
                            })
                            .done(function(data) {
                                let likesCount = parseInt($(selfLink).attr('data-likes'));
                                console.log(likesCount);
                                if (data.data.deleted == true){
                                    likesCount -= 1;
                                    
                                }else{
                                    likesCount += 1;
                                }


                                $(selfLink).attr('data-likes', likesCount);
                                $(selfLink).html(`${likesCount} Likes`);

                            })
                            .fail(function(errData) {
                                console.log('error in completing the request');
                            });
                            })
                    }


                        


                        function convertPosttoAJAX(){
                            $('#posts-list-container > ul >li').each(function(){
                                let self = $(this);
                                let deleteButton = $('.delete-post-button', self);
                                console.log(deleteButton);
                                deletePost(deleteButton);
                                console.log("convertpost to ajax **",self);
                                let postId=self.prop('id').split('-')[1];
                                console.log(postId);
                                $(`#post-comments-${ postId } > li`).each(() =>{
                                    console.log("*under post-comments*",this);
                                    deleteComment($('.delete-comment-button', this));
                                });
                                createComment(postId);
                            });
                        }

                       

                        createPost1();
                        convertPosttoAJAX();
                    }