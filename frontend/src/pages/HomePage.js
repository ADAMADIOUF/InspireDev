import React from 'react'
import GetPost from './GetPost'
import Hero from '../components/Hero'
import FeaturedBlogs from './FeaturedBlogs'
import LastBlog from './LastBlog'

import Testimonial from '../components/Testimonial'
import AboutPage from './AboutPage'
import HowItsWorkPage from './HowItsWorkPage'
import FeaturedPage from './FeaturedPage'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutPage />
      <FeaturedPage />
      <FeaturedBlogs />

      <HowItsWorkPage />

      <LastBlog />

      <section className='stats'>
        <h2>Our Achievements</h2>
        <div className='stats-grid'>
          <div className='stat-item'>
            <h3>10K+</h3>
            <p>Blogs Published</p>
          </div>
          <div className='stat-item'>
            <h3>5K+</h3>
            <p>Active Users</p>
          </div>
          <div className='stat-item'>
            <h3>500+</h3>
            <p>Learning Resources</p>
          </div>
        </div>
      </section>

      <GetPost />

      <section className='cta'>
        <h2>Start Your Journey with Inspire Dev</h2>
        <p>Sign up today and begin sharing your knowledge with the world!</p>
        <a href='/register' className='btn'>
          Get Started
        </a>
      </section>
      <Testimonial />
    </div>
  )
}

export default HomePage
