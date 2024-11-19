import React from 'react'

const Hero = () => {
  return (
    <div>
      <section className='hero'>
        <div className='hero-content'>
          <h1>
            Welcome to <span>Inspire Dev</span>
          </h1>
          <p>
            Breaking into tech is the best choice. Start your journey with us
            today.
          </p>
          <div className='cta-buttons'>
            <button className='btn primary'>Get Started</button>
            <button className='btn secondary'>Explore Blogs</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
