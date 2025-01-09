import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../models/User.js' // Replace with the correct path to your User model
import { google } from 'googleapis'

const router = express.Router()

// Generate Google Login URL
router.get('/google-url', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.BACKEND_URL}/auth/google/callback&scope=email%20profile`
  res.json({ url })
})

// Google OAuth callback (Used to complete OAuth flow)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user) // Debugging log

    // Store user information in session or use JWT tokens
    req.session.user = req.user // Store authenticated user in session (if using session-based authentication)

    res.redirect(`${process.env.FRONTEND_URL}/`) // Redirect after login
  }
)

// Google Login Mutation (POST request handling)
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body // The token received from the frontend (e.g., Google login token)

  if (!tokenId) {
    return res.status(400).json({ message: 'Token is required' })
  }

  try {
    // Verify the Google token
    const client = new google.auth.OAuth2()
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the Google Client ID
    })

    const payload = ticket.getPayload()

    // Check if the user exists in the database
    let user = await User.findOne({ googleId: payload.sub })
    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      })
      await user.save()
    }

    // Create a JWT token for the user after successful authentication
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_INSPIRED_DEV,
      {
        expiresIn: '1h',
      }
    )

    // Respond with the user data and token
    res.status(200).json({ user, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to authenticate with Google' })
  }
})

export default router
