import jsonwebtoken from 'jsonwebtoken'

const generateToken = (id) =>
  jsonwebtoken.sign({ id }, process.env.JWS_SECRET_KEY, { expiresIn: '30d' })

export default generateToken
