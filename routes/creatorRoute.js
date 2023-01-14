const express = require('express')
const router = express.Router()
const {
  upload,
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getProduct,
} = require('../controller/ProductController')

router.post('/createpost', createPost)
router.get('/post', getAllPosts)
router.put('/updatePost/:postId', updatePost)
router.delete('/deletePost/:postId', deletePost)

module.exports = router
