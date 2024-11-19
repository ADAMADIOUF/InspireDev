import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa' // Import the icons

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h4>About Us</h4>
          <p>
            We are a passionate team dedicated to providing the best services
            and resources to help you succeed in your goals.
          </p>
        </div>

        <div className='footer-section'>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/services'>Services</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>Follow Us</h4>
          <div className='social-icons'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'
            >
              <FaTwitter />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'
            >
              <FaLinkedinIn />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='social-icon'
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>
          &copy; {new Date().getFullYear()} Absa Tech. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
