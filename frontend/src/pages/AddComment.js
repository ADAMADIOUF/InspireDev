import React, { useState } from 'react'
import { useCreateCommentMutation } from '../slices/commentApiSlice'

const AddComment = ({ blogId, onCommentAdded }) => {
  const [content, setContent] = useState('')
  const [createComment] = useCreateCommentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newComment = await createComment({ blogId, content }).unwrap()
      setContent('') // Clear input after successful submission
      if (onCommentAdded) onCommentAdded(newComment) // Notify parent component to refresh comments
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write your comment'
        required
      />
      <button type='submit'>Post Comment</button>
    </form>
  )
}

export default AddComment
