import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

import AuthContext from '../../stores/auth-context'
import NavActiveContext from '../../stores/navActive-context'
import { AUTH_PAGE } from '../../constants/_tabName'

import styles from './NavUser.module.scss'

function NavUser() {
  const navigate = useNavigate()

  const { isLoggedIn, logout } = useContext(AuthContext)
  const { active, handleActiveTab } = useContext(NavActiveContext)

  let content

  if (isLoggedIn) {
    content = (
      <NavDropdown
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            className={`bi bi-person-circle ${styles.navUserIcon}`}
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        }
        id="basic-nav-dropdown"
        className={`${active === AUTH_PAGE ? styles.active : styles.navLinks}`}
        onClick={() => {
          handleActiveTab(AUTH_PAGE)
        }}
      >
        <NavDropdown.Item
          className={styles.navUserItem}
          onClick={() => isLoggedIn && logout()}
        >
          {isLoggedIn && (
            <span
              className={styles.authButton}
              onClick={() => navigate('/auth')}
            >
              Đăng xuất
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={`${styles.authButtonIconLogout} bi bi-box-arrow-right`}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </span>
          )}
        </NavDropdown.Item>
      </NavDropdown>
    )
  } else {
    content = (
      <Link
        to={'/auth'}
        className={`${active === AUTH_PAGE ? styles.active : styles.navLinks}`}
      >
        Login/Signup
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fillRule="currentColor"
          className={`${styles.authButtonIcon} bi bi-box-arrow-left`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
          />
          <path
            fillRule="evenodd"
            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
          />
        </svg>
      </Link>
    )
  }

  return <>{content}</>
}

export default NavUser
