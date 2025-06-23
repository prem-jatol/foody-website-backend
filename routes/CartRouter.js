const { Router } = require("express");
const CartCtr = require("../controllers/CartCtr");
const CartRouter = Router();

// CartRouter.post(
//     "/state-to-cart/:user_id",
//     (req, res) => {
//         const result = new CartCtr().stateToCart(req.params.user_id, req.body);
//         result.then(
//             (success) => {
//                 res.send(success)
//             }
//         ).catch(
//             (error) => {
//                 res.send(error)
//             }
//         )
//     }
// )

CartRouter.get("/get-carts", (req, res) => {
  const result = new CartCtr().getCarts(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

CartRouter.put("/change-qty", (req, res) => {
  const result = new CartCtr().changeQty(req.query.pid, req.query.qty);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

CartRouter.post("/add-to-cart", (req, res) => {
  const result = new CartCtr().addToCart(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

CartRouter.delete("/delete", (req, res) => {
  console.log("delete api", req);

  const result = new CartCtr().deleteFromCart(req.query.id);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = CartRouter;
