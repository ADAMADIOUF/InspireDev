import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useGetCommentsByBlogQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../slices/commentApiSlice'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BlogComments = ({ blogId, postOwnerId }) => {
  const { data, error, isLoading } = useGetCommentsByBlogQuery(blogId)
  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const [editingCommentId, setEditingCommentId] = useState(null)
  const [updatedContent, setUpdatedContent] = useState('')

  // Handle deleting a comment
  const handleDeleteComment = async (commentId, commentOwnerId) => {
    try {
      // Check if the user is either the comment owner or the post owner
      if (userInfo._id === commentOwnerId || userInfo._id === postOwnerId) {
        await deleteComment({ commentId, blogId }).unwrap()
        toast.success('Comment deleted successfully!')
      } else {
        toast.error('You are not authorized to delete this comment.')
      }
    } catch (error) {
      console.error('Failed to delete comment:', error)
      toast.error(error?.data?.message || 'Failed to delete comment.')
    }
  }

  // Handle editing a comment
  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId)
    setUpdatedContent(content)
  }

  const handleUpdateComment = async () => {
    try {
      if (updatedContent.trim()) {
        await updateComment({
          commentId: editingCommentId,
          content: updatedContent,
        }).unwrap()
        toast.success('Comment updated successfully!')
        setEditingCommentId(null)
        setUpdatedContent('')
      } else {
        toast.error('Content cannot be empty.')
      }
    } catch (error) {
      console.error('Failed to update comment:', error)
      toast.error(error?.data?.message || 'Failed to update comment.')
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setUpdatedContent('')
  }

  if (isLoading) return <div>Loading comments...</div>
  if (error) return <div>Error loading comments: {error.message}</div>

  return (
    <div>
      <h4>Comments</h4>
      {data?.comments?.length > 0 ? (
        data.comments.map((comment) => (
          <div key={comment._id} className='comment-container'>
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
                {userInfo && (
                  <div>
                    {/* Display delete icon if user is authorized */}
                    {userInfo._id === comment.user._id ||
                    userInfo._id === postOwnerId ? (
                      <>
                        <FaTrash
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() =>
                            handleDeleteComment(comment._id, comment.user._id)
                          }
                        />
                      </>
                    ) : null}

                    {/* Display edit icon if user is the comment owner */}
                    {userInfo._id === comment.user._id && (
                      <FaEdit
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() =>
                          handleEditClick(comment._id, comment.content)
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            )}
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
