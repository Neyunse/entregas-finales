import { Router } from "express";
const endpoints = new Router()
import { p, c } from "./endpoints/index.js";

endpoints.use("/products", p)
endpoints.use("/cart", c)

export {endpoints}
