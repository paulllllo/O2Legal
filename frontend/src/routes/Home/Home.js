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
import Testimonial1 from '../../Assets/Testimonial1.jpg'
import Testimonial2 from '../../Assets/Testimonial2.jpg'
import Testimonial3 from '../../Assets/Testimonial3.jpg'



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
					{/* <div className={styles.BaseContainer}></div> */}
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
							<p>This specialization includes contract negotiation and disputes, IP law, compensation and royalties, and more. You could be dealing with some big-name clients if you find success, so it’s important for you to avoid getting intimidated.</p>
						</div>
						<div className={styles.Area}>
							<h3>.02</h3>
							<h4>Complex Litigation</h4>
							<p>This is an area of law that demands a lot of patience and incredible attention to detail. Complex litigation is one of the more lucrative specializations because they involve high-stakes, corporate lawsuits and a lot of motions filed in court.</p>
						</div>
						<div className={styles.Area}>
							<h3>.03</h3>
							<h4>Corporate Law</h4>
							<p>Corporate law also handles business affairs, but it is more concerned with day-to-day, typical practices. Things like contracts, compliance, and liability fall under this umbrella.</p>
						</div>
						<div className={styles.Area}>
							<h3>.04</h3>
							<h4>Intellectual property</h4>
							<p>In the age of the internet, intellectual property (IP) is more important than ever before. From trademarks, to copyrights, to patents, and beyond, lawyers who work in IP help people protect their ideas and projects from duplication or theft.</p>
						</div>
						<div className={styles.Area}>
							<h3>.05</h3>
							<h4>Tax law</h4>
							<p>Tax law is complex and always evolving, so it is an exciting practice area to enter. Tax attorneys can help guide people through audits and other issues with the IRS, as well as with estate planning.</p>
						</div>
						<div className={styles.Area}>
							<h3>.06</h3>
							<h4>Healthcare Law</h4>
							<p>It’s been a hot topic for quite some time, and healthcare laws in the US are still in flux. Therefore, professionals who are up to date on regulations and can navigate the landscape successfully will reap the benefits.</p>
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
							<div className={styles.OfferIcon}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg>
							</div>
							<h4>Personalized Client Service</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Offer}>
							<div className={styles.OfferIcon}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
							</div>
							<h4>Fast Response Time</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<div className={styles.Offer}>
							<div className={styles.OfferIcon}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z"/></svg>
							</div>
							<h4>Confidential Interactions</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.Testimonials} ${styles.GradUpToDown}`}>
				<div className='container'>
					<h3 className={styles.TestimonialTitle}>What our clients say</h3>
					<div className={styles.TestimonialCon}>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}>
									<img src={Testimonial1}  alt='potrait' />
								</div>
								<div className={styles.UserInfo}>
									<span className={styles.UserName}>Marcus Roman</span>
									<span className={styles.UserJob}>Founder, Urban Shelters</span>
								</div>
							</div>
						</div>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}>
									<img src={Testimonial2}  alt='potrait' />
								</div>
								<div className={styles.UserInfo}>
									<span className={styles.UserName}>Marcus Roman</span>
									<span className={styles.UserJob}>Founder, Urban Shelters</span>
								</div>
							</div>
						</div>
						<div className={styles.Testimonial}>
							<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
							<div className={styles.UserDetails}>
								<div className={styles.UserPic}>
									<img src={Testimonial3}  alt='potrait' />
								</div>
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
					<h3 className={styles.BlogsTitle}>Blog Articles</h3>
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
					<Button onPress={()=>console.log("Nothing here yet")}>View more articles</Button>
				</div>
			</div>
		</Layout>
	)
}

export default Home