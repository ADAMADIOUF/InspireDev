import User from '../models/User.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../mailtrap/mailtrap.js'
const generateNumericCode = (length) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}
// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exits')
  }

  const verificationCode = generateNumericCode(6)
  const user = await User.create({
    username,
    email,
    password,
    verificationToken: verificationCode,
    verificationExpiresAt: Date.now() + 3600000,
  })
  if (user) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})
// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'logout successfully' })
})

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, avatar, password } = req.body

  const user = await User.findById(req.user._id)
  if (user) {
    user.username = username || user.username
    user.email = email || user.email
    user.avatar = avatar || user.avatar

    // If a new password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// Get All Users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// Get User by ID
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed successfully' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update User
export const updatedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.avatar = req.body.avatar || user.avatar
    user.role = req.body.role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  // Find the user by email
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Set reset password token and expiry time (1 hour from now)
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  user.resetPasswordExpiresAt = Date.now() + 3600000 // 1 hour

  await user.save()

  // Create reset password link
  const resetUrl = `http://localhost:3000/forgot-password/${resetToken}`

  try {
    // Send password reset email
    await sendPasswordResetEmail(user.email, resetUrl)

    res.status(200).json({ message: 'Reset link sent to your email' })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()

    res
      .status(500)
      .json({ message: 'Email could not be sent', error: error.message })
  }
})
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  // Hash the token to match the stored token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  // Find user by token and check if token has not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiresAt: { $gt: Date.now() }, // Token is still valid
  })

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' })
  }

  // Set the new password
  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpiresAt = undefined

  await user.save()

  // Send password reset success email
  await sendResetSuccessEmail(user.email)

  res
    .status(200)
    .json({ message: 'Password reset successful, you can now log in' })
})