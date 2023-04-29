import { useState, useEffect } from "react"





export default function Product({ item, callbackButton, cartId, isLibrary, isOnCart, removeCallback }) {

  const [isTaked, setIsTaked] = useState(false)

  const MakeCart = () => {
    const buttonCallback = {
      id: item._id,
      setIsTaked
    }

    callbackButton(buttonCallback)
  }
  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="card" style={{
      width: '18rem',
    }}>
      {item.image && <img src={item.image} className="card-img-top" alt={item.name} />}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>

        {!isLibrary && (
          <>
            {!isOnCart ? (
              <>
                {isTaked ? <button data-cartId={cartId} role="button" className="kg__button w-100 kg-no__decoration" disabled>Already in the cart</button> : <div onClick={MakeCart} role="button" className="kg__button w-100 kg-no__decoration">Buy for {formatter.format(item.price)}</div>}
              </>
            ) : (
              <>
                <>
                  <div onClick={() => removeCallback(item._id)} role="button" className="kg__button w-100 kg-no__decoration">Remove</div>
                  </>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}
