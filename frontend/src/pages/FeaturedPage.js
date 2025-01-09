import React from 'react'
import { FaGraduationCap, FaPencilAlt, FaUsers } from 'react-icons/fa'

const FeaturedPage = () => {
  return (
    <div>
      <section className='features'>
        <h2>Our Features</h2>
        <p className='features-intro'>
          Inspire Dev provides developers with everything they need to learn,
          connect, and share. Check out our core features:
        </p>

        <div className='features-grid'>
          <div className='feature-item'>
            <FaPencilAlt className='feature-icon' />
            <h3>Blog Writing</h3>
            <p>
              Share your thoughts, tutorials, and experiences by writing blogs
              for the tech community. Our easy-to-use blog editor makes it
              simple to get your ideas out there. Whether you're sharing
              knowledge about a new framework or providing career advice, your
              voice matters!
            </p>
            <ul>
              <li>Write and publish blogs instantly</li>
              <li>Get feedback from peers and experts</li>
              <li>Boost your visibility and establish your expertise</li>
            </ul>
          </div>

          <div className='feature-item'>
            <FaUsers className='feature-icon' />
            <h3>Community</h3>
            <p>
              Join our global network of developers. Whether you're a beginner
              or a seasoned pro, you’ll find opportunities to collaborate,
              learn, and grow. Participate in forums, group discussions, and
              events to build lasting professional relationships.
            </p>
            <ul>
              <li>Connect with developers from all over the world</li>
              <li>Participate in group discussions and tech meetups</li>
              <li>Exchange ideas and solutions with peers</li>
            </ul>
          </div>

          <div className='feature-item'>
            <FaGraduationCap className='feature-icon' />
            <h3>Learning</h3>
            <p>
              Take your skills to the next level with a vast collection of
              tutorials, courses, and guides from industry experts. Whether
              you’re looking to learn a new programming language or deepen your
              knowledge in specific technologies, we’ve got you covered.
            </p>
            <ul>
              <li>Access in-depth tutorials and coding challenges</li>
              <li>Learn from top-tier developers and thought leaders</li>
              <li>Stay updated with the latest trends in technology</li>
            </ul>
          </div>
        </div>

        <section className='why-choose-us'>
          <h3>Why Choose Inspire Dev?</h3>
          <p>
            Our platform empowers developers by providing a comprehensive space
            to learn, share, and grow. Here's why you'll love it:
          </p>
          <ul>
            <li>Curated content by experienced developers</li>
            <li>Real-time feedback from the community</li>
            <li>
              Dedicated support and resources for every level of developer
            </li>
            <li>Opportunities for career advancement and personal growth</li>
          </ul>
        </section>

        <section className='testimonials'>
          <h3>What Our Users Say</h3>
          <div className='testimonial-item'>
            <p>
              "Inspire Dev has been a game-changer for my career. The
              blog-writing feature helped me build my personal brand, and the
              community is incredibly supportive!"
            </p>
            <span>- John Doe, Full-Stack Developer</span>
          </div>
          <div className='testimonial-item'>
            <p>
              "The learning resources here are amazing! I’ve been able to
              upskill in React and Node.js, and I’ve learned so much from the
              tutorials and challenges."
            </p>
            <span>- Jane Smith, Front-End Developer</span>
          </div>
        </section>
      </section>
    </div>
  )
}

export default FeaturedPage
