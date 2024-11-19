import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostsQuery, useDeletePostMutation } from '../slices/blogApiSlice'
import { FaTrash, FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import BlogComments from './BlogComment'
import AddComment from './AddComment'

const GetPost = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()

  const { userInfo } = useSelector((state) => state.auth)

  // Delete post handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap()
        refetch() // Refresh posts after deletion
        toast.success('Post deleted')
      } catch (error) {
        toast.error(error?.data?.message || 'Error deleting post')
      }
    }
  }

  // Handle comment addition
  const onCommentAdded = () => {
    refetch() // Refresh posts after a new comment is added
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='get-post-container'>
      <h1 className='section-title'>Latest Posts</h1>
      {posts && posts.length > 0 ? (
        posts.slice(0, 12).map((post) => (
          <div key={post._id} className='post-card'>
            <div className='post-header'>
              <h3>{post.title}</h3>
              <p className='post-date'>
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='post-content'>
              <p>{post.content.substring(0, 150)}...</p>
              {post.image && (
                <div className='post-image'>
                  <img src={post.image} alt='Post' />
                </div>
              )}
            </div>
            <div className='post-footer'>
              <div className='post-actions'>
                <FaHeart className='like-icon' />
                <BlogComments blogId={post._id} />
                {userInfo && userInfo._id === post.user._id && (
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => deleteHandler(post._id)}
                    disabled={loadingDelete}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
            {/* Add Comment Section */}
            {userInfo && (
              <AddComment blogId={post._id} onCommentAdded={onCommentAdded} />
            )}
          </div>
        ))
      ) : (
        <div className='no-posts'>No posts found.</div>
      )}
    </div>
  )
}

export default GetPost
