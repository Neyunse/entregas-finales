const { promises: fs } = require("fs")
const uniqid = require("uniqid")

class Cart {
      constructor(route) {
            this.route = route
      }
      /**
       * It reads the file, and if it's not empty, it returns the parsed JSON.
       * @returns An array of objects.
       */
      async getAll() {
            const rq = await fs.readFile(this.route, { encoding: 'utf8' })

            return rq ? JSON.parse(rq) : []
      }
      /**
       * It takes an object, adds an id to it, then writes it to a file.
       * @param obj - The object you want to save
       * @returns The id of the object that was saved.
       */
      async save(obj) {
            const cart = await this.getAll()
            console.log(obj)
            if (!obj) {
                  return null
            } else {
                  obj.id = uniqid()


                  if (cart.length >= 0) {
                        let writeFile = [...cart, obj]
                        let stringify = JSON.stringify(writeFile, null, 2)
                        await fs.writeFile(this.route, stringify, (err) => {
                              if (err) console.error(err);
                              console.log(`Your product id is: ${obj.id}`)
                        });

                        return obj

                  }

                  let stringify = JSON.stringify(obj, null, 2)
                  await fs.writeFile(this.route, [stringify], (err) => {
                        if (err) console.error(err);
                        console.log(`Your product id is: ${obj.id}`)
                  });

                  return obj
            }
      }

      /**
       * It takes an object as a parameter, gets all the products, finds the index of the product with
       * the same id as the object, and then replaces the old product with the new one
       * @param obj - The object to be updated
       * @returns An array of two objects.
       */
      async update(obj) {
            const cart = await this.getAll()
            const item = cart.map(i => i.id).indexOf(obj.id)
            if (item >= 0) {
                  cart[item] = obj

                  try {
                        await fs.writeFile(this.route, JSON.stringify(cart, null, 2))

                        return obj.id
                  } catch (error) {
                        console.error(error)
                        return []
                  }
            }

            return []

      }

      /**
       * * It gets all the products, then it finds the product with the id that matches the id passed in
       * * as an argument, and if it finds it, it returns it, otherwise it returns null
       * @param int - The id of the product you want to get.
       * @returns The product with the id of int.
       */
      async getById(int) {
            try {
                  const cart = await this.getAll()
                  let find = cart.find(product => product.id === int)
                  if (!find) {
                        return null
                  }

                  return find

            } catch (error) {
                  console.log(error)
            }
      }


      /**
       * It takes an id, finds the product with that id, and then deletes it from the database
       * @param int - The id of the product you want to delete
       * @returns a boolean value.
       */
      async delById(int) {
            const cart = await this.getAll()
            const Single = cart.find(element => element.id == int)


            if (Single) {

                  try {
                        const filter = cart.filter(element => element != Single)
                        let stringify = JSON.stringify(filter, null, 2)
                        await fs.writeFile(this.route, stringify, (err) => {
                              if (err) throw new Error(err);
                              console.log(`Your product id ('${id}') was successfully removed`)
                        });

                        return true
                  } catch (error) {
                        console.error(error.message);
                  }
            } else {
                  return null

            }
      }
}

module.exports = {
      Cart
}