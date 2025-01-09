import React from 'react'

const About = () => {
  return (
    <div className='about-container'>
      <section className='about-header'>
        <h1>About Us</h1>
        <p>
          We are a passionate team dedicated to delivering the best products and
          services to help you achieve your goals. Our journey has been fueled
          by innovation, dedication, and a drive to make a positive impact in
          the world.
        </p>
      </section>

      <section className='about-story'>
        <h2>Our Story</h2>
        <p>
          We started our journey with a vision to create innovative solutions
          that make a real difference in people's lives. Over the years, we have
          built a strong foundation based on trust, integrity, and a commitment
          to excellence. From humble beginnings, we've grown into a dynamic
          organization that values creativity and collaboration.
        </p>
      </section>

      <section className='about-mission'>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality services and products that
          solve real-world problems. We strive to exceed expectations and
          deliver impactful results for our clients. By embracing challenges, we
          continue to innovate and bring value to communities worldwide.
        </p>
      </section>

      <section className='about-vision'>
        <h2>Our Vision</h2>
        <p>
          To be a global leader in our industry, recognized for our commitment
          to innovation, quality, and customer satisfaction. We envision a
          future where our solutions empower individuals and organizations to
          achieve greatness.
        </p>
      </section>

      <section className='about-values'>
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Integrity:</strong> We uphold the highest standards of
            honesty and transparency.
          </li>
          <li>
            <strong>Innovation:</strong> We embrace creativity and continuously
            seek new ways to improve.
          </li>
          <li>
            <strong>Excellence:</strong> We deliver superior quality in
            everything we do.
          </li>
          <li>
            <strong>Collaboration:</strong> We believe in the power of teamwork
            to achieve great results.
          </li>
          <li>
            <strong>Customer Focus:</strong> Your satisfaction is our priority.
          </li>
        </ul>
      </section>

      <section className='about-team'>
        <h2>Meet Our Team</h2>
        <p>
          Our team consists of passionate and talented individuals dedicated to
          achieving our shared goals. Together, we bring a wealth of experience
          and expertise to the table.
        </p>
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
          <div className='team-member'>
            <img
              src='https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='Team Member'
            />
            <h3>Susan White</h3>
            <p>Marketing Specialist</p>
          </div>
        </div>
      </section>

      <section className='about-achievements'>
        <h2>Our Achievements</h2>
        <ul>
          <li>Over 10,000 satisfied clients worldwide.</li>
          <li>Recipient of the Industry Innovation Award 2023.</li>
          <li>Launched over 50 successful projects in the past year.</li>
          <li>Certified as a Great Place to Work for 5 consecutive years.</li>
        </ul>
      </section>

      <section className='about-sustainability'>
        <h2>Our Commitment to Sustainability</h2>
        <p>
          We are committed to reducing our environmental impact by adopting
          sustainable practices in every aspect of our operations. From using
          eco-friendly materials to supporting green initiatives, we are
          dedicated to creating a better future for our planet.
        </p>
      </section>

      <section className='about-community'>
        <h2>Community Involvement</h2>
        <p>
          Giving back is an integral part of our culture. We support local
          communities by volunteering, donating to charitable causes, and
          providing opportunities for education and growth.
        </p>
      </section>

      <section className='about-contact'>
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! Reach out to us through our contact form
          or follow us on social media.
        </p>
        <ul className='social-links'>
          <li>
            <a href='#'>Facebook</a>
          </li>
          <li>
            <a href='#'>Twitter</a>
          </li>
          <li>
            <a href='#'>LinkedIn</a>
          </li>
          <li>
            <a href='#'>Instagram</a>
          </li>
        </ul>
      </section>

      <section className='about-faqs'>
        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>Q:</strong> What services do you offer? <br />{' '}
            <strong>A:</strong> We provide a wide range of services, including
            web development, marketing, and design solutions.
          </li>
          <li>
            <strong>Q:</strong> How can I work with you? <br />{' '}
            <strong>A:</strong> Reach out to us via our contact page or email us
            at info@example.com.
          </li>
          <li>
            <strong>Q:</strong> Do you support remote collaboration? <br />{' '}
            <strong>A:</strong> Yes, we work with clients worldwide using the
            latest collaboration tools.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
