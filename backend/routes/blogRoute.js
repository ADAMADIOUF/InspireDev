import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js'

const router = express.Router()

router
  .route('/')
  .post(protect, createBlog) // Protect create route
  .get(getBlogs)

router
  .route('/:id')
  .get(getSingleBlog)
  .put(protect, updateBlog) // Protect update route
  .delete(protect, deleteBlog) // Protect delete route

export default router
