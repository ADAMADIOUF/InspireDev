import express from 'express'
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createBlog).get(getBlogs)
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog)

export default router
