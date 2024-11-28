import React from 'react'
import { useGetPostByIdQuery } from '../slices/blogApiSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogComments from './BlogComment'
import AddComment from './AddComment'

const SingleBlog = () => {
  const { id: blogId } = useParams() // Get the blog ID from the URL
  const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(blogId) // Fetch the post by ID
  const { userInfo } = useSelector((state) => state.auth)

  // Handle refresh after a comment is added
  const onCommentAdded = () => {
    refetch() // Refresh the blog post
  }

  if (isLoading) return <p>Loading...</p> // Show loading state
  if (error) return <p>Error fetching blog post</p> // Show error state
  if (!post) return <p>Blog not found</p> // Show message if no post is found

  return (
    <div className='single-blog-container'>
      <h1>{post.title}</h1> {/* Display blog title */}
      <div className='author-info'>
        <p>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <h3>Post By "{post.user.username}"</h3> {/* Display author's name */}
      </div>
      <div className='post-content'>
        <p>{post.content}</p> {/* Display the content of the blog */}
      </div>
      {post.image && (
        <div className='post-image'>
          <img src={post.image} alt={post.title} />
        </div>
      )}

      {/* Comments Section */}
      <div className='comments-section'>
        <h2>Comments</h2>
        {/* Display comments */}
        <BlogComments blogId={blogId} blogOwnerId={post.user._id} />
        {/* Add Comment Form */}
        {userInfo && (
          <AddComment blogId={blogId} onCommentAdded={onCommentAdded} />
        )}
      </div>
    </div>
  )
}

export default SingleBlog
