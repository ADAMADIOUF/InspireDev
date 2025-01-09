import express from 'express'
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
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/register', registerUser) // Anyone can register
router.post('/login', loginUser) 
router.post('/password-reset', resetPassword) // Anyone can request password reset

// Protected routes (Requires authentication)
router.post('/logout', logoutUser) // User must be authenticated
router.get('/profile', protect, getUserProfile) // User profile is protected
router.put('/profile', protect, updateUserProfile) // Only authenticated users can update their profile

// Admin routes (Requires both authentication and admin role)
router.get('/', protect, admin, getUsers) // Admins can view all users
router.get('/:id', protect, admin, getUserByID) // Admins can get any user by ID
router.delete('/:id', protect, admin, deleteUser) // Admins can delete any user
router.put('/:id', protect, admin, updatedUser) // Admins can update any user
router.post('/forgot-password', forgotPassword) 
router.put('/reset-password/:token', resetPassword)

export default router
