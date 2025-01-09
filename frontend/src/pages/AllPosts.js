import React from 'react'
import { toast } from 'react-toastify'
import { useGetPostsQuery, useDeletePostMutation } from '../slices/blogApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogComments from './BlogComment'
import AddComment from './AddComment'
import { FaTrash, FaHeart, FaEdit } from 'react-icons/fa'

const AllPosts = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery() // Fetching posts
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap()
        refetch() // Refresh posts after deletion
        toast.success('Post deleted successfully.')
      } catch (error) {
        toast.error(error?.data?.message || 'Error deleting post')
      }
    }
  }

  const editHandler = (postId) => {
    navigate(`/update/${postId}`)
  }

  const onCommentAdded = () => {
    refetch() // Refresh posts after adding a comment
  }

  if (isLoading) return <p>Loading posts...</p>
  if (error) return <p>Error loading posts: {error.message}</p>

  return (
    <div className='section-center'>
      <h2>All Blogs</h2>
      <section className='all-posts'>
        <div className='posts-grid'>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className='post-card'>
                {/* Post Image */}
                <div className='post-image'>
                  <img src={post.image} alt={post.title} />
                </div>

                {/* Post Content */}
                <div className='post-content'>
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 150)}...</p>{' '}
                  {/* Truncate content */}
                  <p>
                    <strong>Published on:</strong>{' '}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>By:</strong> {post.user.username}
                  </p>
                  <Link to={`/blog/${post._id}`} className='btn btn-primary'>
                    Read More
                  </Link>
                </div>

                {/* Post Footer */}
                <div className='post-footer'>
                  <div className='post-actions'>
                    {userInfo ? (
                      <>
                        <FaHeart className='like-icon' />
                        <BlogComments
                          blogId={post._id}
                          blogOwnerId={post.user._id}
                        />
                        {userInfo._id === post.user._id && (
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
                              <FaTrash /> Delete
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <p className='login-message'>
                        Login to like or comment on posts.
                      </p>
                    )}
                  </div>
                </div>

                {/* Add Comment Section */}
                {userInfo && (
                  <AddComment
                    blogId={post._id}
                    onCommentAdded={onCommentAdded}
                  />
                )}
              </div>
            ))
          ) : (
            <div className='no-posts'>No posts found.</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AllPosts
