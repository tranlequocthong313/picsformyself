import React, { useEffect, useContext } from 'react'

import { Container, Row } from 'react-bootstrap'

import PictureList from '../components/pictures/PictureList'
import NavActiveContext from '../stores/navActive-context'
import Loading from '../components/loading/Loading'
import LoadingContext from '../stores/getData-context'
import NothingText from '../components/constantTexts/NothingText'
import { ALL_PAGE } from '../constants/_tabName'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/sass/_custom.scss'

function AllPictures() {
  const { handleActiveTab } = useContext(NavActiveContext)

  const { loadedPictures, getData, isLoading } = useContext(LoadingContext)
  const isPicsLength = loadedPictures.length !== 0

  useEffect(() => {
    handleActiveTab(ALL_PAGE)
    getData()
  }, [handleActiveTab, getData])

  let content

  if (isLoading) {
    content = <Loading />
  }

  if (isPicsLength) {
    content = <PictureList pictures={loadedPictures} />
  } else {
    content = <NothingText />
  }

  return (
    <Container fluid="md">
      <Row>{content}</Row>
    </Container>
  )
}

export default AllPictures
