import { useState, useEffect } from "react"

export default function Product({ item, callbackButton, cartId, AddCallback, isOnCart, removeCallback }) {

  const [isTaked, setIsTaked] = useState(false)

  const MakeCart = () => {
    const buttonCallback = {
      id: item._id,
    }

    callbackButton(buttonCallback)
    setIsTaked(true )
  }

  return (
    <div className="card" style={{
      width: '18rem',
    }}>
      {item.image && <img src={item.image} className="card-img-top" alt={item.name} />}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>

        {!isOnCart ? (
          <>
            {isTaked ? <button data-cartId={cartId} role="button" className="kg__button w-100 kg-no__decoration" disabled>Already in the cart</button> : <div onClick={MakeCart} role="button" className="kg__button w-100 kg-no__decoration">Buy for {item.price} USD</div>}
          </>
        ) : (
            <>
              <>
                <div onClick={() => removeCallback(item._id)} role="button" className="kg__button w-100 kg-no__decoration">Remove</div>
              </>
            </>
        )}

      </div>
    </div>
  );
}
