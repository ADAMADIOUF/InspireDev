import React, { useState } from 'react'
import {
  useAddPostMutation,
  useUploadPostImageMutation,
} from '../slices/blogApiSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const CreateBlog = ({ onPostCreated }) => {
  const [addPost] = useAddPostMutation()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!title || !content) {
        toast.error('Title and content are required.')
        return
      }
      await addPost({ title, content, image }).unwrap()
      setTitle('') // Clear title field after submission
      setContent('')
      setImage('')
      if (onPostCreated) {
        onPostCreated()
      }
      toast.success('Post created successfully!')
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create post.')
    }
  }
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0]) // Ensure 'image' matches the Multer field

    try {
      const res = await uploadProductImage(formData).unwrap() // Call the API
      toast.success(res.message) // Notify success
      setImage(res.image) // Save the image URL or path
    } catch (error) {
      toast.error(error?.data?.message || error.error) // Notify error
    }
  }

  if (loadingUpload) {
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit} className='create-blog-form'>
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
          name='image' // This must match 'upload.single("image")' in the backend
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
        {loadingUpload ? <Loading /> : 'Create Post'}
      </button>
    </form>
  )
}

export default CreateBlog
