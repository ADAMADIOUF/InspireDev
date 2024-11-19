import React from 'react'
import { useGetPostsQuery } from '../slices/blogApiSlice'
import { Link } from 'react-router-dom'

const AllPosts = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery() // Fetching posts from the API

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading posts.</p>
  }

  return (
    <div className='section-center'>
      <h2>All Posts</h2>
      <section className='all-posts'>
        <div className='posts-grid'>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className='post-card'>
                <div className='post-image'>
                  <img src={post.image} alt={post.title} />
                </div>
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
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default AllPosts
