import jsonwebtoken from 'jsonwebtoken'
import User from '../model/userModel.js'
import expressAsyncHandler from 'express-async-handler'

export const jsonTokenProvider = expressAsyncHandler(async (req, res, next) => {
  let token_key = req.headers.authorization
  console.log(token_key)
  if (token_key && token_key.split(' ')[0] === 'Bearer') {
    try {
      let token = token_key.split(' ')[1]
      console.log(token)

      const decode = jsonwebtoken.verify(token, process.env.JWS_SECRET_KEY)

      console.log(decode)
      const user = await User.findById(decode.id).select('-password')
      console.log(user)
      next()
    } catch (err) {
      console.error(err)
      res.status(401)
      throw new Error('Invalid Token')
    }
  } else {
    console.error(err)
    res.status(401)
  }
})
