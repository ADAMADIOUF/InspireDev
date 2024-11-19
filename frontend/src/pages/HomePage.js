import React from 'react'
import GetPost from './GetPost'
import Hero from '../components/Hero'
import FeaturedBlogs from './FeaturedBlogs'
import LastBlog from './LastBlog'
import { FaPencilAlt, FaUsers, FaGraduationCap } from 'react-icons/fa'
import Testimonial from '../components/Testimonial'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <section className='about'>
        <div className='about-container'>
          <h2>
            About <span className='highlight'>Inspire Dev</span>
          </h2>
          <p>
            Inspire Dev is a platform for developers to share knowledge, publish
            blogs, and connect with like-minded individuals in the tech
            community.
          </p>
          <p>
            Whether you're a seasoned developer or just starting, we’re here to
            inspire, educate, and grow together.
          </p>
        </div>
      </section>

      <FeaturedBlogs />

      <section className='how-it-works'>
        <h2>How It Works</h2>
        <div className='steps'>
          <div className='step'>
            <span className='step-number'>1</span>
            <h3>Create an Account</h3>
            <p>Sign up to join our vibrant tech community.</p>
          </div>
          <div className='step'>
            <span className='step-number'>2</span>
            <h3>Write & Share</h3>
            <p>Publish blogs and share your ideas with the world.</p>
          </div>
          <div className='step'>
            <span className='step-number'>3</span>
            <h3>Get Inspired</h3>
            <p>Learn from others and grow your skills.</p>
          </div>
        </div>
      </section>

      <section className='features'>
        <h2>Our Features</h2>
        <div className='features-grid'>
          <div className='feature-item'>
            <FaPencilAlt className='feature-icon' />
            <h3>Blog Writing</h3>
            <p>
              Share your ideas and experiences by writing blogs for the tech
              community.
            </p>
          </div>
          <div className='feature-item'>
            <FaUsers className='feature-icon' />
            <h3>Community</h3>
            <p>Connect with developers worldwide and exchange knowledge.</p>
          </div>
          <div className='feature-item'>
            <FaGraduationCap className='feature-icon' />
            <h3>Learning</h3>
            <p>
              Learn from detailed tutorials, guides, and resources shared by
              experts.
            </p>
          </div>
        </div>
      </section>

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
      <Testimonial/>
    </div>
  )
}

export default HomePage
