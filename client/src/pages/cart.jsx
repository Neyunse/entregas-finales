import axios from "axios"
import { useState, useEffect } from "react"
import Product from "@/components/product"
const Cart = () => {
      const [Cart, setCartData] = useState([])
      const GetCartData = async (id) => {
            await axios(`https://crimson-water-4670.fly.dev/api/cart/my/${id}`, {
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                  }
            }).then(r => r.data).then(data => {
                  setCartData(data.products)
                  console.log(data);
            })
      }

      useEffect(() => {
            if (localStorage.getItem("user") != undefined) {
                  GetCartData(JSON.parse(localStorage.getItem("user")).user.cart_id)
            }
      }, [])

      const removeCallback = async (id) => {

            if (localStorage.getItem("user") != undefined) {
                  await axios(`https://crimson-water-4670.fly.dev/api/cart/del/products/${id}`, {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                              "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                        }
                  }).then(r => r.data).then(data => {
                        console.log(data);
                        if (localStorage.getItem("user") != undefined) {
                              GetCartData(JSON.parse(localStorage.getItem("user")).user.cart_id)
                        }
                  })
            }
      }

      const checkout = async () => {

            const options = {
                  method: "POST",
                  url: `https://crimson-water-4670.fly.dev/api/checkout`,
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).access_token
                  }
            };

            await axios(options).then((r) => r.data).then((data) => {
                  console.log("Checkout OK!");
            }).catch((err) => {
                  if (err) {
                        console.error(err)
                  }
            })
      }

      return (
            <div className="kg__flex gap-10">
                  <div>
                        {Cart.length ? (
                              <ul className="kg__flex gap-20 productList">
                                    {Cart.map((p, i) => <Product key={i} item={p} removeCallback={removeCallback} isOnCart={true} />)}
                              </ul>
                        ) : <>Nothing here</>}
                  </div>
                  <div>
                        {Cart.length && <div role="button" onClick={checkout} className="kg__button w-100 kg-no__decoration">Procesar compra</div>
                        }
                  </div>
            </div>
      )
}

export default Cart