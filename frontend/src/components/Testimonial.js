import React from 'react'

const Testimonial = () => {
  const testimonials = [
    {
      name: 'John Doe',
      title: 'Software Engineer',
      image: '/images/john-doe.jpg', // Replace with actual image path
      content:
        'This platform has significantly improved my coding skills. The courses are well-structured, and the community is amazing!',
    },
    {
      name: 'Jane Smith',
      title: 'Web Developer',
      image: '/images/jane-smith.jpg', // Replace with actual image path
      content:
        'I love how detailed the tutorials are. I feel confident taking on real-world projects after completing this course.',
    },
    {
      name: 'Michael Brown',
      title: 'Data Analyst',
      image: '/images/michael-brown.jpg', // Replace with actual image path
      content:
        'The content is engaging and easy to follow. I can implement the techniques I’ve learned into my day-to-day job.',
    },
  ]

  return (
    <div className='testimonial-container'>
      <h2>What Our Users Say</h2>
      <div className='testimonial-cards'>
        {testimonials.map((testimonial, index) => (
          <div key={index} className='testimonial-card'>
            <div className='testimonial-image'>
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className='testimonial-content'>
              <p className='testimonial-text'>" {testimonial.content} "</p>
              <h4 className='testimonial-name'>{testimonial.name}</h4>
              <p className='testimonial-title'>{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
