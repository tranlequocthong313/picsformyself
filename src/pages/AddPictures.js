import React, { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

import NavActiveContext from '../stores/navActive-context'
import AddPics from '../components/addPictures/AddPics'
import { ADD_PAGE, ALL_PAGE } from '../constants/_tabName'

import 'bootstrap/dist/css/bootstrap.min.css'

function AddPictures() {
  const navigate = useNavigate()

  const { handleActiveTab } = useContext(NavActiveContext)

  useEffect(() => {
    handleActiveTab(ADD_PAGE)
  }, [handleActiveTab])

  const handleAddPictures = pictureData => {
    fetch(
      'https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/pictures.json',
      {
        method: 'POST',
        body: JSON.stringify(pictureData),
        header: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      navigate('/')
      handleActiveTab(ALL_PAGE)
    })
  }

  return (
    <Container>
      <Row>
        <AddPics onAddPictures={handleAddPictures} />
      </Row>
    </Container>
  )
}

export default AddPictures
