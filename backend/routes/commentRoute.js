import express from 'express'
import {
  createComment,
  getCommentsByBlog,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',protect, createComment) // POST /api/comments
router.get('/:blogId', getCommentsByBlog) // GET /api/comments/:blogId
router.put('/:commentId',protect, updateComment) // PUT /api/comments/:commentId
router.delete('/:commentId/:blogId', protect, deleteComment) // DELETE /api/comments/:commentId

export default router
