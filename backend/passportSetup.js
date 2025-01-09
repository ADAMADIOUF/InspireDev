import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import User from './models/User.js' // Ensure your User model is imported
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export default function passportSetup() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google profile:', profile) // Debug the profile object

          let user = await User.findOne({ googleId: profile.id })

          if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0]?.value || 'default-image-url.jpg', // Fallback image
            })
            await user.save()
          }

          done(null, user) // Pass the user to the next step
        } catch (error) {
          console.error('Error during authentication:', error)
          done(error, false)
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
