import React, { createContext, useCallback, useState } from "react";
import { useContext } from "react/cjs/react.development";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchWithToken, fetchWitoutToken } from "../helpers/fetch";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext)

  const register = async (name, email, password) => {
    const response = await fetchWitoutToken("login/new", { name, email, password }, "POST");

    const {user} = response;

    if(response.ok){
      localStorage.setItem("token", response.token)
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email
      })

      console.log("registed!!");
    }
    return response
  };

  const login = async (email, password) => {
    const response = await fetchWitoutToken("login", { email, password }, "POST");
    const {user} = response

    if(response.ok){
      localStorage.setItem("token", response.token)
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email
      })

      console.log("Logged!!");
    }

    return response;

  };

  const verifyToken = useCallback( async() => {
    
    const token = localStorage.getItem("token")
    if(!token){
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })

      return false;
    }

    const response = await fetchWithToken("login/renew")
    const {user} = response

    if(response.ok){
      localStorage.setItem("token", response.token)
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email
      })

      return true
    }else{
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null
      })

      return false
    }

  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    })
    dispatch({
      type: types.logout
    })
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
