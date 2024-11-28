
import Comment from '../models/Comment.js'
import mongoose from 'mongoose'
import Blog from '../models/Blog.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Create a new comment
export const createComment = asyncHandler(async (req, res) => {
  const { content, blogId } = req.body

  console.log('Request body:', req.body) // Debugging log

  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized, no user found' })
  }

  if (!blogId) {
    return res.status(400).json({ message: 'Blog ID is required' })
  }

  try {
    const comment = await Comment.create({
      content,
      blog: blogId, // Make sure the field is correctly mapped to 'blog'
      user: req.user._id, // Ensure this is not undefined
    })

    res.status(201).json(comment)
  } catch (error) {
    console.error(error) // Log error to debug
    res.status(500).json({ message: error.message })
  }
})

// Get comments for a specific blog post
export const getCommentsByBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params

  const blog = await Blog.findById(blogId)
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' })
  }

  const comments = await Comment.find({ blog: blogId }) // Ensure comments are filtered by blogId
    .populate('user', 'name username') // Populate user info (including username)
    .exec()

  res.status(200).json({ comments })
})

// Update a comment
export const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { content } = req.body
  const user = req.user // Assuming user is authenticated

  const comment = await Comment.findById(commentId)
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }

  if (comment.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ message: 'You can only update your own comments' })
  }

  comment.content = content
  await comment.save()

  res.status(200).json({
    message: 'Comment updated successfully',
    comment,
  })
})
// Controller code
// Controller code for deleting a comment
// Middleware function to handle deleting comments
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId, blogId } = req.params // Extract both commentId and blogId

  // Validate ObjectIds
  if (
    !mongoose.isValidObjectId(commentId) ||
    !mongoose.isValidObjectId(blogId)
  ) {
    return res.status(400).json({ message: 'Invalid commentId or blogId' })
  }

  // Find the blog post by ID and populate its user
  const blog = await Blog.findById(blogId).populate('user')
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' })
  }

  // Check if the comments field is an array
  if (!Array.isArray(blog.comments)) {
    blog.comments = [] // Fallback to an empty array
  }

  // Find the comment by ID
  const comment = await Comment.findById(commentId)
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }

  // Check if the user making the request is the owner of the blog (post owner) or the comment (comment author)
  const isAuthorizedToDelete =
    blog.user._id.toString() === req.user._id.toString() || // Blog owner
    comment.user._id.toString() === req.user._id.toString() // Comment owner

  if (!isAuthorizedToDelete) {
    return res
      .status(401)
      .json({ message: 'User not authorized to delete this comment' })
  }

  // Proceed to delete the comment
  await Comment.deleteOne({ _id: commentId })

  // Remove the comment from the blog's comments array
  blog.comments = blog.comments.filter((c) => c.toString() !== commentId)
  await blog.save()

  res.status(200).json({ message: 'Comment deleted successfully' })
})
