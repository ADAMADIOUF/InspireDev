import React from 'react'
import { useParams, useNavigate } from 'react-router-dom' // For URL params and navigation
import { useGetPostsQuery } from '../slices/blogApiSlice' // Your slice

const SearchPage = () => {
  const { keyword } = useParams() // Get the search keyword from the URL
  const { data: posts, error, isLoading } = useGetPostsQuery(keyword) // Fetch posts based on the keyword
  const navigate = useNavigate() // Hook for navigation

  const handleBackHome = () => {
    navigate('/') // Navigate back to home page
  }

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching blogs</p>}

      {/* Display message if no posts are found */}
      {posts && posts.length === 0 && !isLoading && (
        <div>
          <p>Blog not found for "{keyword}".</p>
          <button onClick={handleBackHome} className='btn btn-primary'>
            Back to Home
          </button>
        </div>
      )}

      {/* Display posts if found */}
      {posts && posts.length > 0 && (
        <div className='search-results'>
          <ul>
            {posts.map((post) => (
              <li key={post._id} className='search-result-item'>
                <div className='post-image'>
                  <img src={post.image} alt={post.title} />
                </div>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 150)}...</p>{' '}
                {/* Show the first 150 characters of content */}
                <p>
                  <strong>Published on:</strong>{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <a href={`/blog/${post._id}`} className='read-more'>
                  Read more
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchPage
