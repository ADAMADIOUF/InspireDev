import React from 'react'
import { useGetPostsQuery } from '../slices/blogApiSlice'
import { Link } from 'react-router-dom' // Import Link for navigation

const FeaturedBlogs = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading blogs.</p>
  }

  return (
    <div>
      <section className='featured-blogs'>
        <h2>Featured Blogs</h2>
        <div className='blogs-grid'>
          {posts && posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
              <div key={post._id} className='blog-card'>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 150)}...</p>{' '}
                {/* Display a truncated version of content */}
                <Link to={`/blog/${post._id}`} className='btn btn-primary'>
                  Read More
                </Link>{' '}
                {/* Link to the detailed blog post */}
              </div>
            ))
          ) : (
            <p>No featured blogs available.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default FeaturedBlogs
