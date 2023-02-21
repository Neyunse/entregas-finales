import cr from "./shemas/cart";
export default class Cart {
      constructor(route) {
            this.route = route
      }

      async getAll() {
            const all = await cr.find()
            if (all.length) return all

            return []
      }

      async save(obj) {
            try {
                  const create = await cr.create(obj)

                  return create
            } catch (error) {
                  console.log(error);
            }
      }

      async update(obj) { 
            return await this.model.updateOne({ _id: obj.id }, obj);
      }

      async getById(int) {
            return await this.model.find({ _id: int });
      }

      async delById(int) { 
            return await this.model.deleteOne({_id: int});
      }
}

