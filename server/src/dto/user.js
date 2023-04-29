export default class UserDTO {
    /* The `static jwt` method is a static method of the `UserDTO` class that takes a `user` object as
    a parameter and returns an object with `id`, `cart_id`, and `auth_type` properties. This method
    is used to generate a JSON Web Token (JWT) for the user object passed as a parameter. The `id`
    property is set to the `_id` property of the user object, the `cart_id` property is set to the
    `cart` property of the user object, and the `auth_type` property is set to the `role` property
    of the user object. */
    static jwt = (user) => {
        return {
            id: user._id,
            cart_id: user.cart,
            auth_type: user.role,
        }
    }

    /* The `static get` method is a static method of the `UserDTO` class that takes a `user` object as
    a parameter and returns an object with properties `id`, `username`, `email`, `role`, and
    `avatar`. This method is used to create a simplified version of the user object that can be used
    in various parts of the application, such as displaying user information on a profile page. The
    properties of the returned object are extracted from the `user` object passed as a parameter. */
    static get = (user) => {
        return {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              library: user.library,
        }
    }
}
