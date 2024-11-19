import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useGetCommentsByBlogQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../slices/commentApiSlice'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BlogComments = ({ blogId }) => {
  const { data, error, isLoading } = useGetCommentsByBlogQuery(blogId)
  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()
  const { userInfo } = useSelector((state) => state.auth)

  // State to handle the editing state of the comment
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [updatedContent, setUpdatedContent] = useState('')

  // Handle editing a comment
  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId)
    setUpdatedContent(content)
  }

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setUpdatedContent('')
  }

  // Handle updating the comment
  const handleUpdateComment = async () => {
    if (!updatedContent.trim()) {
      toast.error('Comment cannot be empty')
      return
    }

    try {
      const updatedComment = await updateComment({
        commentId: editingCommentId,
        content: updatedContent,
      }).unwrap()
      setEditingCommentId(null)
      setUpdatedContent('')
      toast.success('Comment updated successfully!')
    } catch (error) {
      console.error('Failed to update comment:', error)
      toast.error('Failed to update comment.')
    }
  }

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({ commentId, blogId }).unwrap()
      toast.success('Comment deleted successfully!')
    } catch (error) {
      console.error('Failed to delete comment:', error)
      toast.error('Failed to delete comment.')
    }
  }

  if (isLoading) return <div>Loading comments...</div>
  if (error) return <div>Error loading comments: {error.message}</div>

  return (
    <div>
      <h3>Comments</h3>
      {data?.comments?.length > 0 ? (
        data.comments.map((comment) => (
          <div key={comment._id}>
            <div className='comment-container'>
              {editingCommentId === comment._id ? (
                <div>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    rows='3'
                    cols='50'
                  />
                  <button onClick={handleUpdateComment}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{comment.content}</p>
                  {userInfo && userInfo._id === comment.user._id && (
                    <div>
                      <FaEdit
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() =>
                          handleEditClick(comment._id, comment.content)
                        }
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() => handleDeleteComment(comment._id)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <small>By: {comment.user.username}</small>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  )
}

export default BlogComments
