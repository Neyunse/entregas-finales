import { useState, useEffect } from "react"

export default function Product({ item, callbackButton, cartId, AddCallback }) {

  const [idExist, setIdExist] = useState(false)
  const MakeCart = () => {
    const buttonCallback = {
      id: item._id,
    }

    callbackButton(buttonCallback)

  }

  useEffect(() => {
    if (cartId) {
      setIdExist(true)

    } else {
      setIdExist(false)

    }
  }, [cartId])

  const AddProduct = () => {
    const buttonCallback = {
      id: item._id,
    }

    AddCallback(buttonCallback)
  }
  return (
    <div className="card" style={{
      width: '18rem',
    }}>
      {item.image && <img src={item.image} className="card-img-top" alt={item.name} />}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        {item.stock >= 1 ? (
          <>
            {idExist ? <div data-cartId={cartId} onClick={AddProduct} role="button" className="kg__button w-100 kg-no__decoration">Add for {item.price} USD</div> : <div onClick={MakeCart} role="button" className="kg__button w-100 kg-no__decoration">Buy for {item.price} USD</div>

            }

          </>
        ) : (
          <div className="kg__button w-100 kg-no__decoration" disabled>Buy for {item.price} USD</div>
        )}
      </div>
    </div>
  );
}
