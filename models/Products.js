import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: String, default: '' },
  ratings: { type: String, required: true },
  reviews: { type: String, required: true, select: false }, 
  url: { type: String, default: '' },
});

export const Products = mongoose.model('Products', productSchema);
