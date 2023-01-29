import { useState, useRef, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'

import AuthContext from '../../stores/auth-context'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './AuthForm.module.scss'

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [emailInputKeyStroke, setEmailInputKeyStroke] = useState('')
  const [passwordInputKeyStroke, setPasswordInputKeyStroke] = useState('')

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const isLoginHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const authSubmitHandler = async (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value.trim()
    const enteredPassword = passwordInputRef.current.value.trim()

    setIsLoading(true)

    let url

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
    }

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    })

    const data = await res.json()

    if (data && data.error && data.error.message) {
      alert(data.error.message)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      if (isLogin) {
        login(data.idToken)
        navigate('/')
      } else {
        isLoginHandler()
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
      }
    }
  }

  let isValidInput

  if (
    emailInputKeyStroke.trim().length !== 0 &&
    emailInputKeyStroke.includes('@') &&
    passwordInputKeyStroke.trim().length >= 6
  ) {
    isValidInput = true
  }

  const togglePasswordHandler = () => {
    if (passwordInputRef.current.type === 'password') {
      passwordInputRef.current.type = 'text'
    } else {
      passwordInputRef.current.type = 'password'
    }
  }

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={6}
      xl={5}
      xxl={5}
      className={styles.authFormSection}
    >
      <Form className={styles.form} onSubmit={authSubmitHandler}>
        <div className={styles.formHeading}>
          <h1>{!isLogin ? 'Sign up for free' : 'Login to Picshub'}</h1>
          <span>and enhance your experience</span>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            className={styles.formInput}
            required
            onChange={(e) => setEmailInputKeyStroke(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            className={styles.formInput}
            required
            onChange={(e) => setPasswordInputKeyStroke(e.target.value)}
          />
        </Form.Group>

        <Form.Group className={styles.formShowPass}>
          <Form.Check type="checkbox" id="default-checkbox">
            <Form.Check.Input type="checkbox" onClick={togglePasswordHandler} />
            <Form.Check.Label>Show password</Form.Check.Label>
          </Form.Check>
        </Form.Group>

        <Form.Group className={styles.formFooter}>
          <Button
            variant="warning"
            type="submit"
            className={styles.formButton}
            disabled={!isValidInput}
          >
            {isLoading ? 'Loading...' : !isLogin ? 'SignUp' : 'Login'}
          </Button>
          <p>
            or{' '}
            <span onClick={isLoginHandler}>
              {!isLogin ? 'Login' : 'Sign up'}
            </span>
          </p>
        </Form.Group>
      </Form>
    </Col>
  )
}

export default AuthForm
