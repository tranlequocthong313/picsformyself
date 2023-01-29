import React, { useContext, useState, useRef, useEffect } from 'react'

import { Col, Card, Button } from 'react-bootstrap'
import FavoriteContext from '../../stores/favorite-context'
import AuthContext from '../../stores/auth-context'
import Modal from '../modal/Modal'
import {
  jfif,
  jpeg,
  jpg,
  png,
  gif,
  tiff,
  raw,
} from '../../constants/_imageType'
import { IMAGE_TYPE, VIDEO_TYPE } from '../../constants/_displayTypeName'

import styles from './PictureItem.module.scss'
import '../sass/_custom.scss'

function PictureItem(props) {
  const dataStorage = JSON.parse(localStorage.getItem('favorite'))

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [displayType, setDisplayType] = useState(null)

  const { itemIsFavorite, setUserFavorites, removeFavorite, addFavorite } =
    useContext(FavoriteContext)
  const { isLoggedIn } = useContext(AuthContext)

  const videoRef = useRef()

  const isFavorite = itemIsFavorite(props.id)

  const isDataStorage = dataStorage && dataStorage.length !== 0

  useEffect(() => {
    if (isDataStorage) {
      setUserFavorites(dataStorage.map(item => item))
    }
  }, [])

  useEffect(() => {
    if (props.image.includes(jpeg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(jpg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(png)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(jfif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(gif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(tiff)) {
      setDisplayType(IMAGE_TYPE)
    } else if (props.image.includes(raw)) {
      setDisplayType(IMAGE_TYPE)
    } else {
      setDisplayType(VIDEO_TYPE)
    }
  }, [props.image])

  const toggleFavoriteHandler = () => {
    if (isFavorite) {
      removeFavorite(props.id)
    } else {
      addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      })
    }
  }

  const openModalHandler = e => {
    if (displayType === VIDEO_TYPE) {
      e.preventDefault()
    }
    setIsOpenModal(!isOpenModal)
  }

  const setPropagation = e => {
    e.stopPropagation()
  }

  const pauseVideoHandler = e => {
    e.preventDefault()
    videoRef.current.pause()
  }

  let content

  if (displayType === IMAGE_TYPE) {
    content = (
      <Card.Img
        variant="top"
        src={props.image}
        className={styles.cardImg}
        onClick={openModalHandler}
      />
    )
  } else {
    content = (
      <video
        ref={videoRef}
        src={props.image}
        className={styles.cardImg}
        controls
        onClick={e => {
          openModalHandler(e)
          pauseVideoHandler(e)
        }}
      />
    )
  }

  return (
    <>
      <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className={styles.card}>
        <Card style={{ width: '18rem' }} className={styles.cardList}>
          {content}

          <Card.Body className={styles.cardItem}>
            <Card.Title
              className={styles.cardItemTitle}
              onClick={openModalHandler}
            >
              {props.title}
            </Card.Title>
            <Card.Text
              className={styles.cardItemAddress}
              onClick={openModalHandler}
            >
              {props.address}
            </Card.Text>
            <Card.Text
              className={styles.cardItemDesc}
              onClick={openModalHandler}
            >
              {props.description}
            </Card.Text>
            {isLoggedIn && (
              <Button
                variant="warning"
                className={styles.cardItemBtn}
                onClick={toggleFavoriteHandler}
              >
                {isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
      {isOpenModal && (
        <Modal
          pictureItem={props}
          setPropagation={setPropagation}
          onCancel={openModalHandler}
          isOpenModal={isOpenModal}
        />
      )}
    </>
  )
}

export default PictureItem
