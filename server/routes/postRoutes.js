const { Router } = require('express')

const { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost,
     deletePosts, likePost, dislikePost, addComment, bookmarkPost,
     unbookmarkPost } = require('../controllers/postControllers')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()


router.post('/', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePosts)
router.patch('/:id/like', authMiddleware, likePost);
router.patch('/:id/dislike', authMiddleware, dislikePost);
router.post('/:id/comments', authMiddleware, addComment);
router.post('/:id/bookmark', authMiddleware, bookmarkPost);
router.delete('/:id/unbookmark', authMiddleware, unbookmarkPost);


module.exports = router;

