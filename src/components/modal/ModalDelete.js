import { useContext } from 'react'

import { Modal, Button } from 'react-bootstrap'
import { remove, ref } from 'firebase/database'
import { db } from '../../firebase/config'
import FavoriteContext from '../../stores/favorite-context'
import LoadingContext from '../../stores/getData-context'

import styles from './ModalDelete.module.scss'

const ModalDelete = (props) => {
  const {
    onShow,
    isShow,
    setPropagation,
    pictureItemId,
    onCancel,
    onDeleteFirebaseStorage,
  } = props
  const { removeFavorite } = useContext(FavoriteContext)
  const { getData } = useContext(LoadingContext)

  const deletePictureHandler = (id) => {
    remove(ref(db, `pictures/${id}`))
    removeFavorite(pictureItemId)
    setTimeout(() => {
      getData()
    }, 1000)
    onCancel()
    onDeleteFirebaseStorage()
  }

  return (
    <Modal
      className={styles.modalDelete}
      show={isShow}
      onHide={onShow}
      onClick={setPropagation}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Bạn có chắc muốn xóa ảnh hay video này?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => deletePictureHandler(pictureItemId)}
        >
          Đồng ý
        </Button>
        <Button
          variant="secondary"
          className={styles.cancelButton}
          onClick={onShow}
        >
          Thoát
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDelete
