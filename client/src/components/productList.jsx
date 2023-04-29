import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./product";
import { Toaster, toast } from 'sonner'
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartId, setSetCardiD] = useState("");

  const getProducts = async () => {
    await axios
      .get("https://crimson-water-4670.fly.dev/api/products")
      .then((r) => {
        if (!r.data) {
          console.error(r);
        }

        return r.data;
      })
      .then((data) => {
        setProducts(data);
      });
  };
  useEffect(() => {
    getProducts();
    
    if (localStorage.getItem("cartId") != undefined) {
      setSetCardiD(localStorage.getItem("cartId"))
    }
  }, []);

  const ProductCallback = async (callback) => {
    const { id, setIsTaked } = callback;

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).access_token
      }
    };

    const prom = axios.post(`https://crimson-water-4670.fly.dev/api/cart/add/products/${id}`, {}, {
      headers: options.headers
    })

    // toasr
    toast.promise(prom, {
      loading: 'Loading...',
      success: () => {
        setIsTaked(true)
        return "Products added."
      },
      error: (data) => {
        return data.response.data.error.message
      },
    });
  }

  return (
    <>
      <ul className="kg__flex gap-20 productList">
        {products.map((p, i) => <Product key={i} item={p} cartId={cartId} callbackButton={ProductCallback} />)}
      </ul>
      <Toaster />
    </>
  );
}
