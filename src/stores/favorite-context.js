import React, { createContext, useState } from 'react'

import { storageFavoriteKey } from '../constants/_keyStorage'

const FavoriteContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: favoritePicture => {},
  removeFavorite: pictureId => {},
  itemIsFavorite: pictureId => {},
})

export function FavoriteContextProvider({ children }) {
  const dataStorageJSON = JSON.parse(localStorage.getItem(storageFavoriteKey))

  const [userFavorites, setUserFavorites] = useState([])

  const [userFavoritesNumber, setUserFavoritesNumber] = useState(
    dataStorageJSON ? getLocalStorageLength() : userFavorites.length
  )

  function getLocalStorageLength() {
    return JSON.parse(localStorage.getItem(storageFavoriteKey)).length // vi 1 ly do gi do khong dung duoc bien dataStorageJSON o tren
  }

  const newFavoritesJSONHandler = favorites => {
    return JSON.stringify(favorites)
  }

  const addFavoriteHandler = favoritePicture => {
    setUserFavorites(prevUserFavorites => {
      const newFavorites = prevUserFavorites.concat(favoritePicture)
      localStorage.setItem(
        storageFavoriteKey,
        newFavoritesJSONHandler(newFavorites)
      )
      setUserFavoritesNumber(getLocalStorageLength())
      return newFavorites
    })
  }

  const removeFavoriteHandler = pictureId => {
    setUserFavorites(prevUserFavorites => {
      const newFavorites = prevUserFavorites.filter(
        picture => picture.id !== pictureId
      )

      localStorage.removeItem(storageFavoriteKey)
      localStorage.setItem(
        storageFavoriteKey,
        newFavoritesJSONHandler(newFavorites)
      )
      setUserFavoritesNumber(getLocalStorageLength())

      return newFavorites
    })
  }

  const itemIsFavoriteHandler = pictureId => {
    // const isFavoriteStorage = dataStorageJSON && getLocalStorageLength() !== 0
    const isFavoriteStorage = dataStorageJSON && dataStorageJSON.length !== 0

    let isFavorite

    if (isFavoriteStorage) {
      isFavorite = dataStorageJSON.some(item => item.id === pictureId)
    } else {
      isFavorite = userFavorites.some(picture => picture.id === pictureId)
    }

    return isFavorite
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavoritesNumber,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
    setUserFavorites: setUserFavorites,
  }

  return (
    <FavoriteContext.Provider value={context}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContext
