import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostsQuery, useDeletePostMutation } from '../slices/blogApiSlice'
import { FaTrash, FaHeart, FaComment } from 'react-icons/fa'
import { toast } from 'react-toastify'

const GetPost = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()
   const { userInfo } = useSelector((state) => state.auth)
   console.log('userInfo:', userInfo) 
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePost(id).unwrap()
        refetch()
        toast.success('Post deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='my-3 p-3'>
      <h1>Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className='my-3 p-3 border rounded shadow'>
            <div>
              <h3>{post.title}</h3> {/* Display the post title */}
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
              {/* Add action buttons (e.g., trash, heart, comment icons) */}
              <div className='d-flex justify-content-between'>
                <FaHeart /> <FaComment />{' '}
                {userInfo && userInfo._id === post.user._id && (
                  <button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(post._id)}
                    disabled={loadingDelete}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  )
}

export default GetPost
