import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'

dotenv.config()

const app = express()

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/order', orderRoutes)

app.get('/api/config/paypal',(req,res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

// This is were image upload path is definied.
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

const port = process.env.PORT
app.listen(port, () => console.log('server listeingin in port 5000'))