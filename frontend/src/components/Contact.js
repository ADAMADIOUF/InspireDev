import React, { useState } from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa'
import { useSendContactFormMutation } from '../slices/contactSlice'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    description: '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        First Name: ${formData.firstName}
        Email Address: ${formData.email}
        Description: ${formData.description}`
      setIsFormSubmitted(true)
      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      // Reset form data after submission
      setFormData({
        firstName: '',
        email: '',
        description: '',
      })

      // Reset the submission status after 10 seconds
      setTimeout(() => {
        setIsFormSubmitted(false)
      }, 10000) // 10000ms = 10 seconds
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <section className='contact-container'>
      <div className='contact-header'>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Reach out to us using the form below or
          through our contact details.
        </p>
      </div>
      <div className='contact-content'>
        {/* Contact Details */}
        <div className='contact-info'>
          <h2>Get in Touch</h2>
          <div className='info-item'>
            <FaPhoneAlt className='info-icon' />
            <p>+1 (701) 500-3259</p>
          </div>
          <div className='info-item'>
            <FaEnvelope className='info-icon' />
            <p>info@inspiredev.com</p>
          </div>
          <div className='info-item'>
            <FaMapMarkerAlt className='info-icon' />
            <p>123 Inspire Dev Street, Tech City, USA</p>
          </div>
          <div className='social-links'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebookF />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTwitter />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className='contact-form'>
          <h2>Send Us a Message</h2>
          {!isFormSubmitted && (
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  name='firstName'
                  placeholder='Your Name & Last Name'
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  name='email'
                  placeholder='Your Email'
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className='form-group'>
                <textarea
                  name='description'
                  rows='5'
                  placeholder='Your Message'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <button type='submit' className='submit-btn' disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
              {isError && (
                <div className='error-message'>
                  An error occurred while submitting the form. Please try again.
                </div>
              )}
            </form>
          )}
          {isFormSubmitted && !isError && (
            <div className='success-message'>
              Message sent successfully! We will get back to you soon.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
