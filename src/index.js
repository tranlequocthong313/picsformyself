import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { FavoriteContextProvider } from './stores/favorite-context'
import { NavActiveProvider } from './stores/navActive-context'
import { LoadingContextProvider } from './stores/getData-context'
import { AuthContextProvider } from './stores/auth-context'
import App from './App'

import './index.scss'

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <NavActiveProvider>
        <LoadingContextProvider>
          <FavoriteContextProvider>
            <App />
          </FavoriteContextProvider>
        </LoadingContextProvider>
      </NavActiveProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
