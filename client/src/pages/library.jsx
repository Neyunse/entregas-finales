import axios from "axios"
import { useState, useEffect } from "react"
import Product from "@/components/product"
import { Toaster, toast } from 'sonner'

const Library = () => {
      const [Plibrary, setLibraryData] = useState([])
      const GetLibraryData = async () => {
            await axios(`https://crimson-water-4670.fly.dev/api/auth/user/me?data=populate`, {
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                  }
            }).then(r => r.data).then(data => {
                  setLibraryData(data.library)
                  console.log(data);
            })
      }

      useEffect(() => {
            GetLibraryData()
      }, [])

      return (
            <>
                  <div className="kg__flex gap-10">
                        <div>
                              {Plibrary.length ? (
                                    <ul className="kg__flex gap-20 productList">
                                          {Plibrary.map((p, i) => <Product key={i} item={p._id} isLibrary={true} />)}
                                    </ul>
                              ) : <>Nothing here</>}
                        </div>
                  </div>

            </>
      )
}

export default Library