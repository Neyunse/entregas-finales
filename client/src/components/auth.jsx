import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
const Auth = ({ userData }) => {
      const [page, setPage] = useState("login")
      const PageCallback = (pg) => {
            setPage(pg)
      }
      return (
            <div className="kg__container kg h-mi100 kg__flex fl-ali-flex_center fl-jc-flex_center">
                  {page == "login" && <Login userData={userData} setPage={PageCallback} />}
                  {page == "register" && <Register setPage={PageCallback} />}
            </div>
      )
}

const Login = ({ userData, setPage }) => {
      const [email, setEmail] = useState("")
      const [password, setPass] = useState("")

      const LoginAccount = async (e) => {
            e.preventDefault()

            const op = {
                  method: "POST",
                  data: {
                        email: email,
                        password: password
                  },
                  headers: {
                        "Content-Type": "application/json"
                  }
            }
            await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, op).then((r) => r.data).then((data) => {
                  localStorage.setItem("user", JSON.stringify(data))
                  userData(data)
            })
      }
      return (
            <form onSubmit={LoginAccount} className="form kg__flex kg__flex-direction-column fl-jc-flex_center fl-ali-flex_center gap-10">
                  <div className="input-group kg__flex fl-ali-flex_center">
                        <label className="label-form" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /></label>
                        <input onChange={(e) => setEmail(e.target.value)} required className="input-form" placeholder="email@email.com" type="email" name="email" id="email" />
                  </div>
                  <div className="input-group kg__flex fl-ali-flex_center kg__flex">
                        <label className="label-form" htmlFor="password"><FontAwesomeIcon icon={faLock} /></label>
                        <input onChange={(e) => setPass(e.target.value)} required className="input-form" placeholder="password" type="password" name="password" id="password" />
                  </div>
                  <button className="kg__button w-100" > Login</button >

                  <button className="kg__button w-100" onClick={() => setPage("register")} > Register</button >
            </form>
      )
}

const Register = ({ setPage }) => {
      const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541")
      const [file, setFile] = useState()

      const [email, setEmail] = useState("")
      const [password, setPass] = useState("")
      const [username, setUsername] = useState("")


      const av = (a) => {
            const reader = URL.createObjectURL(a)
            setAvatar(reader);
            setFile(a)
      }

      const MakeAccount = async (e) => {
            e.preventDefault()

            const op = {
                  method: "POST",
                  data: {
                        username: username,
                        email: email,
                        password: password,
                        avatar: file ? file : avatar
                  },
                  headers: {
                        "Content-Type": "multipart/form-data"
                  }
            }
            await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, op)
      }


      return (
            <form encType="multipart/form-data" onSubmit={MakeAccount} className="form kg__flex kg__flex-direction-column fl-jc-flex_center fl-ali-flex_center gap-10">
                  <div className="input-group kg__flex fl-ali-flex_center kg__flex-direction-column">
                        <label htmlFor="upload-photo">
                              <img className="avatar-form" src={avatar} alt="user avatar" />
                        </label>
                        <input type="file" onChange={(e) => av(e.target.files[0])} name="username" id="upload-photo" />
                  </div>
                  <div className="input-group kg__flex fl-ali-flex_center">
                        <label className="label-form" htmlFor="username"><FontAwesomeIcon icon={faEnvelope} /></label>
                        <input onChange={(e) => setUsername(e.target.value)} required className="input-form" placeholder="Username" type="username" name="username" id="username" />
                  </div>
                  <div className="input-group kg__flex fl-ali-flex_center">
                        <label className="label-form" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /></label>
                        <input onChange={(e) => setEmail(e.target.value)} required className="input-form" placeholder="email@email.com" type="email" name="email" id="email" />
                  </div>
                  <div className="input-group kg__flex fl-ali-flex_center kg__flex">
                        <label className="label-form" htmlFor="password"><FontAwesomeIcon icon={faLock} /></label>
                        <input onChange={(e) => setPass(e.target.value)} required className="input-form" placeholder="password" type="password" name="password" id="password" />
                  </div>
                  <button className="kg__button w-100 kg-primary" > Register</button >

                  <button className="kg__button w-100" onClick={() => setPage("login")} > Login</button >
            </form>
      )
}



export default Auth;