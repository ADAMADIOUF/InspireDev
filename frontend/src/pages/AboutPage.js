import React from 'react'
import {
  FaUsers,
  FaRegHandshake,
  FaBullhorn,
  FaNetworkWired,
} from 'react-icons/fa'
import homeAbout from "../assets/homeabout.png"
const AboutPage = () => {
  return (
    <div>
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
          <p>
            Our mission is to provide a space where developers can not only
            learn but also contribute, grow, and become part of a supportive
            community. With resources, events, and peer-driven content, we aim
            to make learning and sharing knowledge accessible to everyone.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className='video-section'>
        <div className='video-container'>
          <div className='container-video-home'>
            <article>
              <h2>Why Inspire Dev?</h2>
              <p>Our platform empowers developers by providing:</p>
              <ul>
                <li>Easy-to-follow tutorials and guides</li>
                <li>Insights from experienced developers</li>
                <li>Opportunities to network with like-minded professionals</li>
                <li>A platform for showcasing personal projects and blogs</li>
              </ul>
            </article>
            <article>
              <h2>Why Choose Inspire Dev?</h2>
              <p>
                Inspire Dev is more than just a platform—it's a thriving
                community that empowers developers to grow, learn, and
                collaborate. Here's what we offer:
              </p>
              <ul>
                <li>
                  <strong>Comprehensive Learning Resources:</strong> Access
                  detailed tutorials, coding challenges, and in-depth guides for
                  all skill levels.
                </li>
                <li>
                  <strong>Expert Insights:</strong> Learn from experienced
                  developers through blog posts, webinars, and community
                  discussions.
                </li>
                <li>
                  <strong>Networking Opportunities:</strong> Connect with other
                  developers globally through forums, events, and
                  collaborations.
                </li>
                <li>
                  <strong>Project Showcases:</strong> Share your work, get
                  feedback, and inspire others by showcasing personal projects
                  and open-source contributions.
                </li>
                <li>
                  <strong>Real-World Experience:</strong> Participate in
                  community-led projects, hackathons, and other initiatives to
                  build a strong portfolio.
                </li>
                <li>
                  <strong>Supportive Community:</strong> Join a diverse,
                  welcoming community where everyone is encouraged to help each
                  other and share knowledge.
                </li>
                <li>
                  <strong>Regular Tech Events:</strong> Attend webinars, coding
                  challenges, and workshops to stay up-to-date with the latest
                  in tech.
                </li>
                <li>
                  <strong>Career Growth:</strong> Get advice on building a
                  strong developer career, from interview tips to navigating the
                  job market.
                </li>
              </ul>
            </article>
          </div>
          <p>
            Watch the video below to learn more about how Inspire Dev is
            changing the game for developers around the world!
          </p>

          {/* Embed a YouTube Video */}
          <div className='video-wrapper'>
            <iframe
              width='100%'
              height='500'
              src='https://www.youtube.com/embed/CNsvts6pVzo?si=WVSNmdk_bgZFskPI'
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerpolicy='strict-origin-when-cross-origin'
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className='community'>
        <div className='community-container'>
          <h2>Our Community</h2>
          <p>
            At Inspire Dev, our community is our greatest asset. We bring
            together developers from all corners of the world to connect, share
            knowledge, and collaborate on exciting projects. Whether you're a
            beginner or a seasoned professional, there's a place for you here.
          </p>
          <p>
            Our members come from diverse backgrounds and areas of expertise,
            making for a vibrant, enriching, and supportive environment where
            everyone can learn and grow together. Join us and be a part of
            something bigger—your developer journey starts here.
          </p>

          <div className='community-vision'>
            <h3>What We Offer</h3>
            <div className='community-icons'>
              <div className='community-item'>
                <FaUsers className='community-icon' />
                <h4>Global Networking</h4>
                <p>
                  Connect with developers from all over the world. Whether
                  you're looking for collaborators or mentors, you'll find a
                  thriving community here.
                </p>
              </div>
              <div className='community-item'>
                <FaRegHandshake className='community-icon' />
                <h4>Collaboration & Support</h4>
                <p>
                  Our community is built on collaboration. Get feedback on your
                  projects, share tips, and find support when you need it most.
                </p>
              </div>
              <div className='community-item'>
                <FaBullhorn className='community-icon' />
                <h4>Events & Webinars</h4>
                <p>
                  Join regular tech events, webinars, and workshops to stay
                  up-to-date with the latest tools, trends, and best practices
                  in software development.
                </p>
              </div>
              <div className='community-item'>
                <FaNetworkWired className='community-icon' />
                <h4>Learning & Growth</h4>
                <p>
                  Whether you're learning new skills or advancing your career,
                  Inspire Dev is here to help you grow. Share your knowledge and
                  learn from others.
                </p>
              </div>
            </div>
          </div>

          <section className='community-impact'>
            <h3>Join a Thriving Developer Network</h3>
            <div className='community-content'>
              <p>
                By joining Inspire Dev, you're not just becoming part of a
                platform—you're entering a community of driven and passionate
                developers who are changing the world of technology. We help
                each other tackle challenges, celebrate wins, and push the
                boundaries of what's possible.
              </p>
              <img
                src={homeAbout}
                alt='Community Collaboration'
                className='community-image'
              />
            </div>
          </section>

          
        </div>
      </section>

      {/* Join Us Section */}
      <section className='join-us'>
        <div className='join-us-container'>
          <h2>Join Our Developer Community</h2>
          <p>
            Ready to become part of the Inspire Dev community? Sign up today and
            start sharing your knowledge, writing blogs, and connecting with
            other developers.
          </p>
          <a href='/register' className='btn'>
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
