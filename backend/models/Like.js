import mongoose from 'mongoose'

const likeSchema = mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    liked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Like = mongoose.model('Like', likeSchema)

export default Like
