import cr from '../schemas/cart'
export default class Cart {
      /**
       * This function retrieves all documents from a database using an asynchronous operation and
       * returns an empty array if no documents are found.
       * @returns If there are any documents found by the `find()` method, the `getAll()` function will
       * return an array containing all the documents. If no documents are found, it will return an
       * empty array.
       */
      async getAll() {
            const all = await cr.find()
            if (all.length) return all

            return []
      }

      /**
       * This is an asynchronous function that saves an object using the "create" method and returns
       * either the created object or an error message.
       * @param obj - The `obj` parameter is an object that contains the data to be saved. It is passed
       * as an argument to the `save` function.
       * @returns The `save` function is returning either the result of the `create` operation (if
       * successful) or the error message (if there was an error).
       */
      async save(obj) {
            try {
                  const create = await cr.create(obj)

                  return create
            } catch (error) {
                  return error.message
            }
      }

      /**
       * This is an asynchronous function that updates a document in a MongoDB database using the
       * Mongoose library.
       * @param obj - The parameter `obj` is an object that contains the data to be updated in the
       * database. It should have an `id` property that specifies the unique identifier of the document
       * to be updated, and any other properties that need to be updated. The function uses the
       * `findByIdAndUpdate` method of the
       * @returns The `update` function is returning a promise that resolves to the result of calling
       * the `findByIdAndUpdate` method on the `cr` object with the provided `obj` parameter as the
       * update object and the `_id` property of `obj` as the query filter. The `await` keyword is used
       * to wait for the promise to resolve before returning its result.
       */
      async update(obj) {
            return await cr.findByIdAndUpdate({ _id: obj.id }, obj)
      }

      /**
       * This is an asynchronous function that updates the cart of a product with a given ID in a
       * MongoDB database using Mongoose.
       * @param id - The id parameter is likely the unique identifier of a document in a MongoDB
       * collection. It is used to identify which document to update with the new cart information.
       * @param cart - The `cart` parameter is an object that contains information about the products
       * in a shopping cart. It is being used to update the products in a database using the
       * `findByIdAndUpdate` method from the `cr` model. The `` operator is used to update the
       * fields in the document with the
       * @returns The `updateProducts` function is returning a promise that resolves to the result of
       * calling the `findByIdAndUpdate` method on the `cr` object with the `id` and `cart` parameters.
       * The `findByIdAndUpdate` method updates a document in the database and returns the updated
       * document.
       */
      async updateProducts(id, cart) {
            return await cr.findByIdAndUpdate(id, { $set: cart })
      }

      /**
       * This function clears the products array of a cart document in a MongoDB database.
       * @param id - The parameter "id" is the identifier of the document in the "cr" collection that
       * needs to be updated. The function uses the "findByIdAndUpdate" method to find the document
       * with the given "id" and update its "products" field to an empty array, effectively clearing
       * the cart. The
       * @returns The `clearCart` function is returning a promise that resolves to the result of
       * calling the `findByIdAndUpdate` method on the `cr` model with the provided `id` and updating
       * the `products` field to an empty array.
       */
      async clearCart(id) {
            return await cr.findByIdAndUpdate({ _id: id }, { products: [] })
      }

      /**
       * This is an asynchronous function that finds a document by its ID and optionally populates a
       * specified collection.
       * @param int - The parameter "int" is an integer value that represents the unique identifier of
       * the document being searched for in the database.
       * @param [options] - An object that contains additional options for the function. It is an
       * optional parameter and defaults to an empty object if not provided.
       * @returns The function `getById` is returning a promise that resolves to the result of a
       * `findOne` query on the `cr` collection with the specified `_id`. If the `options.populate`
       * property is truthy, the query result will also be populated with the specified
       * `options.collection`. The function is using `async/await` syntax to handle the asynchronous
       * nature of the query.
       */
      async getById(int, options = {}) {
            if (options.populate)
                  return await cr
                        .findOne({ _id: int })
                        .populate(options.collection)
            return await cr.findOne({ _id: int })
      }

      async delById(int) {
            return await cr.deleteOne({ _id: int })
      }
}
