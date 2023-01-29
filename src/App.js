import React, { useContext } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import AddPictures from './pages/AddPictures'
import AllPictures from './pages/AllPictures'
import FavoritePictures from './pages/FavoritePictures'
import MainNav from './components/navbar/MainNav'
import Auth from './pages/Auth'
import AuthContext from './stores/auth-context'

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<AllPictures />} />
        <Route
          path="/add-pics"
          element={isLoggedIn ? <AddPictures /> : <Navigate to="/auth" />}
        />
        <Route
          path="/favorite-pics"
          element={isLoggedIn ? <FavoritePictures /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!isLoggedIn ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
