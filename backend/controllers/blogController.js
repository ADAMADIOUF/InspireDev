import asyncHandler from '../middleware/asyncHandler.js'

import Blog from '../models/Blog.js'

// Create Blog
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, categories, image, status } = req.body

  const post = new Blog({
    title,
    content,
    user: req.user._id, // Assuming req.user is populated from the middleware
    categories,
    image,
    status,
  })

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

// Update Blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, categories, image, status } = req.body
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('You are not authorized to update this blog')
    }

    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.categories = categories || blog.categories
    blog.image = image || blog.image
    blog.status = status || blog.status

    const updatedBlog = await blog.save()
    res.status(200).json(updatedBlog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
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

  // Check if the logged-in user is the one who created the blog
  if (blog.user.toString() !== req.user._id.toString()) {
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