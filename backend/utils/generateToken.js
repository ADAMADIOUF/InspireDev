import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  // Generate a token with the userId and a 30-day expiration
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_INSPIRED_DEV, {
    expiresIn: '30d',
  })

  // Set the token as a secure cookie in the response
  res.cookie('jwt', token, {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript (for security)
    secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
    sameSite: 'strict', // Prevents cross-site request forgery (CSRF) attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  })
}

export default generateToken
