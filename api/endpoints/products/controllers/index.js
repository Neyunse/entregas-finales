import { Products } from "../../../../models/dao.js";
console.log(Products('./DB/products.json'))
//const Products = dao.Products('./DB/products.json');
import settings from "../../../../config/settings.json" assert { type: "json" };

const deleteProducts = async (req, res) => {
      if (settings.admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });

      const id = await Products.delById(req.params.id);
      res.status(200).json({ status: 200, deletedProduct: id });
}

const getProducts = async (req, res) => {

      res.status(200)
            .json(
                  !req.params.id
                        ? await Products.getAll()
                        : await Products.getById(req.params.id)
            );
}

const postProducts = async (req, res) => {
      if (settings.admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });
      const { name, description, image, price, stock } = req.body;
      const newProduct = {
            timestamp: Date.now(),
            name,
            description,
            image,
            price,
            stock,
      };
      const idNew = await Products.save(newProduct);
      res.status(201).json({ status: 201, newProductId: idNew });
}

const putProducts = async (req, res) => {
      if (settings.admin) res
            .status(401)
            .json({
                  error: 401,
                  descripcion: "The route in your petition is not authorized",
                  route: req.originalUrl,
            });
      const { name, description, image, price, stock } = req.body;
      const updatedProduct = {
            timestamp: Date.now(),
            name,
            description,
            image,
            price,
            stock,
      };
      const id = await Products.update(updatedProduct);
      res
            .status(200)
            .json({ status: 200, updatedProduct: [await Products.getById(id)] });
}


export {
      deleteProducts,
      postProducts,
      getProducts,
      putProducts,
      Products
}