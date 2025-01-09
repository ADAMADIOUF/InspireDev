import axios from 'axios'
import crypto from 'crypto'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js' // Your JWT generation function
import asyncHandler from '../middleware/asyncHandler.js'
// Function to verify the Google ID token
const verifyGoogleIdToken = async (token) => {
  try {
    // Fetch Google's public keys
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/certs'
    )

    // Decode the token header to extract the `kid` (key ID)
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[0], 'base64').toString()
    )
    const kid = decodedToken.kid

    // Find the key that matches the `kid` from the public keys
    const key = data.keys.find((key) => key.kid === kid)
    if (!key)
      throw new Error('Unable to find the public key for token verification.')

    // Construct the public key
    const pubKey = crypto.createPublicKey({
      key: `-----BEGIN PUBLIC KEY-----\n${key.x5c[0]}\n-----END PUBLIC KEY-----`,
      format: 'pem',
    })

    // Verify the token signature
    const verify = crypto.createVerify('RSA-SHA256')
    verify.update(token.split('.')[0] + '.' + token.split('.')[1])
    const isValid = verify.verify(pubKey, token.split('.')[2], 'base64')

    if (!isValid) {
      throw new Error('Invalid token signature')
    }

    return decodedToken
  } catch (error) {
    console.error('Error verifying Google ID token:', error)
    throw new Error('Google login failed')
  }
}

export  const googleLoginHandler = asyncHandler(async (req, res) => {
  const { token } = req.body

  try {
    // Verify the ID token
    const payload = await verifyGoogleIdToken(token)

    // Check if the user already exists by Google ID
    let user = await User.findOne({ googleId: payload.sub })

    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        googleId: payload.sub,
        username: payload.name,
        email: payload.email,
        image: payload.picture,
        isVerified: true, // For Google login, user is verified
      })
      await user.save()
    }

    // Generate a JWT token
    generateToken(res, user._id)

    // Respond with user data and a success message
    res.json({
      message: 'User logged in with Google successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    })
  } catch (error) {
    res.status(400).json({ message: 'Google login failed', error })
  }
})


