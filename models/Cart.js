const mongoose = require('mongoose');
const schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
    userId: {
        type:schema.Types.Number,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type:schema.Types.Number,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
