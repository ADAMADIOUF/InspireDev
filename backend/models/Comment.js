import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog', // Ensures it's referencing the Blog model
      required: true, // Ensures blogId is mandatory
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Reference to another Comment, for replies
      default: null, // If it's a top-level comment, it will be null
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
