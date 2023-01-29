import React from 'react'

import PictureItem from './PictureItem'
import styles from './PictureList.module.scss'

function PictureList(props) {
  return (
    <ul className={styles.list}>
      {props.pictures.map(item => (
        <PictureItem
          key={item.id}
          id={item.id} //ID random của firebase
          image={item.image}
          title={item.title}
          address={item.address}
          description={item.description}
        />
      ))}
    </ul>
  )
}

export default PictureList
