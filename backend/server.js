import express from 'express'
import path from "path"
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoute from './routes/userRoute.js'
import uploaduserRoute from './routes/uploaduserRoute.js'
import blogRoutes from './routes/blogRoute.js'

import commentRoutes from './routes/commentRoute.js'
import contactRoute from './routes/contactRoute.js'
const app = express()
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
connectDB()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', userRoute)
app.use(`/api/upload`, uploaduserRoute)
app.use('/api/blogs', blogRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/form/contact', contactRoute)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`the server running at port ${port}`))