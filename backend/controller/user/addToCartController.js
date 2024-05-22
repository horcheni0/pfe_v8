const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel"); // Import the user model

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Fetch the user document to get the user's name
        const user = await userModel.findById(currentUser);
        const userName = user.name; // Assuming the user's name is stored in a field called "name" in the user document
        const userMail = user.email;
        const isProductAvailable = await addToCartModel.findOne({ productId });

        console.log("isProductAvailable", isProductAvailable);

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
            userName: userName, // Include user's name in the payload
            userMail: userMail
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
