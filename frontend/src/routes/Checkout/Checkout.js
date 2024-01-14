import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout/Layout'
import styles from './Checkout.module.css'
import Button from '../../components/UI/button/Button'
import { checkValidity, checkoutInfoFormat, formatDate, formatPrice } from '../../utils/utils'
import Input from '../../components/UI/input/Input'
import { useRecoilState } from 'recoil'
import { cartState, notifState } from '../../state/atoms'
import { useNavigate } from 'react-router-dom'
import db from '../../utils/firebase'
import { v4 as uuid } from "uuid";
import { addDoc, collection } from 'firebase/firestore'
import emailjs from "@emailjs/browser";
// import { usePaystackPayment } from 'react-paystack';
import { PaystackConsumer } from 'react-paystack';


const Checkout = () => {
	const [checkoutInfo, setCheckoutInfo] = useState(checkoutInfoFormat);
	const [formValid, setFormValid] = useState(false);
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	const [cart, setCart] = useRecoilState(cartState)
	const [notif, setNotif] = useRecoilState(notifState)


	const navigate = useNavigate()


// 								Calculates total cost of cart items
	const calcTotalCost = () => {
		let total = 0
		cart.forEach(item => {
			total += item.totalPrice
		})
		return total
	}


	const notify = (message) => {
		setNotif(message)
		setTimeout(() => {
			setNotif('')
		}, 2000)
	}


// 											Sends Emails to owner and user
	const sendEmails = async (userInfo, purchaseInfo) => {
		const serviceId = process.env.REACT_APP_SERVICE_ID
		const ownerTemplateId = process.env.REACT_APP_OWNER_TEMPLATE_ID
		const userTemplateId = process.env.REACT_APP_USER_TEMPLATE_ID


		// 											Send to owner email
		try {
			await emailjs.send(serviceId, ownerTemplateId, {
				user_name: userInfo.name,
				user_address: userInfo.address,
				user_email: userInfo.email,
				user_phone: userInfo.phone,
				order_details: parseOrders(),
				order_total: formatPrice(purchaseInfo.totalPrice),
				order_time: formatDate(purchaseInfo.date)
			});
		} catch (error) {
			console.log(error);
		}


		// 											Send to user
		try {
			await emailjs.send(serviceId, userTemplateId, {
				user_name: userInfo.name,
				user_address: userInfo.address,
				user_email: userInfo.email,
				user_phone: userInfo.phone,
				order_details: parseOrders(),
				order_total: formatPrice(purchaseInfo.totalPrice)
			});
		} catch (error) {
			console.log(error);
		}
	}


// 								Saves input info to db
	const saveToDB = async (input) => {

		try {
			const docRef = await addDoc(collection(db, "orders"), {
				id: uuid(),
				data: input
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}


// 								returns a formated string of items for Email template
	const parseOrders = () => {
		const orders = []
		cart.forEach(item => {
			const order = `${item.foodData.base.desc}, ${item.desc}`
			orders.push(order)
		})

		return orders.join('\n')
	}





// 							Set of helper functions that return objects with current state 
	const getUserInfo = () => {
		const userInfo = {
			name: checkoutInfo.name.value,
			email: checkoutInfo.email.value,
			phone: checkoutInfo.phone.value,
			address: checkoutInfo.address.value
		}

		return userInfo
	}

	const getPurchaseInfo = () => {
		const purchaseInfo = {
			items: cart,
			totalPrice: calcTotalCost(),
			user: getUserInfo(),
			date: new Date()
		}

		return purchaseInfo
	}

	const getPaymentConfig = () => {
		const paymentConfig = {
			reference: (new Date()).getTime().toString(),
			email: getUserInfo().email,
			amount: (getPurchaseInfo().totalPrice * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
			publicKey: process.env.REACT_APP_PS_PUBLIC_TEST_KEY,
		}

		return paymentConfig
	}


// 									Set of functions to handle payment gateway outcomes
	const onPaymentSuccess = (reference) => {
		// Send email to owner email and user email
		sendEmails(getUserInfo(), getPurchaseInfo())

		saveToDB(getPurchaseInfo())
		setCart([])
		navigate('/')

		notify('Order Successfull!')
	}

	const onPaymentClose = () => {
		notify('Payment Incomplete')
	}

// 						Props for Payment gateway context consumer
	const componentProps = {
		...getPaymentConfig(),
		text: 'Paystack Button Implementation',
		onSuccess: (reference) => onPaymentSuccess(reference),
		onClose: onPaymentClose
	};


	// 													Handles input form typing and updating
	const inputChangedHandler = (event, inputIdentifier) => {

		const updatedInfo = {
			...checkoutInfo
		}

		const updatedInfoElement = {
			...updatedInfo[inputIdentifier]
		}

		updatedInfoElement.value = event.target.value;
		updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
		updatedInfoElement.touched = true

		updatedInfo[inputIdentifier] = updatedInfoElement

		let formValid = true;

		for (let inputIdentifier in updatedInfo) {
			formValid = updatedInfo[inputIdentifier].valid && formValid;
		}


		// this.setState({orderForm: updatedOrderForm, formValid: formValid});
		setCheckoutInfo(updatedInfo);
		setFormValid(formValid)
	}


	const renderCheckoutInputs = () => {
		let signOption;
		let formElementsArray = [];

		for (let key in checkoutInfo) {
			formElementsArray.push(
				{
					id: key,
					setup: checkoutInfo[key]
				}
			)
		}

		return (formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				title={formElement.setup.title}
				elementType={formElement.setup.elementType}
				elementConfig={formElement.setup.elementConfig}
				value={formElement.setup.value}
				changed={(event) => inputChangedHandler(event, formElement.id)}
				invalid={!formElement.setup.valid}
				touched={formElement.setup.touched} />
		)))
	}


	useEffect(() => {
		// Redirect user home if checkout if navigated to when cart is empty
		if (cart.length === 0) {
			navigate('/')
		}

		// Sends user to previous page if they try to open checkout without internet to prevent 
		// if (!isOnline) {
		// 	navigate(-1)
		// 	notify('you\'re offline')
		// }

		// Initialize emailJS service
		const publicKey = process.env.REACT_APP_PUBLIC_KEY
		emailjs.init(publicKey)

		// Check if user is offline or online
		const onlineHandler = () => {
			setIsOnline(true);
			notify('Welcome back online!')
	  }
  
	  const offlineHandler = () => {
			setIsOnline(false);
			notify('you\'re offline')
	  }
  
	  window.addEventListener("online", onlineHandler);
	  window.addEventListener("offline", offlineHandler);

  
	  return () => {
			window.removeEventListener("online", onlineHandler);
			window.removeEventListener("offline", offlineHandler);
	  }
	}, [])



	return (
		<Layout >
			<p className={styles.Title}>Checkout</p>
			<div className={styles.Checkout}>
				<div className={styles.Summary} >
					<div className={styles.Container} >
						<div className={styles.OrdersArea}>
							<p className={styles.OrdersAreaTitle}>Your Orders</p>
							{cart.map(cartItem => {
								return <div key={cartItem.id} className={styles.Order}>
									<span className={styles.OrderName}>{cartItem.foodData.name}</span>
									<p className={styles.OrderDetails}>{cartItem.desc}</p>
									<span className={styles.OrderPrice}>{cartItem.totalPrice}</span>
								</div>
							})}
							<div className={styles.TotalLine}>
								<span className={styles.TotalTitle}>Total</span>
								<span className={styles.Total}>{formatPrice(calcTotalCost())}</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.CheckoutInfo}>
					<div className={styles.FormContainer}>
						<span className={styles.FormTitle}>Delivery Information</span>
						<form className={styles.CheckoutForm}>
							{
								renderCheckoutInputs()
							}
						</form>
						{/* <Button >Process Payment</Button> */}
						<PaystackConsumer {...componentProps} >
							{({ initializePayment }) => <Button isDisabled={!formValid} onPress={() => isOnline ? initializePayment(onPaymentSuccess, onPaymentClose) : notify('you\'re offline!')}>Process Payment</Button>}
						</PaystackConsumer>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Checkout
