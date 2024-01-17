import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ children, show, onPress }) => {
    return (
        show ? (
            <>
                <div className={styles.Backdrop} onClick={onPress}>
                </div>
                <div className={styles.Modal} style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                    {children}
                </div>
            </>)
            : null
    )
}

export default Modal