import axios from "axios"
import { useState, useEffect } from "react"
import Product from "@/components/product"
import { Toaster, toast } from 'sonner'

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
                  const prom = axios(`https://crimson-water-4670.fly.dev/api/cart/del/products/${id}`, {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                              "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                        }
                  })

                  // toasr
                  toast.promise(prom, {
                        loading: 'Loading...',
                        success: () => {
                              if (localStorage.getItem("user") != undefined) {
                                    GetCartData(JSON.parse(localStorage.getItem("user")).user.cart_id)
                              }
                              return "Product removed."
                        },
                        error: (data) => {
                              return "I can't remove this product."
                        },
                  });
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

            const prom = axios(options)

            toast.promise(prom, {
                  loading: 'Loading...',
                  success: () => {
                        if (localStorage.getItem("user") != undefined) {
                              GetCartData(JSON.parse(localStorage.getItem("user")).user.cart_id)
                        }
                        return "Checkout OK!"
                  },
                  error: (data) => {
                        return "I can't process your checkout."
                  },
            });
      }

      return (
            <>
                  <div className="kg__flex gap-10">
                        {Cart.length ? (
                              <>
                                    <div className="kg__container cart-container__products">

                                          <ul className="kg__flex gap-20 productList">
                                                {Cart.map((p, i) => <Product key={i} item={p} removeCallback={removeCallback} isOnCart={true} />)}
                                          </ul>
                                    </div>
                                    
                                    <div className="cart-container__buttons">
                                          <div role="button" onClick={checkout} className="kg__button w-100 kg-no__decoration">Purchase</div>
                                    </div>

                              </>
                        ) : "Nothing here"}
                  </div>
                  <Toaster />
            </>
      )
}

export default Cart
