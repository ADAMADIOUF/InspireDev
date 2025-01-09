import React, { useState } from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaDownload,
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
      <div className='additional-info'>
        <h2>Find Us Here</h2>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509868!2d144.9537353153168!3d-37.81627944202179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777d7906a0b2e8!2sTech%20City!5e0!3m2!1sen!2sus!4v1626273923489!5m2!1sen!2sus'
          width='100%'
          height='400'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
        ></iframe>
      </div>

      <div className='faq'>
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>Q: What is your response time?</strong>
            <p>A: We typically respond within 24 hours.</p>
          </li>
          <li>
            <strong>Q: Can I visit your office?</strong>
            <p>A: Yes, but please schedule an appointment in advance.</p>
          </li>
        </ul>
      </div>

      <div className='resources'>
        <h2>Resources</h2>
        <a href='/brochure.pdf' download className='resource-link'>
          <FaDownload /> Download Our Brochure
        </a>
      </div>
    </section>
  )
}

export default Contact
