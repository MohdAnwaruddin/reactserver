const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  productId: { type: String, default: '', ref: 'Products' },
  quantity: { type: Number, default: 1 },


});

export const Cart = mongoose.model('Cart', cartSchema);
