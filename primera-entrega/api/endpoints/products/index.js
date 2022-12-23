const { Router } = require("express")
const p = new Router()
const {
      getProducts,
      postProducts,
      putProducts,
      deleteProducts,

} = require("./controllers")


p.get("/:id?", getProducts);

p.post("/", postProducts);

p.put("/:id", putProducts);

p.delete("/:id", deleteProducts);

module.exports = { p }