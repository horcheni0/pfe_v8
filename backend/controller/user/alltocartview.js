const addToCartModel = require("../../models/cartProduct");

const allCartViewProduct = async (req, res) => {
    try {
        // Fetch all products in the cart and populate the product and user details
        const allProducts = await addToCartModel.find().populate("productId").populate("userId", "userName");

        res.json({
            data: allProducts,
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = allCartViewProduct;
