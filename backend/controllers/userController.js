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
  const { email, username, password, role } = req.body;

  if (!email || !username || !password) {
    res.status(400);
    throw new Error('All fields (email, username, password) are required');
  }

  // Check if the user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Set role to 'user' or 'admin'
  const userRole = role === 'admin' ? 'admin' : 'user';

  // Generate verification code
  const verificationCode = generateNumericCode(6);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: userRole,
    verificationToken: verificationCode,
    verificationExpiresAt: Date.now() + 3600000, // 1 hour expiration
  });

  if (user) {
    generateToken(res, user._id); // Generate token on successful registration
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('User creation failed');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate token after successful login
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
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
  // If the user is logged in with Google, their Google ID will likely be stored in req.user
  const user =
    (await User.findOne({ googleId: req.user.googleId })) ||
    (await User.findById(req.user._id))

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



// Update User Profile
// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, image, password } = req.body;

  const user = await User.findById(req.user._id);
  if (user) {
    // Check if the user logged in with Google
    if (user.googleId) {
      return res.status(400).json({ message: 'Google login users cannot update email or username.' });
    }

    // Update the fields if provided
    user.username = username || user.username;
    user.email = email || user.email;
    user.image = image || user.image;

    // If a new password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

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
      image: user.image,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(`Attempting to delete user with ID: ${id}`)

  const user = await User.findById(id)
  if (!user) {
    console.log(`User with ID: ${id} not found in the database`)
    res.status(404)
    throw new Error('User not found')
  }

  console.log('User found:', user)

  // Explicitly use deleteOne
  const result = await User.deleteOne({ _id: id })
  console.log('Deletion result:', result)

  if (result.deletedCount === 0) {
    res.status(500)
    throw new Error('User not deleted')
  }

  res.json({ message: 'User removed successfully' })
})

// Update User
export const updatedUser = asyncHandler(async (req, res) => {
  // Check if the user making the request is an admin
  if (req.user && req.user.role !== 'admin') {
    res.status(401)
    throw new Error('Not authorized, admin role required')
  }

  // Find the user by ID from the request parameters
  const user = await User.findById(req.params.id)

  if (user) {
    // Update the user's details if they exist
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.image = req.body.image || user.image
    user.role = req.body.role || user.role // Update the role field

    // Save the updated user
    const updatedUser = await user.save()

    // Respond with the updated user details
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      role: updatedUser.role, // Return the updated role
    })
  } else {
    // If the user is not found, return a 404 error
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
  const resetUrl = `https://inspiredev.onrender.com/reset-password/${resetToken}`

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

export const googleLoginHandler = asyncHandler(async (googleProfile) => {
  try {
    const { id, email, name, picture } = googleProfile

    // Check if the user exists
    let user = await User.findOne({ googleId: id })

    if (!user) {
      // If the user doesn't exist, create a new one
      user = await User.create({
        googleId: id,
        email,
        username: name,
        avatar: picture,
        isVerified: true,
        role: email === 'admin@example.com' ? 'admin' : 'user',
      })
    }

    return user // Return the user object
  } catch (error) {
    console.error('Error during Google login:', error)
    throw new Error('Error during Google login')
  }
})
export const googleCallbackHandler = (req, res) => {
  try {
    const { user } = req.user // Extract the user object

    // Generate a JWT token for the authenticated user
    const token = generateToken(user._id)

    // Redirect to frontend with the token
    res.redirect(`http://localhost:3000?token=${token}`)
  } catch (error) {
    console.error('Error in Google callback handler:', error)
    res.status(500).send('Internal Server Error')
  }
}