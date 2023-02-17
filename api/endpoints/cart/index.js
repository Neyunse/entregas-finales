import { Router } from "express";
const c = new Router()
import { postCart, deleteCart, getProductsInCart, postProductInCart, deleteProductInCart } from "./controllers/index.js";


c.delete("/:id?", deleteCart);

c.post("/", postCart);

c.get("/:id", getProductsInCart);

c.post("/:id/products/:id_prod", postProductInCart);

c.delete("/:id/products/:id_prod", deleteProductInCart);


export { c }