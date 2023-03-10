
const { Products } = require('../models/index.js')
const products = new Products('./DB/products.json');
const { admin } = require('../../../../config/settings')

const deleteProducts = async (req, res) => {
      if (admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });

      const id = await products.delById(req.params.id);
      res.status(200).json({ status: 200, deletedProduct: id });
}

const getProducts = async (req, res) => {

      res.status(200)
            .json(
                  !req.params.id
                        ? await products.getAll()
                        : await products.getById(req.params.id)
            );
}

const postProducts = async (req, res) => {
      if (admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });
      const { name, description, code, image, price, stock } = req.body;
      const newProduct = {
            timestamp: Date.now(),
            name,
            description,
            code,
            image,
            price,
            stock,
      };
      const idNew = await products.save(newProduct);
      res.status(201).json({ status: 201, newProductId: idNew });
}

const putProducts = async (req, res) => {
      if (admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });
      const { name, description, code, image, price, stock } = req.body;
      const updatedProduct = {
            timestamp: Date.now(),
            name,
            description,
            code,
            image,
            price,
            stock,
      };
      const id = await products.update(updatedProduct);
      res
            .status(200)
            .json({ status: 200, updatedProduct: [await products.getById(id)] });
}


module.exports = {
      deleteProducts,
      postProducts,
      getProducts,
      putProducts,
      products
}