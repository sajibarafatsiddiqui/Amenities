import products from './products.js'
import users from './user.js'
import connectDB from '../db/connectDb.js'
import Order from '../model/orderModel.js'
import Product from '../model/productModel.js'
import User from '../model/userModel.js'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()
connectDB()
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createUsers = await User.insertMany(users)
    const adminUser = createUsers[0]._id

    const createProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(createProducts)
    console.log('data inserted'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`data failed ${error.message}`.red.inverse)
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    process.exit()
  } catch (error) {
    process.exit(1)
  }
}

process.argv[2] === '-d' ? deleteData() : importData()
