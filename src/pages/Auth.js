import React, { useContext, useEffect } from 'react'

import { Container, Row } from 'react-bootstrap'

import AuthForm from '../components/auth/AuthForm'
import AuthSlogan from '../components/auth/AuthSlogan'
import NavActiveContext from '../stores/navActive-context'
import { AUTH_PAGE } from '../constants/_tabName'

import '../components/sass/_custom.scss'

function Auth() {
  const { handleActiveTab } = useContext(NavActiveContext)

  useEffect(() => {
    handleActiveTab(AUTH_PAGE)
  }, [handleActiveTab])

  return (
    <Container
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Row>
        <AuthSlogan />
        <AuthForm />
      </Row>
    </Container>
  )
}

export default Auth
