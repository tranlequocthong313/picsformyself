import React, { createContext, useState } from 'react'

import { storageTokenKey } from '../constants/_keyStorage'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const tokenStorageDefault = localStorage.getItem(storageTokenKey)
  const [token, setToken] = useState(tokenStorageDefault)

  const userIsLoggedIn = !!token

  const loginHandler = token => {
    setToken(token)

    localStorage.setItem(storageTokenKey, JSON.stringify(token))
  }

  const logoutHandler = () => {
    setToken(null)

    localStorage.removeItem(storageTokenKey)
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
