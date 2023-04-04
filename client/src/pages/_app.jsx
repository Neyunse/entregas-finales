import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import csc from '@kagarisoft/csc/dist/css/common.min.css';
import '../styles/main.css'
import { useState, useEffect } from 'react';
import Auth from '@/components/auth';
import Nav from '@/components/nav';
export default function App({ Component, pageProps }) {
  const [userData, setUserData] = useState({})
  useEffect(() => {
    if (localStorage.getItem("user") != undefined) {
      setUserData(JSON.parse(localStorage.getItem("user")))
    }
  }, [])
  return (
    <>
      {!userData.access_token && <Auth userData={setUserData} />}
      {userData.access_token && (
        <>
          <Nav />
          <Component {...pageProps} />
        </>
      )}
    </>
  )
}
