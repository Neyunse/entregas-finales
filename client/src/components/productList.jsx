import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./product";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartId, setSetCardiD] = useState("");

  const getProducts = async () => {
    await axios
      .get("http://localhost:8080/api/products")
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
    const { id } = callback;

    const options = {
      method: "POST",
      url: `${process.env.BACKEND_URL}/api/cart/add/products/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).access_token
      }
    };
    await axios(options).then((r) => r.data).then((data) => {
      console.log("added product");
      
    }).catch((err) => {
      if (err) {
        console.error(`[ERROR] ${err.message}: ` + err.response.data.error.message)
      }
    })

  }


  const checkout = async () => {

    const options = {
      method: "POST",
      url: `http://localhost:8080/api/checkout/${cartId}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).access_token
      }
    };

    await axios(options).then((r) => r.data).then((data) => {
      setSetCardiD("")
      localStorage.removeItem("cartId")
    }).catch((err) => {
      if (err) {
        console.error(`[ERROR] ${err.message}: ` + err.response.data.error.message)
      }
    })
  }

  return (
    <>
      <ul className="kg__flex gap-20 productList">
        {products.map((p, i) => <Product key={i} item={p} cartId={cartId} callbackButton={ProductCallback} />)}
      </ul>
    </>
  );
}
