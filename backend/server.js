// const express = require('express')
// const products = require('./data/products')
// const cors = require('cors')
// const dotenv = require('dotenv')
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()
connectDB()
const app = express()

// app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/', (req, res) => {
  res.send('API running')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`.yellow
      .bold
  )
)