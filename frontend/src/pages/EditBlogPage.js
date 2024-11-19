import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from '../slices/blogApiSlice'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const EditBlogPage = () => {
  const { blogId } = useParams() // Get the post ID from the URL
  const [updatePost, { isLoading: updating }] = useUpdatePostMutation()
  const [uploadPostImage, { isLoading: uploadingImage }] =
    useUploadPostImageMutation()

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const { data: post, error, isLoading } = useGetPostsQuery(blogId) // Fetch post by ID
  const navigate = useNavigate()

  // When the post is fetched, populate the form fields
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setImage(post.image || '') // Set image if available
    }
  }, [post])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      toast.error('Title and content are required.')
      return
    }

    try {
      // Update the post
      await updatePost({ id:blogId, title, content, image }).unwrap()
      toast.success('Post updated successfully!')
      navigate('/') // Navigate to the homepage or another page after success
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update post.')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    try {
      const response = await uploadPostImage(formData).unwrap()
      toast.success(response.message)
      setImage(response.image) // Set the image URL from the response
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to upload image.')
    }
  }

  if (isLoading || uploadingImage) {
    return <Loading /> // Show loading spinner while fetching or uploading
  }

  if (error) {
    return <div>Error: {error.message}</div> // Show error if there's an issue fetching the post
  }

  return (
    <div className='edit-blog-page'>
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className='edit-blog-form'>
        <div className='form-group'>
          <label htmlFor='image-url'>Image URL</label>
          <input
            type='text'
            id='image-url'
            placeholder='Enter image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='image-file'>Upload Image</label>
          <input
            type='file'
            id='image-file'
            name='image'
            onChange={uploadFileHandler}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            placeholder='Write your post content here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button type='submit' className='submit-button'>
          {updating ? <Loading /> : 'Update Post'}
        </button>
      </form>
    </div>
  )
}

export default EditBlogPage
