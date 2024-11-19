import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    image: {
      type: String, // URL to image for the blog post
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
