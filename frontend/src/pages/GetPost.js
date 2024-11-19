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
    <div className='get-post section-center'>
      <h1>Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className='my-3 p-3 border rounded shadow'>
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && (
                <div>
                  <img
                    src={post.image}
                    alt='Post'
                    className='img-fluid post-image'
                  />
                </div>
              )}
              <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
              <div className='d-flex justify-content-between'>
                <FaHeart />
                <BlogComments blogId={post._id} /> {/* Scoped to post */}
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
        <div>No posts found.</div>
      )}
    </div>
  )
}

export default GetPost
