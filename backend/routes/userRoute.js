import express from 'express'
import passport from 'passport'
import pkg from 'passport-google-oauth20'
const GoogleStrategy = pkg.Strategy // Correct usage for the OAuth2Strategy constructor

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  resetPassword,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updatedUser,
  forgotPassword,
  googleLoginHandler,
  googleCallbackHandler,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import generateToken from '../utils/generateToken.js'

const router = express.Router()

// Public routes
router.post('/register', registerUser) // Anyone can register
router.post('/login', loginUser)
router.post('/password-reset', resetPassword) // Anyone can request password reset
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await googleLoginHandler(profile._json)

        // Generate a JWT token for the user
        const token = generateToken(user._id)

        done(null, { user, token }) // Pass the user and token to the callback
      } catch (error) {
        done(error, null) // Pass errors to the callback
      }
    }
  )
)

// Route for Google authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Assuming your callback handler does something like this
    const { user, token } = req.user
    res.redirect(
      `http://your-frontend-url?token=${token}&user=${JSON.stringify(user)}`
    )
  }
)

router.post('/logout', logoutUser)

// Protected routes (Requires authentication)
router.get('/profile', protect, getUserProfile) // User profile is protected
router.put('/profile', protect, updateUserProfile) // Only authenticated users can update their profile

// Admin routes (Requires both authentication and admin role)
router.get('/', protect, admin, getUsers) // Admins can view all users
router.get('/:id', protect, admin, getUserByID) // Admins can get any user by ID
router.delete('/:id', protect, admin, deleteUser) // Admins can delete any user
router.put('/:id', protect, admin, updatedUser) // Admins can update any user

export default router
