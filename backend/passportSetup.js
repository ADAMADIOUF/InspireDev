import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { googleLoginHandler } from './controllers/userController.js'

// Load environment variables
dotenv.config()

export default function passportSetup() {
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

  // Serialize the user to store in the session (or token)
  passport.serializeUser((user, done) => {
    done(null, user.googleId) // Serialize using googleId
  })

  // Deserialize the user to retrieve from the session
  passport.deserializeUser(async (googleId, done) => {
    try {
      const user = await User.findOne({ googleId })
      if (!user) {
        return done(new Error('User not found'), false)
      }
      done(null, user) // Return the user from the database
    } catch (error) {
      done(error, false)
    }
  })
}
