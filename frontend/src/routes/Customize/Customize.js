import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout/Layout'
import styles from './Customize.module.css'
import Button from '../../components/UI/button/Button'
import { foodsInfo } from '../../utils/data'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cartLengthState } from '../../state/selectors'
import { cartState, notifState } from '../../state/atoms'
import { formatPrice } from '../../utils/utils'
import ImageComponent from '../../utils/imageProcess'


const Customize = () => {
	const [plate, setPlate] = useState([])
	const [food, setFood] = useState({})
	const [totalCost, setTotalCost] = useState(0)

	const [cart, setCart] = useRecoilState(cartState)
	const [notif, setNotif] = useRecoilState(notifState)

	const navigate = useNavigate()
	const params = useParams();
	const id = params.id;


	const parseGarnish = (garnishList) => {
		return garnishList.join(', ')
	}

	const addToCart = () => {
		const pack = {}

		pack['foodData'] = food
		pack['plate'] = plate
		pack['desc'] = parseGarnish(plate.map(item => item.desc))
		pack['totalPrice'] = totalCost
		pack['id'] = cart.length + 1


		setCart(prevCart => [...prevCart, pack])
		setPlate([])
		navigate('/')
		
		setNotif('Added to cart')
		setTimeout(() => {
			setNotif('')
		}, 2000)
	}

	const addToPlate = (garnish) => {
		// called when a garnish is clicked
		const itemExists = plate.filter(item => item.desc == garnish.desc)

		if (itemExists.length !== 0) {
			return;
		}

		setPlate(prevPlate => [...prevPlate, garnish])
	};


	const removeFromPlate = (item) => {
		// called when garnish is clicked on plate
		const garnishLeft = plate.filter(garnish => garnish.desc !== item.desc)

		setPlate(garnishLeft)
	};

	useEffect(() => {
		const foodArr = foodsInfo.filter(food => food.id == id)
		foodArr[0].garnishes.forEach(garnish => {
			if (garnish.default) {
				addToPlate(garnish);
			}
		})

		setFood(foodArr[0])
	}, [])

	useEffect(() => {
		let total = 0
		if (food.base){
			total += food.base.price
		}
		plate.forEach(item => {
			total += item.price;
		});
		setTotalCost(total)
	}, [food, plate])


	return (
		<Layout >
			{(Object.keys(food).length === 0) ? <p>Loading...</p> :
				<>
					<p className={styles.Title}>How Do You Like Your {food.name}?</p>
					<div className={styles.Customize}>
						<div className={styles.Options}>
							<div className={styles.FoodImg}>
							<ImageComponent src={food.image.src} desc={food.image.desc} blurHash={food.image.blurHash} />
								{/* <img src={food.image} alt={food.name} /> */}
							</div>
							<div className={styles.Garnishes}>
								<p>Click on a garnish to add to your plate</p>
								{food.garnishes.map(garnish => {
									return <span key={garnish.desc} className={styles.Garnish} onClick={() => addToPlate(garnish)}>{garnish.desc}</span>
								})}
							</div>
						</div>
						<div className={styles.Summary} >
							<div className={styles.Container} >
								<div className={styles.PlatingArea}>
									<div className={styles.Plate} >
										<p>Plate</p>
										<span className={styles.AddedGarn}>{food.base.desc}</span>
										{plate.map(item => {
											return <span key={item.desc} className={styles.AddedGarn} onClick={() => removeFromPlate(item)}>{item.desc}</span>
										})}
									</div>
									<span className={styles.Total} ><span className='nairaGreen'>&#8358;</span>{formatPrice(totalCost)}</span>
								</div>
							</div>
							<Button onPress={addToCart}>Add to cart</Button>
						</div>
					</div>
				</>}
		</Layout>
	)
}

export default Customize
