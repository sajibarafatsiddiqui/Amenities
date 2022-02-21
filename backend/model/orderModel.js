import mongoose from 'mongoose'

const orderModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
      {
        name: { type: String, required: true },
        orderQty: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
      { timestamps: true },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    shippingAddress: [
      {
        city: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: { type: String, required: true },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderModel)

export default Order
