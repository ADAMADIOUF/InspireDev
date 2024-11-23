import asyncHandler from '../middleware/asyncHandler.js'
import Contact from '../models/Contact.js'
const contactFormData = asyncHandler(async (req, res) => {
  const { firstName, email, description,  } = req.body

  try {
    const contact = new Contact({
      firstName,
      email,
      description,
    })
    const savedContact = await contact.save()

    res.status(201).json({
      success: true,
      data: savedContact,
    })
  } catch (error) {
    console.error('Error saving contact form data:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

export { contactFormData }
