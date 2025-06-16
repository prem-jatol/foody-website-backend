const ProductModel = require("../models/ProductModel");

class ProductController {
  getProducts() {
    return new Promise(async (res, rej) => {
      try {
        const products = ProductModel.find();
        if (products) {
          res({ status: 1, message: "all products", products });
        } else {
          rej({ status: 0, message: "error during fetch products" });
        }
      } catch (err) {
        console.log("internal server error from product ctr", err.message);
        
      }
    });
  }
}

module.exports = ProductController;
