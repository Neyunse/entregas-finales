import axios from "axios"
import { useState, useEffect } from "react"
import Product from "@/components/product"
const Cart = () => {
      const [Cart, setCartData] = useState()
      const GetCartData = async (id) => {
            await axios(`http://localhost:8080/api/cart/my/${id}`, {
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                  }
            }).then(r => r.data).then(data => {
                  setCartData(data)

            })
      }

      useEffect(() => {
            if (localStorage.getItem("cartId") != undefined) {
                  GetCartData(localStorage.getItem("cartId"))
            }
      }, [])

      const removeCallback = async (id) => {

            if (localStorage.getItem("cartId") != undefined) {
                  await axios(`http://localhost:8080/api/cart/del/${localStorage.getItem("cartId")}/products/${id}`, {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                              "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                        }
                  }).then(r => r.data).then(data => {
                        console.log(data);
                        if (localStorage.getItem("cartId") != undefined) {
                              GetCartData(localStorage.getItem("cartId"))
                        }
                  })
            }
      }

      if (!Cart) return <>Nothing here</>
      return (
            <>
                  <ul className="kg__flex gap-20 productList">
                        {Cart.cart.products.map((p, i) => <Product key={i} item={p} removeCallback={removeCallback} isOnCart={true} />)}
                  </ul>
            </>
      )
}

export default Cart