const ProductModel = require("../models/ProductModel");

class ProductController {
  getProducts() {
    return new Promise(async (res, rej) => {
      try {
        const products = await ProductModel.find();
        if (products) {
          res({ status: 1, message: "all products", products, length: products.length, imagePath: "/images/product/" });
        } else {
          rej({ status: 0, message: "error during fetch products" });
        }
      } catch (err) {
        console.log("internal server error from product ctr", err.message); 
      }
    });
  }

  addProducts(data){
    return new Promise(async (res, rej) => {
      try {
        const {title, discount, subText, timeframe} = data;
        const product = await new ProductModel({
          title, discount, subText, timeframe
        })
        product.save()
        .then(
          ()=>{
            res({status: 1, msg: "produt added"})
          }
        )
        .catch(
          (err)=>{
            rej({status: 0, msg: "product not added"})
          }
        )
      } catch (err) {
        console.log("internal server error from product ctr", err.message);
      }
    });
  }
}

module.exports = ProductController;
