import express from 'express'
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} from '../controllers/blogController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createBlog).get(getBlogs)
router.route('/:id').get(getSingleBlog).put(updateBlog).delete(deleteBlog)


export default router
