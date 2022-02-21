import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  } else {
    const salt = bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
  }
})
userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', userModel)
export default User
