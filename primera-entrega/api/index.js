const { Router } = require('express')
const endpoints = new Router()
const { p, c } = require('./endpoints')

endpoints.use("/products", p)
endpoints.use("/cart", c)

module.exports = { endpoints }
