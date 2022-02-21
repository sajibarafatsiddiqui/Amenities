import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { products, product, userAuth } from '../controller.js'

const router = express.Router()

router.route('/').get(products)
router.route('/:id').get(product)

export default router
