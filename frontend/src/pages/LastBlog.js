import React from 'react'
import { useGetPostsQuery } from '../slices/blogApiSlice'

const LastBlog = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading blogs.</p>
  }

  return (
    <div>
      <section className='latest-blogs'>
        <h2>Latest Blogs</h2>
        <div className='blog-grid'>
          {posts && posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
              <div key={post._id} className='blog-card'>
                {/* Replace this with actual image URL if available */}
                <img
                  src={post.image || 'path/to/default-image.jpg'}
                  alt={post.title}
                />
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 150)}...</p>{' '}
                {/* Display a truncated version of content */}
                <a href={`/blog/${post._id}`} className='btn'>
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default LastBlog
