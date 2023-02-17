import { Router } from "express";
const p = new Router()
import { getProducts, postProducts, putProducts, deleteProducts } from "./controllers/index.js";


p.get("/:id?", getProducts);

p.post("/", postProducts);

p.put("/:id", putProducts);

p.delete("/:id", deleteProducts);

export { p }