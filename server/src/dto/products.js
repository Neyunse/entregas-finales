export default class ProductsDTO {
    /* This is a static method called `get` that takes an object `products` as a parameter and returns
    a new object with only the properties `name`, `description`, `image`, and `price` from the
    `products` object. This method is part of a class called `ProductsDTO` and can be called without
    creating an instance of the class. */
    static get = (products) => {
        return {
            name: products.name,
            description: products.description,
            image: products.image,
            price: products.price,
        }
    }
}
