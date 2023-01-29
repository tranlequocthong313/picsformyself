import React from 'react'

import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

import NavLinks from './NavLinks'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../sass/_custom.scss'
import styles from './MainNav.module.scss'

function MainNav() {
  return (
    <Navbar className={styles.mainNav} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className={styles.navBrand}>
          <Link className={styles.navLogoLink} to={'/'}>
            Pics<span className={styles.navLogoLinkBack}>hub</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <NavLinks />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNav
