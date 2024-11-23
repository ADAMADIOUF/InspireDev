import React from 'react'
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaTools,
  FaBookOpen,
  FaGraduationCap,
  FaShoppingCart,
} from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaCode />,
      title: 'Web Development',
      description:
        'We build responsive, high-performance websites tailored to your business needs.',
    },
    {
      id: 2,
      icon: <FaLaptopCode />,
      title: 'Front-End Development',
      description:
        'Crafting visually stunning user interfaces that deliver exceptional user experiences.',
    },
    {
      id: 3,
      icon: <FaMobileAlt />,
      title: 'Mobile App Development',
      description:
        'Building sleek and functional mobile applications for Android and iOS platforms.',
    },
    {
      id: 4,
      icon: <FaCloud />,
      title: 'Cloud Integration',
      description:
        'Seamlessly integrating your applications with cloud-based solutions.',
    },
    {
      id: 5,
      icon: <FaTools />,
      title: 'Maintenance & Support',
      description:
        'Offering ongoing support to ensure your applications run smoothly and efficiently.',
    },
    {
      id: 6,
      icon: <FaBookOpen />,
      title: 'Publish Your Blog',
      description:
        'Developers and engineers can share their expertise by publishing technical blogs on our platform.',
    },
    {
      id: 7,
      icon: <FaGraduationCap />,
      title: 'Courses for Students',
      description:
        'A wide range of courses designed for aspiring developers and engineers to build and enhance their skills.',
    },
    {
      id: 8,
      icon: <FaShoppingCart />,
      title: 'Sell and Buy Courses',
      description:
        'A marketplace for educators to sell their courses and for students to buy resources to learn new skills.',
    },
  ]

  return (
    <section className='services-container'>
      <div className='services-header'>
        <h1>Our Services</h1>
        <p>
          At Inspire Dev, we offer a range of services to help bring your ideas
          to life, support your career growth, and drive your business forward.
        </p>
      </div>
      <div className='services-grid'>
        {services.map((service) => (
          <div className='service-card' key={service.id}>
            <div className='service-icon'>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
