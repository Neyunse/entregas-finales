import { Cart } from "../../../../models/dao.js";
//const d = Dao('./DB/cart.json');
import { Products } from "../../products/controllers/index.js";

const deleteCart = async (req, res) => {
      const id = await carts.delById(req.params.id);
      res.status(200).json({ status: 200, deletedCart: id });
}

const deleteProductInCart = async (req, res) => {
      const { id, id_prod } = req.params;
      const cart = await carts.getById(id);

      const newCartProducts = cart.products.filter((producto) => {
            return producto.id != id_prod;
      });

      cart.products = newCartProducts;
      const updatedCartId = await carts.update(cart);
      res
            .status(201)
            .json({
                  status: 201,
                  updatedCart: updatedCartId,
                  productDeletedId: id_prod,
            });
}

const getProductsInCart = async (req, res) => {
      const cart = await carts.getById(req.params.id);
      res.status(200).json(cart.products);
}

const postCart = async (req, res) => {
      const newCart = { timestamp: Date.now(), products: [] };
      const idNew = await carts.save(newCart);
      res.status(201).json({ status: 201, newCartId: idNew });
}

const postProductInCart = async (req, res) => {
      const cartId = req.params.id;
      const productId = req.params.id_prod;

      const cart = await carts.getById(cartId);
      const product = await products.getById(productId);
      cart.products.push(product);

      const updatedCartId = await carts.update(cart);
      res
            .status(201)
            .json({ status: 201, updatedCart: updatedCartId, productAdded: product });
}


export {
      deleteCart,
      deleteProductInCart,
      getProductsInCart,
      postCart,
      postProductInCart
}