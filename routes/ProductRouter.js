const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const ProductRouter = Router();

ProductRouter.get("/", (req, res) => {
  const result = new ProductController().getProducts();
  result
    .then((sucess) => {
      res.send(sucess);
    })
    .catch((err) => {
      res.send(err);
    });
});

ProductRouter.post("/add-product", (req, res) => {
  const result = new ProductController().getProducts(req.body);
  result
    .then((sucess) => {
      res.send(sucess);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = ProductRouter;
