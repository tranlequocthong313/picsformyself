import React, { useContext } from 'react'

import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NavActiveContext from '../../stores/navActive-context'
import FavoriteContext from '../../stores/favorite-context'
import AuthContext from '../../stores/auth-context'
import NavUser from './NavUser'
import { ADD_PAGE, ALL_PAGE, FAV_PAGE } from '../../constants/_tabName'

import styles from './NavLinks.module.scss'

function NavLinks() {
  const { active, handleActiveTab } = useContext(NavActiveContext)
  const { totalFavorites } = useContext(FavoriteContext)
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Nav className="mr-auto">
      {isLoggedIn && (
        <>
          <Link
            to={'/'}
            className={`${
              active === ALL_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(ALL_PAGE)
            }}
          >
            Thư viện
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className={`${styles.navIcons} bi bi-image`}
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
          </Link>
          <Link
            to={'/add-pics'}
            className={`${
              active === ADD_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(ADD_PAGE)
            }}
          >
            Thêm thư viện
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className={`${styles.navIcons} bi bi-cloud-plus-fill`}
              viewBox="0 0 16 16"
            >
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
            </svg>
          </Link>
          <Link
            to={'/favorite-pics'}
            className={`${
              active === FAV_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(FAV_PAGE)
            }}
          >
            Thư viện yêu thích <span>{totalFavorites}</span>
          </Link>
        </>
      )}
      <NavUser />
    </Nav>
  )
}

export default NavLinks
