import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

const app = express()

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)

const port = process.env.PORT
app.listen(port, () => console.log('server listeingin in port 5000'))