import express from 'express'
import Product from '../model/productModel.js'
import User from '../model/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const products = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const product = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  //response status in json
  product
    ? res.json(product)
    : res.status(404).json({ message: 'product not found' })
})

const userAuth = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email)
  const user = await User.findOne({ email })
  console.log(user)
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid User/Password')
  }
})

const getUserProfile = expressAsyncHandler(async (req, res) => {
  res.send('hello')
})

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })
  console.log(user)
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid User/Password')
  }
})

export { products, product, userAuth, getUserProfile, createUser }
