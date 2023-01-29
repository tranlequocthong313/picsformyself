import { forwardRef, useContext, useState, useRef, useEffect } from 'react'

import { Card, Container, Row, Button } from 'react-bootstrap'
import { ref, update } from 'firebase/database'
import { db } from '../../firebase/config'
import { ref as refFirebase, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase/config'
import Zoom from 'react-medium-image-zoom'
import clsx from 'clsx'

import ModalDelete from './ModalDelete'
import LoadingContext from '../../stores/getData-context'
import AuthContext from '../../stores/auth-context'
import { IMAGE_TYPE, VIDEO_TYPE } from '../../constants/_displayTypeName'
import {
  gif,
  jfif,
  jpeg,
  jpg,
  png,
  raw,
  tiff,
} from '../../constants/_imageType'
import AddPics from '../addPictures/AddPics'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './Modal.module.scss'

function Modal(props, backDropRef) {
  const { pictureItem, isOpenModal, setPropagation, onCancel } = props

  const [isEdit, setIsEdit] = useState(false)
  const [displayType, setDisplayType] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)

  const { getData } = useContext(LoadingContext)
  const { isLoggedIn } = useContext(AuthContext)

  const videoRef = useRef()

  useEffect(() => {
    if (pictureItem.image.includes(jpeg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(jpg)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(png)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(jfif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(gif)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(tiff)) {
      setDisplayType(IMAGE_TYPE)
    } else if (pictureItem.image.includes(raw)) {
      setDisplayType(IMAGE_TYPE)
    } else {
      setDisplayType(VIDEO_TYPE)
    }
  }, [pictureItem.image])

  useEffect(() => {
    if (isOpenModal && displayType === VIDEO_TYPE) {
      videoRef.current.play()
    }
  }, [isOpenModal, displayType])

  const deleteFirebaseStorageHandler = () => {
    const imageStorageRef = refFirebase(storage, pictureItem.image)
    deleteObject(imageStorageRef)
  }

  const editPictureHandler = (data) => {
    update(ref(db, `pictures/${pictureItem.id}`), data)
    setTimeout(() => {
      getData()
    }, 1000)
    deleteFirebaseStorageHandler()
    onCancel()
  }

  const showEditHandler = () => {
    setIsEdit((prevState) => !prevState)
  }

  const showModalDeleteHandler = () => {
    setShowModalDelete((prev) => !prev)
  }

  let cardStyle = clsx(styles.card, {
    [styles.displayNone]: isEdit,
  })

  let content

  if (displayType === IMAGE_TYPE) {
    content = (
      <Zoom>
        <Card.Img
          variant="top"
          src={pictureItem.image}
          className={styles.cardImg}
        />
      </Zoom>
    )
  } else {
    content = (
      <video
        controls
        ref={videoRef}
        src={pictureItem.image}
        className={styles.cardImg}
      />
    )
  }

  return (
    <div className={styles.backDrop} ref={backDropRef} onClick={onCancel}>
      <Card
        style={{ width: '20rem' }}
        className={cardStyle}
        onClick={(e) => setPropagation(e)}
      >
        {content}

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>
            {pictureItem.title}
          </Card.Title>
          <Card.Text className={styles.cardAddress}>
            {pictureItem.address}
          </Card.Text>
          <Card.Text className={styles.cardDesc}>
            {pictureItem.description}
          </Card.Text>
          {isLoggedIn && (
            <>
              <Button
                variant="warning"
                className={styles.cardBtn}
                style={{ backgroundColor: '#c71c1c', color: '#fff' }}
                onClick={showModalDeleteHandler}
              >
                <span className={styles.cardBtnText}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </span>
              </Button>
              <Button
                variant="warning"
                className={styles.cardBtn}
                style={{ backgroundColor: '#1d1daf', color: '#fff' }}
                onClick={showEditHandler}
              >
                <span className={styles.cardBtnText}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </span>
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      {showModalDelete && (
        <ModalDelete
          onShow={showModalDeleteHandler}
          isShow={showModalDelete}
          setPropagation={setPropagation}
          pictureItemId={pictureItem.id}
          onCancel={onCancel}
          onDeleteFirebaseStorage={deleteFirebaseStorageHandler}
        />
      )}
      {isEdit && (
        <Container style={{ margin: 0, width: '90vh' }}>
          <Row>
            <AddPics
              onPropagation={setPropagation}
              editPictureHandler={editPictureHandler}
              isEdit={isEdit}
            />
          </Row>
        </Container>
      )}
    </div>
  )
}

export default forwardRef(Modal)
