const mongoose = require('mongoose');

const addToConformSchema = mongoose.Schema({
    productId: {
        ref: 'product',
        type: String,
    },
    quantity: Number,
    userId: String,
    userName: String,
    userMail: String, // Add userName field to the schema
}, {
    timestamps: true
});

const addToConformModel = mongoose.model("addToConform", addToConformSchema);

module.exports = addToConformModel;
