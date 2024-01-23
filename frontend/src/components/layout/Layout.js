import React, { useEffect, useRef, useState } from 'react'

import styles from './Layout.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cartLengthState } from '../../state/selectors'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notifState } from '../../state/atoms'
// import { MyContext } from '../../utils/myContext'
// import { useContext, useState } from 'react'
// import Button from '../UI/button/Button'

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const navigate = useNavigate();
    const location = useLocation();

    const cartLength = useRecoilValue(cartLengthState);
    const [notif, setNotif] = useRecoilState(notifState);


    const menuToggle = () => {
        setMenuOpen(prev => !prev);
    }


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
                {windowSize.current[0] > 500 ?
                    (<div className={styles.Navigation}>
                        <Link to='/' >Home</Link>
                        {/* <Link to='/practice'>Practice</Link> */}
                        <Link to='/team'>Team</Link>
                        <Link to='/contact'>Contact</Link>
                        <Link to='/blog'>Blog</Link>
                    </div>)
                    : (<>
                        <div className={styles.Menu}>
                            <div className={`${styles.MenuBar} ${menuOpen ? styles.Change : ''}`} onClick={() => menuToggle()}>
                                <div className={`${styles.Bar} ${styles.Bar1}`}></div>
                                <div className={`${styles.Bar} ${styles.Bar2}`}></div>
                                <div className={`${styles.Bar} ${styles.Bar3}`}></div>
                            </div>
                            <nav className={`${styles.Nav} ${menuOpen ? styles.Change : ''}`}>
                                <ul>
                                    {/* <Link to='/' >Home</Link>
                                    <Link to='/practice'>Practice</Link>
                                    <Link to='/team'>Team</Link>
                                    <Link to='/blog'>Blog</Link>
                                    <Link to='/contact'>Contact</Link> */}
                                    <li><Link to='/' >Home</Link></li>
                                    <li><Link to='/'>Team</Link></li>
                                    {/* <li><a href="#">Practice</a></li> */}
                                    <li><Link to='/contact'>Contact</Link></li>
                                    <li><Link to='/'>Blog</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className={`${styles.MenuBG} ${menuOpen ? styles.ChangeBG : ''}`}></div>
                        <div className={`${styles.MenuBack} ${menuOpen ? styles.ChangeBack : ''}`} onClick={() => menuToggle()}></div>
                    </>)}
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

export default Layout