import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/User.js'

// Protect middleware to ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check if token is in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    // Or check if token is in cookies
    token = req.cookies.jwt
  }

  if (!token) {
    console.log('No token found in headers or cookies')
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_INSPIRED_DEV)
    req.user = await User.findById(decoded.userId).select('-password')
    next()
  } catch (error) {
    console.log('Token verification failed', error)
    res.status(401)
    throw new Error('Not authorized, token failed')
  }
})

// Admin middleware to restrict access to admin users only
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log(`User with ID: ${req.user._id} is admin`)
    next()
  } else {
    console.log(`User with ID: ${req.user._id} is not admin`)
    res.status(401)
    throw new Error('Not authorized as Admin')
  }
}

export { admin, protect }
