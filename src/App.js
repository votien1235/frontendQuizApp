import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import { Auth } from "./Pages/index";
import { Home } from './Pages/Home';
import AuthCtx from "./context/auth";
import axios from "./utils/axios";
import { Loading } from './component/shared/Loading';
import { Main } from './Pages/feed';

const App = () => {


  const [authUser, setAuthUser] = useState(null);
  const [signingIn, setSigningIn] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setSigningIn(false);
      return
    }

    axios.post("/auth/me", null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setAuthUser(res.data);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setSigningIn(false)
    }).catch((err) => {
      setSigningIn(false)
    })
  }, [])

  return (
    <AuthCtx.Provider value={{ authUser, setAuthUser }} className="hero" >
      {signingIn ? (<Loading text="Loading..." />) : (
        <>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={Auth} />
          <Route path='/' component={Main} />
        </>)}


    </AuthCtx.Provider>
  )
}

export default App;