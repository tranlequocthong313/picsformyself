import React, { useContext, useEffect } from 'react'

import { Container, Row } from 'react-bootstrap'

import FavoriteContext from '../stores/favorite-context'
import PictureList from '../components/pictures/PictureList'
import NavActiveContext from '../stores/navActive-context'
import NothingText from '../components/constantTexts/NothingText'
import { FAV_PAGE } from '../constants/_tabName'

import 'bootstrap/dist/css/bootstrap.min.css'

function FavoritePictures() {
  const dataStorage = JSON.parse(localStorage.getItem('favorite'))

  const { handleActiveTab } = useContext(NavActiveContext)
  const { setUserFavorites } = useContext(FavoriteContext)

  useEffect(() => {
    handleActiveTab(FAV_PAGE)

    if (dataStorage && dataStorage.length !== 0) {
      setUserFavorites(dataStorage.map(item => item))
    }
  }, [])

  let content

  if (!dataStorage || dataStorage.length === 0) {
    content = <NothingText />
  } else {
    content = <PictureList pictures={dataStorage} />
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  )
}

export default FavoritePictures
