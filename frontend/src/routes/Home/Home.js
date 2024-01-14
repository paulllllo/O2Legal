import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'
import Layout from '../../components/layout/Layout'
import Button from '../../components/UI/button/Button'
import Hero1 from '../../Assets/foldingarms.png'
import Hero2 from '../../Assets/lady original.png'
import Hero3 from '../../Assets/nerd.png'
import Statue1 from '../../Assets/statue1.png'
import Statue2 from '../../Assets/statue2.png'
import BlogImage1 from '../../Assets/BlogImage1.jpg'
import BlogImage2 from '../../Assets/BlogImage2.jpg'
import { useNavigate } from 'react-router-dom'



const Home = () => {
	const navigate = useNavigate();

	const bookAppointment = () => {
		navigate('/contact');
	}

	return (
		<Layout>
			<div className={`${styles.Hero} container`}>
				<div className={styles.Gradient}></div>
				<div className={styles.Arrange}>
					<div className={styles.ContentCon}>
						<div className={styles.HeroContent}>
							<h1>The best Legal team working for your business</h1>
							<Button onPress={()=>bookAppointment()}>Book an appointment</Button>
						</div>
						<div className={styles.HeroSpace}></div>
					</div>
					<div className={styles.BaseContainer}></div>
					<div className={styles.BaseBar}>
						<div className={styles.HeroImgCon}>
							<div className={styles.HeroImg}>
								<img src={Hero1} alt="man smiling" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.About} container`}>
				<div className={styles.AboutImg}>
					<img src={Statue1} alt="statue" />
				</div>
				<div className={styles.AboutText}>
					<h3>What we do</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
				</div>
			</div>
			<div className='container'>
				<div className={styles.Stats}>
					<div className={styles.Stat}>
						<h3>280+</h3>
						<span>case study</span>
					</div>
					<div className={styles.Stat}>
						<h3>98%</h3>
						<span>cases won</span>
					</div>
					<div className={styles.Stat}>
						<h3>120+</h3>
						<span>happy clients</span>
					</div>
				</div>
			</div>


			<div className={`${styles.Practice} ${styles.GradUpToDown}`}>
				<div className='container'>
					<span className={styles.PracticeTitle}>Practice Areas</span>
					<div className={styles.Areas}>
						<div className={styles.Area}>
							<h3>.01</h3>
							<h4>International Trade Litigation</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Area}>
							<h3>.02</h3>
							<h4>International Trade Litigation</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Area}>
							<h3>.03</h3>
							<h4>International Trade Litigation</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Area}>
							<h3>.04</h3>
							<h4>International Trade Litigation</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.Offers} ${styles.GradUpToDown}`}>
				<div className={`${styles.OffersArrange} container`}>
					<div className={styles.OfferImg}>
						<img src={Statue2} alt='statue of man' />
					</div>
					<div className={styles.OfferCon}>
						<h3>What you get</h3>
						<div className={styles.Offer}>
							<div className={styles.OfferIcon}></div>
							<h4>Personalized Client Service</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Offer}>
							<div className={styles.OfferIcon}></div>
							<h4>Personalized Client Service</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Offer}>
							<div className={styles.OfferIcon}></div>
							<h4>Personalized Client Service</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.Testimonials} ${styles.GradUpToDown}`}>
				<div className='container'>
					<span className={styles.TestimonialTitle}>What our clients say</span>
					<div className={styles.TestimonialCon}>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}></div>
								<div className={styles.UserInfo}>
									<span className={styles.UserName}>Marcus Roman</span>
									<span className={styles.UserJob}>Founder, Urban Shelters</span>
								</div>
							</div>
						</div>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}></div>
								<div className={styles.UserInfo}>
									<span className={styles.UserName}>Marcus Roman</span>
									<span className={styles.UserJob}>Founder, Urban Shelters</span>
								</div>
							</div>
						</div>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}></div>
								<div className={styles.UserInfo}>
									<span className={styles.UserName}>Marcus Roman</span>
									<span className={styles.UserJob}>Founder, Urban Shelters</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className={`${styles.Blogs} ${styles.GradUpToDown}`}>
				<div className='container'>
					<span className={styles.BlogsTitle}>Blog Articles</span>
					<div className={styles.BlogsCon}>
						<div className={styles.BlogPost}>
							<div className={styles.BlogImg}>
								<img src={BlogImage1} alt='group of people'/>
							</div>
							<p className={styles.TimeStamp}>January 28, 2024</p>
							<h5 className={styles.BlogTitle}>How to review a contract before sending it to your lawyer</h5>
						</div>
						<div className={styles.BlogPost}>
							<div className={styles.BlogImg}>
								<img src={BlogImage2} alt='group of people'/>
							</div>
							<p className={styles.TimeStamp}>January 28, 2024</p>
							<h5 className={styles.BlogTitle}>How to review a contract before sending it to your lawyer</h5>
						</div>
					</div>
					<Button>View more articles</Button>
				</div>
			</div>
		</Layout>
	)
}

export default Home