import React from 'react'

import styles from './Button.module.css'
import { MyContext } from '../../../utils/myContext'
import { useContext } from 'react'

const Button = ({children, onPress, isDisabled}) => {
    const {theme, setState} = useContext(MyContext);

  return (
    <button disabled={isDisabled} className={`${styles.PrimaryBtn} ${theme === 'dark' ? styles.DarkTheme : ''} ${isDisabled ? styles.Disabled : ''}`} onClick={() => onPress()}>{children}</button>
  )
}

export default Button