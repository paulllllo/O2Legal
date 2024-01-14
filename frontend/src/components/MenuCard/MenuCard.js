import React from 'react'

import styles from './MenuCard.module.css'
// import stew from '../../Assets/Stew.png'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../../utils/utils';
import ImageComponent from '../../utils/imageProcess';

const MenuCard = ({id, title, price, image}) => {

  const navigate = useNavigate();

  const goToFood = () => {
    navigate('/customize/' + id);
  }

  return (
    <div className={styles.MenuCard} onClick={() => goToFood()}>
        <div className={styles.CardImg}>
        <ImageComponent src={image.src} desc={image.desc} blurHash={image.blurHash} />
          {/* <img src={image} alt='Food Image' /> */}
        </div>
        <span className={styles.Name}>{title}</span>
        <span className={styles.Price}><span className='nairaBlack'>&#8358;</span>{formatPrice(price)}</span>
    </div>
  )
}

export default MenuCard