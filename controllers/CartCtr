const CartModel = require("../models/CartModel");

class CartCtr {
  addToCart(data) {
    return new Promise(async (res, rej) => {
      try {
        const { user_id, pId, qty } = data;
        const existProduct = await CartModel.findOne({ pId: pId });

        if (existProduct) {
          const existingQty = existProduct.qty;
          const newQty = existingQty + qty;
          await CartModel.updateOne({ pId: pId }, { qty: newQty });
          res({ status: 1, msg: "quantity increase by 1" });
        } else {
          const cart = await new CartModel({
            user_id,
            pId,
            qty,
          });
          cart
            .save()
            .then(() => {
              res({ status: 1, msg: "product added to cart" });
            })
            .catch((error) => {
              rej({ status: 0, msg: "product not added" });
            });
        }
      } catch (error) {
        rej({ status: 0, msg: "internal server error" });
      }
    });
  }

  getCarts() {
    return new Promise(async (res, rej) => {
      try {
        const carts = await CartModel.find().populate("pId");
        res({ status: 1, carts });
      } catch (error) {
        rej({ status: 0, msg: "intenal server error" });
      }
    });
  }

  changeQty(pid, qty) {
    return new Promise( async(res, rej) => {
      try {
        await CartModel.updateOne({ pId: pid }, { qty: qty });
        res({ status: 1, msg: "quantity changed" });
      } catch (error) {
        rej({ status: 0, msg: "intenal server error" });
      }
    });
  }

  deleteFromCart(id) {
    return new Promise(async(res, rej) => {
      try {
        await CartModel.deleteOne({_id: id})
        res({status: 1, msg: "cart deleted"})
      } catch (error) {rej({ status: 0, msg: "intenal server error" });}
    });
  }
}

module.exports = CartCtr;
