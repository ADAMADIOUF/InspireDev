import React from 'react'
import { useParams, Link } from 'react-router-dom' 
import { useGetPostsQuery } from '../slices/blogApiSlice' 

const SearchPage = () => {
  const { keyword } = useParams() 
  const { data: posts, error, isLoading } = useGetPostsQuery(keyword)

  if (error && !isLoading && !posts) {
    return (
      <div>
        <p>blog or post not found.</p>
        <Link to='/'> Back to Home</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>

    
      {isLoading && <p>Loading...</p>}

      

    
      {!isLoading && posts && posts.length > 0 && (
        <div className='search-results section-center'>
          <ul>
            {posts.map((post) => (
              <li key={post._id} className='search-result-item'>
                <div className='post-image'>
                  <img src={post.image} alt={post.title} />
                </div>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 150)}...</p>{' '}
                
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
