import React from 'react'
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.Loading}>
        <div className={styles.lds_circle}><div></div></div>
    </div>
  )
}

export default Loading