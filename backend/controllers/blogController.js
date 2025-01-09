import asyncHandler from '../middleware/asyncHandler.js'

import Blog from '../models/Blog.js'
import mongoose from 'mongoose'
// Create Blog
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, categories, image, status } = req.body

  // Ensure user is logged in
  if (!req.user) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Create new blog post
  const post = new Blog({
    title,
    content,
    user: req.user._id, // This gets the user ID from the session or token
    categories,
    image,
    status,
  })

  // Save the post to the database
  const createdPost = await post.save()

  res.status(201).json(createdPost)
})
  
// Get Blogs
export const getBlogs = asyncHandler(async (req, res) => {
  try {
    // Check if a search query for title exists in the request
    const searchQuery = req.query.title || ''

    // Fetch blogs based on the search query (if any) and populate the user field with the username
    const blogs = await Blog.find({
      title: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search for title
    }).populate('user', 'username')

    // If no blogs are found, send a message
    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found' })
    }

    // Send the fetched blogs as a response
    res.status(200).json(blogs)
  } catch (error) {
    // Catch any errors and send a 500 status with the error message
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body
  const blogId = req.params.id

  // Validate if ID is correct format
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    console.log('Invalid Blog ID format:', blogId)
    return res.status(400).json({ message: 'Invalid Blog ID format' })
  }

  console.log('Blog ID:', blogId)

  try {
    // Fetch the blog by ID
    const blog = await Blog.findById(blogId)

    if (!blog) {
      console.log('Blog not found for ID:', blogId)
      return res.status(404).json({ message: 'Blog not found' })
    }

    // Ensure the current user is the author of the blog
    if (blog.user.toString() !== req.user._id.toString()) {
      console.log('Unauthorized update attempt by user:', req.user._id)
      return res
        .status(401)
        .json({ message: 'You are not authorized to update this blog' })
    }

    // Update fields only if new values are provided
    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.image = image || blog.image

    // Save the updated blog
    const updatedBlog = await blog.save()

    console.log('Blog updated successfully:', updatedBlog)
    return res.status(200).json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return res
      .status(500)
      .json({ message: 'Error updating blog', error: error.message })
  }
})

// Delete Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id

  // Find the blog by ID
  const blog = await Blog.findById(blogId)
  if (!blog) {
    res.status(404)
    throw new Error('Blog not found')
  }

  // Check if the logged-in user is an admin or the one who created the blog
  if (
    blog.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401)
    throw new Error('User not authorized to delete this blog')
  }

  // Attempt to delete the blog
  try {
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: 'Blog deleted' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ message: 'Error deleting blog' })
  }
})

export const getSingleBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id

  const blog = await Blog.findById(blogId).populate('user', 'username')

  if (blog) {
    res.status(200).json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})