import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '../slices/blogApiSlice' // Adjust paths as needed
import { toast } from 'react-toastify'

const EditBlogPage = () => {
  const { postId } = useParams() // Get postId from the URL
  const navigate = useNavigate()
  const { data: post, isLoading, error } = useGetPostByIdQuery(postId) // Fetch post data using the API hook
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation() // Mutation hook to update the post

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        image: post.image || '', // Pre-fill image if available
      })
    }
  }, [post])

  // If loading, show loading spinner or message
  if (isLoading) return <div>Loading...</div>

  // If there's an error fetching the post, show an error message
  if (error) return <div>Error: {error.message}</div>

  // Check if post data is empty or invalid
  if (!post) return <div>Post not found</div>

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedPost = await updatePost({ id: postId, ...formData }).unwrap()
      toast.success('Blog updated successfully!')
      navigate('/') // Redirect to the homepage after successful update
    } catch (err) {
      toast.error('Failed to update the blog post')
    }
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name='content'
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type='text'
            name='image'
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type='submit' disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Post'}
        </button>
      </form>

      {/* Back to Home Button */}
      <button onClick={() => navigate('/')} className='btn btn-secondary'>
        Back to Home
      </button>
    </div>
  )
}

export default EditBlogPage
