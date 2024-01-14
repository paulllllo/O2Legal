import React, { useEffect } from 'react'

import styles from './AdminLayout.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cartLengthState } from '../../state/selectors'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notifState } from '../../state/atoms'
// import { MyContext } from '../../utils/myContext'
// import { useContext, useState } from 'react'
// import Button from '../UI/button/Button'

const AdminLayout = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const cartLength = useRecoilValue(cartLengthState);
    const [notif, setNotif] = useRecoilState(notifState);


    const openCart = () => {
        if (location.pathname == '/cart') {
            navigate('/cart', { replace: true })
        } else {
            navigate('/cart');
        }
    }

    return (
        <div className={styles.Layout}>
            <section className={`${styles.Header} + container`}>
                <div className={styles.LogoBlock}>
                    <h3 className={styles.Logo} onClick={() => navigate('/')}>O2legal</h3>
                </div>
                <div className={styles.Navigation}>
                    {/* <div className={styles.Cart} onClick={() => { openCart() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                        {cartLength > 0 ?
                            <div className={styles.CartNumber}>
                                <span>{cartLength}</span>
                            </div> : null}
                    </div> */}
                    {/* <Link to='/' >Home</Link>
                    <Link to='/practice'>Practice</Link>
                    <Link to='/team'>Team</Link>
                    <Link to='/blog'>Blog</Link>
                    <Link to='/contact'>Contact</Link> */}
                </div>
            </section>
            <section className={styles.MainContent}>
                <div className={styles.NotifContainer}>
                    <div className={`${styles.Notif} ${notif !== '' ? styles.NotifOpen : styles.NotifClosed}`}>
                        <p>{notif}</p>
                    </div>
                </div>
                {children}</section>
            <section className={styles.Footer}>
                <div className='container'>
                    <div className={styles.FooterArrange}>
                        <div className={styles.FooterInfo}>
                            <div className={styles.FooterLogo}>
                                <h3>O2legal</h3>
                            </div>
                            <div className={styles.ContactInfo}>
                                <p>No 21, Tokunbo Omisore Street, Lekki, Lagos State.</p>
                                <p className={styles.EmailAddr}>Info@O2Legal.com</p>
                            </div>
                        </div>
                        <div className={styles.FooterBase}>
                            <div className={styles.FooterNav}>
                                <Link to='/' >Home</Link>
                                <Link to='/practice'>Practice</Link>
                                <Link to='/team'>Team</Link>
                                <Link to='/blog'>Blog</Link>
                                <Link to='/contact'>Contact</Link>
                            </div>
                            <p>(c) Copyright 2024, All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminLayout