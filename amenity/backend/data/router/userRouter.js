import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { userAuth, getUserProfile, createUser } from '../controller.js'
import { jsonTokenProvider } from '../../middleware/jsonTokenProvider.js'

const router = express.Router()
router.route('/').post(createUser)
router.post('/login', userAuth)
router.route('/login/profile').get(jsonTokenProvider, getUserProfile)

export default router
