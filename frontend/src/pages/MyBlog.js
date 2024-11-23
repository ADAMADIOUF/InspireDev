import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostsQuery, useDeletePostMutation } from '../slices/blogApiSlice'
import { FaTrash, FaHeart, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import BlogComments from './BlogComment'
import AddComment from './AddComment'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' // Import Link from react-router-dom

const MyBlog = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()

  const { userInfo } = useSelector((state) => state.auth) // Get user info from the redux store
  const navigate = useNavigate()

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

  const editHandler = (postId) => {
    console.log('/update/' + postId) // Check the postId value
    navigate(`/update/${postId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  // Filter posts to show only the ones created by the logged-in user
  const userPosts = posts.filter((post) => post.user._id === userInfo._id)

  return (
    <div className='get-post-container'>
      <h1 className='section-title'>Your Blog Posts</h1>
      {userPosts && userPosts.length > 0 ? (
        userPosts.slice(0, 12).map((post) => (
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
                  <>
                    {/* Edit Button */}
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={() => editHandler(post._id)}
                    >
                      <FaEdit /> Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteHandler(post._id)}
                      disabled={loadingDelete}
                    >
                      <FaTrash />
                    </button>
                  </>
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
        <div className='no-posts'>
          You have not created any posts yet.{' '}
          <Link to='/user/create-blog' className='btn btn-primary'>
            Create a New Post
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyBlog
