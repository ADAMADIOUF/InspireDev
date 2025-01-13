import express from 'express';
import path from 'path';
import passport from 'passport'; 
import cookieParser from 'cookie-parser';
import session from 'express-session'; // Import express-session
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoute from './routes/userRoute.js';
import uploaduserRoute from './routes/uploaduserRoute.js';
import blogRoutes from './routes/blogRoute.js';
import commentRoutes from './routes/commentRoute.js';
import contactRoute from './routes/contactRoute.js';
import passportSetup from './passportSetup.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();  // Initialize dotenv to use environment variables

const app = express();
connectDB();  // Connect to the database

const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session and Passport setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true, // Prevent client-side JS from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport setup (ensure this function is correctly setting up passport strategies)
passportSetup();

// Routes

app.use('/api/users', userRoute);
app.use('/api/upload', uploaduserRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/form/contact', contactRoute);

// Serve static files (uploads)
const __dirname = path.resolve(); // Use path.resolve to get the current directory in ES Modules
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Production build setup (if running in production, serve the frontend build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`The server is running at port ${port}`));
