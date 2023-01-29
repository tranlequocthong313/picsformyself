import React, { createContext, useState } from 'react'

const LoadingContext = createContext()

export function LoadingContextProvider({ children }) {
  const [loadedPictures, setLoadedPictures] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url =
    'https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/pictures.json'

  const getData = async () => {
    setIsLoading(true)

    const res = await fetch(url)
    const data = await res.json()

    const pictures = []

    for (const key in data) {
      const picture = {
        id: key,
        ...data[key],
      }
      pictures.unshift(picture)
    }

    setLoadedPictures(pictures)
    setIsLoading(false)
  }

  const contextValue = {
    isLoading: isLoading,
    loadedPictures: loadedPictures,
    setLoadedPictures: setLoadedPictures,
    setIsLoading: setIsLoading,
    getData: getData,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContext
