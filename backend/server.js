import express from 'express'
import path from "path"
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import uploaduserRoute from './routes/uploaduserRoute.js'
import blogRoutes from './routes/blogRoute.js'


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
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(port, () => console.log(`the server running at port ${port}`))