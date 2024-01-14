import React from 'react'

import Layout from '../../components/layout/Layout'
import styles from './Cart.module.css'
import { useRecoilState } from 'recoil'
import { cartState } from '../../state/atoms'
import { formatPrice } from '../../utils/utils'
import Button from '../../components/UI/button/Button'
import { useNavigate } from 'react-router-dom'
import ImageComponent from '../../utils/imageProcess'

const Cart = () => {
    const [cart, setCart] = useRecoilState(cartState)

    const navigate = useNavigate()

    const removeFromCart = cartItem => {
        const newCart = cart.filter(item => item.id !== cartItem.id)

        setCart(newCart);
    }

    const editCartItem = cartItem => {
        // navigate to the customize route with item info passed in navigate object to customize component
        navigate('/cart/edit', {
            state: cartItem
        })
    }

    const calcTotalCost = () => {
        let total = 0
        cart.forEach(item => {
            total += item.totalPrice
        })
        return total
    }

    const goToCheckout = () => {
        navigate('/checkout')
    }


    return (
        <Layout>
            <p className={styles.Title}>
                Cart
            </p>
            <div className={styles.CartContainer}>
                {
                    cart.length == 0 ?
                        <div className={styles.Empty}>
                            <p>Nothing in your cart yet</p>
                        </div>
                        : <>
                            {cart.map(item => {
                                return <div key={item.id} className={styles.CartItem}>
                                    <div className={styles.ItemImg}>
                                    <ImageComponent src={item.foodData.image.src} desc={item.foodData.image.desc} blurHash={item.foodData.image.blurHash} />
                                        {/* <img src={item.foodData.image} alt={item.foodData.name} /> */}
                                    </div>
                                    <div className={styles.ItemDetails}>
                                        <span className={styles.ItemTitle}>{item.foodData.name}</span>
                                        <p className={styles.ItemDesc}>{item.desc}</p>
                                    </div>
                                    <div className={styles.EditContainer}>
                                        <span className={styles.Edit} onClick={() => editCartItem(item)}>Edit</span>
                                        <span className={styles.Price}><span className='nairaGreen'>&#8358;</span>{formatPrice(item.totalPrice)}</span>
                                    </div>
                                    <div className={styles.Close} onClick={() => removeFromCart(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                    </div>
                                </div>
                            })}
                            <p className={styles.Total}>Total: <span className='nairaWhite'>&#8358;</span>{formatPrice(calcTotalCost())}</p>
                            <Button onPress={() => goToCheckout()}>Proceed To Checkout</Button>
                        </>
                }
            </div>
        </Layout>
    )
}

export default Cart