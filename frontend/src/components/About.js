import React from 'react'

const About = () => {
  return (
    <div className='about-container'>
      <section className='about-header'>
        <h1>About Us</h1>
        <p>
          We are a passionate team dedicated to delivering the best products and
          services to help you achieve your goals.
        </p>
      </section>

      <section className='about-story'>
        <h2>Our Story</h2>
        <p>
          We started our journey with a vision to create innovative solutions
          that make a real difference in people's lives. Over the years, we have
          built a strong foundation based on trust, integrity, and a commitment
          to excellence.
        </p>
      </section>

      <section className='about-mission'>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality services and products that
          solve real-world problems. We strive to exceed expectations and
          deliver impactful results for our clients.
        </p>
      </section>

      <section className='about-team'>
        <h2>Meet Our Team</h2>
        <div className='team-members'>
          <div className='team-member'>
            <img
              src='https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='Team Member'
            />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className='team-member'>
            <img
              src='https://images.pexels.com/photos/7606047/pexels-photo-7606047.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='Team Member'
            />
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
          </div>
          <div className='team-member'>
            <img
              src='https://images.pexels.com/photos/6266273/pexels-photo-6266273.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='Team Member'
            />
            <h3>Mark Lee</h3>
            <p>Designer</p>
          </div>
        </div>
      </section>

      <section className='about-contact'>
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! Reach out to us through our contact form
          or follow us on social media.
        </p>
      </section>
    </div>
  )
}

export default About
