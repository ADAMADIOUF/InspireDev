import React from 'react'
import { FaUserPlus, FaPen, FaLightbulb } from 'react-icons/fa'

const HowItsWorkPage = () => {
  return (
    <div>
      <section className='how-it-works'>
        <h2>How It Works</h2>
        <p>
          Joining Inspire Dev is simple! Follow these easy steps to start your
          journey:
        </p>

        <div className='steps'>
          <div className='step'>
            <span className='step-number'>1</span>
            <FaUserPlus className='step-icon' />
            <h3>Create an Account</h3>
            <p>
              Sign up to join our vibrant tech community. It's free and easy!
              Just provide your details, and you’ll get instant access to the
              platform.
            </p>
          </div>

          <div className='step'>
            <span className='step-number'>2</span>
            <FaPen className='step-icon' />
            <h3>Write & Share</h3>
            <p>
              Once you're logged in, start writing your blogs and sharing your
              experiences. Whether it's a tutorial, project showcase, or
              personal insights, the community is eager to read and learn from
              you.
            </p>
          </div>

          <div className='step'>
            <span className='step-number'>3</span>
            <FaLightbulb className='step-icon' />
            <h3>Get Inspired</h3>
            <p>
              Learn from others and grow your skills. Our platform offers a
              wealth of resources, tutorials, and blogs from developers at every
              stage of their journey.
            </p>
          </div>
        </div>

        <section className='additional-info'>
          <h3>Additional Benefits</h3>
          <ul>
            <li>Join coding challenges and hackathons to test your skills.</li>
            <li>
              Access to an exclusive library of tech resources, tutorials, and
              templates.
            </li>
            <li>
              Regular webinars, workshops, and meetups hosted by industry
              experts.
            </li>
            <li>
              Become part of a global community of developers committed to
              learning and growing together.
            </li>
          </ul>
        </section>
      </section>
    </div>
  )
}

export default HowItsWorkPage
