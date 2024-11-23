import React from 'react'
import { useGetPostByIdQuery } from '../slices/blogApiSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogComments from './BlogComment'

const SingleBlog = () => {
  const { id: blogId } = useParams() // Get the blog id from the URL
  const { data: post, error, isLoading } = useGetPostByIdQuery(blogId) // Fetch the post by id



  if (isLoading) return <p>Loading...</p> // Show loading state
  if (error) return <p>Error fetching blog post</p> // Show error state
  if (!post) return <p>Blog not found</p> // Show message if no post is found

  return (
    <div className='single-blog-container'>
      <h1>{post.title}</h1> {/* Display blog title */}
      <div className='author-info'>
        {/* Display the author's name */}
        <p>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>{' '}
        <h3>post By "{post.user.username}"</h3>
        {/* Display publish date */}
      </div>
      <div className='post-content'>
        <p>{post.content}</p> {/* Display the content of the blog */}
      </div>
      {post.image && (
        <div className='post-image'>
          <img src={post.image} alt={post.title} />
        </div>
      )}
 
    </div>
  )
}

export default SingleBlog
