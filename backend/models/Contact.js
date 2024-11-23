import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
)

contactSchema.post('save', async function (doc) {
  const emailOptions = {
    to: 'adamadiouf2017@gmail.com', // Replace with recipient's email address
    subject: 'New Contact Form Submission',
    message: `
      First Name: ${doc.firstName}
      Email: ${doc.email}
      Description: ${doc.description}
     
    `,
  }

  try {
    await sendEmail(emailOptions)
    console.log('Notification email sent successfully.')
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
