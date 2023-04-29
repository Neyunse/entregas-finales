import axios from "axios"
import { useState, useEffect } from "react"
const Nav = () => {
      const [user, setUser] = useState()
      const getMe = async () => {
            await axios(`https://crimson-water-4670.fly.dev/api/auth/user/me`, {
                  headers: {
                        "Content-Type": "application/json",
                        "Authorization": " Bearer " + JSON.parse(localStorage.getItem("user")).access_token
                  }
            }).then((r) => r.data).then((data) => {
                  setUser(data);
            }).catch(err => {
                  //clearUser()
            })
      }

      useEffect(() => {
            getMe()
      }, [])

      const clearUser = () => {
            localStorage.removeItem("user")
            setUser()
            window.location.reload()
      }


      return (
            <>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                              </button>
                              <a className="navbar-brand" href="#">E-commerce Game App</a>
                              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                          <li className="nav-item">
                                                <a className="nav-link" aria-current="page" href="/">Home</a>
                                          </li>
                                          <li className="nav-item">
                                                <a className="nav-link" href="/cart">My Cart</a>
                                          </li>
                                          <li className="nav-item">
                                                <a className="nav-link" href="/library">My Games</a>
                                          </li>
                                    </ul>
                                    <ul className="navbar-nav nav_li mb-2 mb-lg-0">
                                          <li className="nav-item">
                                                <a className="nav-link" aria-current="page" href="#">
                                                      {user && user.avatar ? <img className="av-home" src={user && user.avatar} alt={user && user.username} /> : user && user.username}
                                                </a>
                                          </li>
                                          <li className="nav-item">
                                                <button onClick={clearUser} className="nav-link kg__button" aria-current="page" href="#">
                                                      Logout
                                                </button>
                                          </li>
                                    </ul>
                              </div>
                        </div>
                  </nav>
            </>
      )
}

export default Nav