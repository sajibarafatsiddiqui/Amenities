import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  { name: { type: String, required: true } },
  { timestamps: true }
)

const productModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    numReviews: { type: Number, required: true },
    rating: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    review: [reviewSchema],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productModel)

export default Product
