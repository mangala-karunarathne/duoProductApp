const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Please add a product"]
        },
        category: {
            type: String,
            required: [true, "Please add a category"]
        }
    }, 
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports=Product;