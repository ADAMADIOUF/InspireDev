import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import { toast } from 'react-toastify'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('') // Search query state
  const navigate = useNavigate() // Hook to navigate to a different route

  const handleSearch = (event) => {
    event.preventDefault()
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term')
      return
    }
    // Navigate to /search/:keyword
    navigate(`/search/${searchQuery}`)
  }

  return (
    <div>
      <section className='hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            Welcome to <span className='highlight'>Inspire Dev</span>
          </h1>
          <p className='hero-subtitle'>
            Breaking into tech is the best choice. Share your ideas, inspire
            others, and start building your future.
          </p>

          <div className='cta-buttons'>
            <Link to={`register`}>
              <button className='btn btn-primary'>Get Started</button>
            </Link>
            <Link to={`all-posts`}>
              <button className='btn btn-secondary'>Explore Blogs</button>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className='search-form'>
            <input
              type='text'
              className='search-input'
              placeholder='Search blogs or topics...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Set search query state on change
            />
            <button type='submit' className='btn btn-search'>
              Search
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Hero
