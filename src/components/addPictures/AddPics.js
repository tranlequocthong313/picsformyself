import { useRef, useState, useEffect } from 'react'

import { Form, Dropdown, ProgressBar, Button, Image } from 'react-bootstrap'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../firebase/config'

import { file, url } from '../../constants/_optionPostType'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../sass/_custom.scss'
import styles from './AddPics.module.scss'

function AddPics(props) {
  const [optionPost, setOptionPost] = useState()
  const [preview, setPreview] = useState()
  const [image, setImage] = useState()
  const [urlImage, setURLImage] = useState()
  const [progress, setProgress] = useState()

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview)
    }
  }, [preview])

  const titleInputRef = useRef()
  const addressInputRef = useRef()
  const descInputRef = useRef()

  const previewHandler = (e) => {
    console.log(e.target.files[0])
    if (e.target.files && !props.isEdit) {
      const previewImageFile = URL.createObjectURL(e.target.files[0])
      setPreview(previewImageFile) //Nếu dùng cho edit sẽ không có ảnh preview vì làm lỗi giao diện
    }
    if (!e.target.files && !props.isEdit) {
      const previewImageURL = e.target.value
      setPreview(previewImageURL)
    }
  }

  const imageFileHandler = (e) => {
    setImage(e.target.files[0])
  }

  const uploadFileImageHandler = (e) => {
    e.preventDefault()

    const storageRef = ref(storage, `files/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref) //Tạo link ảnh trên firebase Storage
        postPictureToDB(url)
      }
    )
  }

  const uploadURLImageHandler = (e) => {
    e.preventDefault()

    postPictureToDB(urlImage)
  }

  const postPictureToDB = (imageURL) => {
    const enteredTitle = titleInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredDesc = descInputRef.current.value

    const pictureData = {
      title: enteredTitle,
      image: imageURL,
      address: enteredAddress,
      description: enteredDesc,
    }

    !props.isEdit && props.onAddPictures(pictureData)
    props.isEdit && props.editPictureHandler(pictureData)
  }

  return (
    <Form
      onSubmit={urlImage ? uploadURLImageHandler : uploadFileImageHandler}
      className={styles.form}
      onClick={(e) => {
        props.isEdit && props.onPropagation(e)
      }}
    >
      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Tên</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={titleInputRef}
          placeholder="Nhập tên..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Nguồn</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={addressInputRef}
          placeholder="Nhập nguồn..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className={styles.formLabel}>Mô tả</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          className={styles.formControl}
          ref={descInputRef}
          placeholder="Nhập mô tả..."
        />
      </Form.Group>

      {optionPost === url && (
        <Form.Group className="mb-3" controlId="form">
          <Form.Label className={styles.formLabel}>Link</Form.Label>
          <Form.Control
            type="text"
            required
            className={styles.formControl}
            onChange={(e) => {
              setURLImage(e.target.value)
              previewHandler(e)
            }}
            placeholder="Nhập link..."
          />
        </Form.Group>
      )}

      {optionPost === file && (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className={styles.formLabel}>File</Form.Label>
          <Form.Control
            required
            type="file"
            accept="image/*"
            autoComplete="off"
            className={styles.formControl}
            onChange={(e) => {
              imageFileHandler(e)
              previewHandler(e)
            }}
          />
        </Form.Group>
      )}

      <Dropdown className={styles.formDrop}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Tùy chọn để đăng
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.formDropMenu}>
          <Dropdown.Item
            onClick={() => setOptionPost(url)}
            className={styles.formDropMenuItem}
          >
            Đường dẫn
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-link-45deg"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setOptionPost(file)}
            className={styles.formDropMenuItem}
          >
            Tệp tin
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-file-earmark"
              viewBox="0 0 16 16"
            >
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </Dropdown.Item>
        </Dropdown.Menu>
        {preview && (
          <Image src={preview} alt="" className={styles.previewPic} />
        )}
      </Dropdown>

      {progress > 0 && (
        <ProgressBar now={progress} label={`${progress}%`} variant="warning" />
      )}

      <Form.Group className={styles.formBtn}>
        <Button variant="warning" type="submit">
          {!props.isEdit ? 'Thêm' : 'Chỉnh sửa'}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default AddPics
