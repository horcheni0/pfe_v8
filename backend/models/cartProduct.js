const mongoose = require('mongoose');

const addToCart = mongoose.Schema({
    productId: {
        ref: 'product',
        type: String,
    },
    quantity: Number,
    userId: String,
    userName: String,
    userMail:String, // Add userName field to the schema
}, {
    timestamps: true
});

const addToCartModel = mongoose.model("addToCart", addToCart);

module.exports = addToCartModel;
