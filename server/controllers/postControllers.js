const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')




// ====================== CREATE A POST
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description, thumbnail } = req.body;
        if (!title || !category || !description || !thumbnail) {
            return next(new HttpError('Please fill all the fields and Choose thumbnail.', 422))
        }

        const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail,
            creator: req.user.id
        });

        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts + 1;
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

        res.status(201).json(newPost);
    } catch (err) {
        return next(new HttpError(err));
    }
};








// ====================== GET ALL POSTS
// GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 })
        res.status(200).json(posts)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}






// ====================== GET SINGLE POST
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}







// ====================== GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}






// ====================== GET USER/AUTHOR POSTS
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params
        const userPosts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(userPosts)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}






// ====================== EDIT POSTS
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, category, description, thumbnail } = req.body;

        // Validate input
        if (!title || !category || !description || !thumbnail) {
            return next(new HttpError('Please fill all the fields.', 422));
        }

        // Perform update
        const updatedPost = await Post.editPost(id, title, category, description, thumbnail);

        // Respond with updated post
        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error.message));
    }
};








// ====================== DELETE POSTS
// DELETE : api/posts/:id
// PROTECTED
const deletePosts = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError('Post Id is required.', 422));
        }

        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }

        // Check if the logged-in user is the creator of the post
        if (req.user.id !== post.creator.toString()) {
            return next(new HttpError('You are not authorized to delete this post.', 403));
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

        // Decrease post count by 1 for the user
        const currentUser = await User.findById(req.user.id);
        if (currentUser) {
            currentUser.posts = (currentUser.posts || 0) - 1;
            await currentUser.save();
        }

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        return next(new HttpError(error.message));
    }
};







// ====================== LIKE A POST
const likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }

        // Check if the user has already liked the post
        if (post.likedBy.includes(userId)) {
            return next(new HttpError('You have already liked this post.', 400));
        }

        // Increment the like count and add the user to the likedBy array
        post.likes += 1;
        post.likedBy.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully.', likes: post.likes });
    } catch (error) {
        console.error('Error in likePost function:', error);
        return next(new HttpError(error.message));
    }
};








// ====================== dISLIKE A POST
const dislikePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }

         // Check if the user has already liked the post
         if (post.dislikedBy.includes(userId)) {
            return next(new HttpError('You have already liked this post.', 400));
        }

        post.dislikes += 1;
        post.dislikedBy.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post disliked successfully.', dislikes: post.dislikes });
    } catch (error) {
        return next(new HttpError(error.message));
    }
};






// ==================== Add Commments:
const addComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }

        const newComment = {
            user: req.user.id,
            text
        };
        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
    } catch (error) {
        return next(new HttpError(error.message));
    }
};






// Bookmark a post
const bookmarkPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }


        // Check if the user has already bookmarked the post
        if (post.bookmarks.includes(userId)) {
            return next(new HttpError('You have already bookmarked this post.', 400));
        }

        // Add the user to the bookmarks array
        post.bookmarks.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post bookmarked successfully.' });
    } catch (error) {
        console.error('Error in bookmarkPost function:', error);
        return next(new HttpError(error.message));
    }
};








// Unbookmark a post
const unbookmarkPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return next(new HttpError('Post not found.', 404));
        }


        // Check if the user has bookmarked the post
        const bookmarkIndex = post.bookmarks.indexOf(userId);
        if (bookmarkIndex === -1) {
            return next(new HttpError('You have not bookmarked this post.', 400));
        }

        // Remove the user from the bookmarks array
        post.bookmarks.splice(bookmarkIndex, 1);
        await post.save();

        res.status(200).json({ message: 'Post unbookmarked successfully.' });
    } catch (error) {
        console.error('Error in unbookmarkPost function:', error);
        return next(new HttpError(error.message));
    }
};




module.exports = {
    createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePosts,
    likePost, dislikePost, addComment, bookmarkPost, unbookmarkPost,
}














// const createPost = async (req, res, next) => {
//     try {
//         let { title, category, description } = req.body
//         if (!title || !category || !description || !req.files) {
//             return next(new HttpError('Please fill all the fields and Choose thumbnail.', 422))
//         }
//         const { thumbnail } = req.files
//         // Check the file size
//         if (thumbnail.size > 2000000) {
//             return next(new HttpError('Thumbnail size is too large. File should be less than 2mb.', 422))
//         }
//         let fileName = thumbnail.name
//         let splittedFileName = fileName.split('.')
//         let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
//         thumbnail.mv(path.join(__dirname, '..', "/uploads", newFileName), async (err) => {
//             if (err) {
//                 return next(new HttpError(err))
//             }
//             else {
//                 const newPost = await Post.create({
//                     title, category, description, thumbnail: newFileName,
//                     creator: req.user.id
//                 })
//                 if (!newPost) {
//                     return next(new HttpError('Post could not be created.', 422))
//                 }
//                 // Find User and increate post count by 1.
//                 const currentUser = await User.findById(req.user.id)
//                 const userPostCount = currentUser.posts + 1
//                 await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })

//                 res.status(201).json(newPost)
//             }
//         })

//     }
//     catch (err) {
//         return next(new HttpError(err))
//     }
// }














// const editPosts = async (req, res, next) => {
//     try {
//         let fileName;
//         let newFilename;
//         let updatedPost;

//         const postId = req.params.id
//         const { title, category, description, thumbnail } = req.body

//         // ReactQuill has a paragraph opening and closing tag with a break tag in between so there are 11 characters in already..
//         if (!title || !category || description.length < 12 || thumbnail) {
//             return next(new HttpError('Please fill all the fields.', 422))
//         }
//         if (!req.files) {
//             updatedPost = await Post.findByIdAndUpdate(postId, {
//                 title, category, description
//             }, { new: true })
//         } else {
//             // Get old posts from DataBase:
//             const oldPost = await Post.findById(postId)
//             // Delete old thumbnail from uploads folder:
//             fs.unlink(path.join(__dirname, '..', "uploads", oldPost.thumbnail), async (err) => {
//                 if (err) {
//                     return next(new HttpError(err))
//                 }
//             })
//             // upload new thumbnail
//             const { thumbnail } = req.files
//             // Check file size
//             if (thumbnail.size > 2000000) {
//                 return next(new HttpError('Thumbnail size is too large. File should be less than 2mb.', 422))
//             }
//             fileName = thumbnail.name
//             let splittedFileName = fileName.split('.')
//             newFilename = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
//             thumbnail.mv(path.join(__dirname, '..', "uploads", newFilename), async (err) => {
//                 if (err) {
//                     return next(new HttpError(err))
//                 }
//             })

//             updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename },
//                 { new: true })

//         }

//         if (!updatedPost) {
//             return next(new HttpError('Post could not be updated.', 422))
//         }

//         res.status(200).json(updatedPost)
//     }
//     catch (err) {
//         return next(new HttpError(err))
//     }
// }














// const deletePosts = async (req, res, next) => {
//     try {
//         const postId = req.params.id
//         if (!postId) {
//             return next(new HttpError('Post Id is required.', 422))
//         }
//         const post = await Post.findById(postId)
//         const fileName = post?.thumbnail
//         // Delete thumbnail from uploads folder
//         if (req.user.id == post.creator) {
//             fs.unlink(path.join(__dirname, '..', "uploads", fileName), async (err) => {
//                 if (err) {
//                     return next(new HttpError(err))
//                 }
//                 else {
//                     await Post.findByIdAndDelete(postId)
//                     // Find user and decrease post count by 1:
//                     const currentUser = await User.findById(req.user.id)
//                     const userPostCount = currentUser?.posts - 1
//                     await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
//                     res.status(200).json('Post deleted successfully.')
//                 }
//             })
//         } else {
//             return next(new HttpError('You are not authorized to delete this post.', 403))
//         }

//     }
//     catch (err) {
//         return next(new HttpError(err))
//     }
// }
