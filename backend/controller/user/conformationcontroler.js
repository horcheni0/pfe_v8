const addToConformModel = require("../../models/conform");
const userModel = require("../../models/userModel");

const addToConformViewProduct = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Fetch the user document to get the user's name
        const user = await userModel.findById(currentUser);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const userName = user.name; // Assuming the user's name is stored in a field called "name" in the user document
        const userMail = user.email;

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
            userName: userName, // Include user's name in the payload
            userMail: userMail
        };

        // Save the product to addToConformModel
        const saveProduct = await addToConformModel.create(payload);

        // Fetch all products associated with the current user
        const allProducts = await addToConformModel.find({ userId: currentUser }).populate("productId");

        return res.json({
            data: allProducts, // Changed to return all products
            message: "Product Added in Comendconforme 24h",
            success: true,
            error: false
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToConformViewProduct;
