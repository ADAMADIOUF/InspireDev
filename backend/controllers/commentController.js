
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
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId, blogId } = req.params;  // Extract both commentId and blogId

  if (!mongoose.isValidObjectId(commentId) || !mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({ message: 'Invalid commentId or blogId' });
  }

  // Check if the blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Ensure blog.comments is always an array (even if it's undefined)
  blog.comments = blog.comments || []; // Set it to an empty array if it's undefined

  // Check if the comment exists in the Comment collection
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Check if the logged-in user is the author of the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized to delete this comment' });
  }

  // Delete the comment from the Comment collection
  await Comment.deleteOne({ _id: commentId });

  // Remove the comment from the blog's comments array
  blog.comments = blog.comments.filter((c) => c.toString() !== commentId);
  await blog.save();

  res.status(200).json({ message: 'Comment deleted' });
});
