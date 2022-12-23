const { Router } = require("express")
const c = new Router()
const {
      postCart,
      deleteCart,
      getProductsInCart,
      postProductInCart,
      deleteProductInCart,
} = require("./controllers/index")


c.delete("/:id?", deleteCart);

c.post("/", postCart);

c.get("/:id", getProductsInCart);

c.post("/:id/products/:id_prod", postProductInCart);

c.delete("/:id/products/:id_prod", deleteProductInCart);


module.exports = { c }