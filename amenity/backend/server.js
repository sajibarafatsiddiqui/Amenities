import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './db/connectDb.js'
import colors from 'colors'
import productRouter from './data/router/productRouter.js'
import userRouter from './data/router/userRouter.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/user', userRouter)

app.use((req, res, next) => {
  const err = new Error(`Not found -${req.originalUrl}`)
  res.status(404)
  next(err)
})
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode
  res.status(status)
  res.json({
    message: err.message,
    stack: process.env.N0DE_MODULE === 'production' ? null : err.stack,
  })
})
const port = process.env.PORT || 5000
app.listen(port, console.log('server is running'.bgBlue))
