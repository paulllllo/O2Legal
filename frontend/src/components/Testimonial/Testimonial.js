import React from 'react'

import styles from './Testimonial.module.css'

const Testimonial = ({author, text, role}) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Testimonial}>
                <p className={styles.Text}>
                    {text}
                </p>
                <span className={styles.Author}>
                    {author}
                </span>
                <span className={styles.Role}>
                    {role}
                </span>
            </div>
        </div>
    )
}

export default Testimonial