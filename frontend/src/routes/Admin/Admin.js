import React, { forwardRef, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import axios from 'axios';
import styles from './Admin.module.css'
import Modal from '../../components/UI/modal/Modal';
import { dateFilter, timeFilter, offsetDate } from '../../utils/dateUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../components/UI/button/Button';
import { useRef } from 'react';
import { notifState } from '../../state/atoms';
import { useRecoilState } from 'recoil';



const Admin = () => {
    const [events, setEvents] = useState([]);
    const [pendingCount, setPendingCount] = useState();
    const [showModal, setShowModal] = useState(false);
    const [openIndex, setOpenIndex] = useState(null)
    const [rescheduleId, setRescheduleId] = useState('');
    const [startDate, setStartDate] = useState(offsetDate(new Date(), 2))
    const [notif, setNotif] = useRecoilState(notifState);

    const windowSize = useRef([window.innerWidth, window.innerHeight]);



    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.CustomInputBtn} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const notify = (message) => {
		setNotif(message)
		setTimeout(() => {
			setNotif('')
		}, 2000)
	}

    const openDeets = (index) => {
        if (index === openIndex) {
            return setOpenIndex(null);
        }
        setOpenIndex(index);
    }

    const toggleModal = () => {
        return setShowModal(prev => !prev);
    }

    const changeDate = (id) => {
        setRescheduleId(id);
        toggleModal();
    }

    const reschedule = (id) => {
        const eventsCopy = [...events];
        const eventFx = eventsCopy.map((event) => {
            if (event.id === id) {
                const newEvent = { ...event }
                newEvent.date = startDate.toISOString();
                return newEvent;
            }
            return event;
        });

        setEvents(eventFx);
        setRescheduleId('');
        toggleModal();


        const body = {
            id: id,
            date: startDate.toISOString()
        }

        axios.put("https://www.kelechio.tech/o2legal/api/v1/reschedule", body)
            .then(data => {
                console.log(data.data);
                notify('Appointment Rescheduled Successfully')
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error);
                notify('Error in rescheduling')
            });
    }

    const getPending = () => {
        if (events.length < 1) return 0;
        // console.log("Events object in admin.js", events);
        const pendingEvents = events.filter(event => {
            return (
                event.state === "pending"
            );
        })
        return pendingEvents.length;
    }

    const cancelDate = (eventId) => {
        const eventsCopy = [...events];

        const newEvents = eventsCopy.filter((event) => event.id !== eventId);
        setEvents(newEvents);

        const body = {
            "id": eventId
        }

        axios.post("https://www.kelechio.tech/o2legal/api/v1/cancel-date", body)
            .then(data => {
                console.log(data.data);
                notify('Appointment deleted')
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error)
                notify('Error in deleting')
            });
    }

    const confirmDate = (eventId) => {
        const eventsCopy = [...events];
        const eventFx = eventsCopy.map((event) => {
            if (event.id === eventId) {
                const newEvent = { ...event }
                newEvent.state = 'confirmed';
                return newEvent;
            }
            return event;
        });
        setEvents(eventFx);

        const body = {
            "id": eventId
        }

        axios.post("https://www.kelechio.tech/o2legal/api/v1/confirm-date", body)
            .then(data => {
                console.log(data.data);
                notify('Date has been confirmed')
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error);
                notify('Error in Confirming Date')
            });
    }

    const dateParser = date => {
        const dateObj = new Date(date);
        const format = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }

        const formatter = new Intl.DateTimeFormat('en-US', format);

        return formatter.format(dateObj);
    }

    const shorten = (str) => {
        return (str.slice(0, 35) + '...');
    }


    useEffect(() => {
        axios.get("https://www.kelechio.tech/o2legal/api/v1/events")
            .then(data => {
                console.log(data.data);
                setEvents(data.data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {

    }, [])

    return (
        <AdminLayout>
            <div className={`${styles.Appointments} container`}>
                <h1>Appointments</h1>
                <div className={styles.Notif}>
                    <p>You have {getPending()} pending bookings</p>
                </div>
                <div className={styles.Bookings}>
                    {windowSize.current[0] > 800 ?
                        events.map((event) => {
                            return (<div className={styles.Booking} key={event.id}>
                                <div className={styles.BookingIcon}></div>
                                <span className={styles.Email}>{event.client}</span>
                                <span className={styles.Topic}>{event.topic}</span>
                                <div className={styles.DescCon}>
                                    <p className={styles.Desc}>{shorten(event.description)}</p>
                                    <span className={styles.FullDesc}>{event.description}</span>
                                </div>
                                <span className={event.state === 'pending' ? styles.Pending : styles.Confirmed}>{event.state}</span>
                                <span className={styles.Date}>{dateParser(event.date)}</span>
                                {/* Nov 15, 2024. 10:00am */}
                                <button className={styles.Reschedule} onClick={() => changeDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Reschedule</button>
                                <button className={styles.Confirm} onClick={() => confirmDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Confirm</button>
                                <div className={styles.Close} onClick={() => cancelDate(event.id)}>X</div>
                            </div>)
                        })
                        : events.map((event, index) => {
                            return (<div className={styles.MBooking} key={event.id}>
                                <div className={styles.MCon}>
                                    <div className={event.state === 'pending' ? styles.MIconR : styles.MIcon}></div>
                                    <span className={styles.MTopic}>{event.topic}</span>
                                    <a className={openIndex === index ? styles.ArrowOpen : styles.Arrow} onClick={() => openDeets(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z" /></svg>
                                    </a>
                                    {/* <div className={styles.Close} onClick={() => cancelDate(event.id)}>X</div> */}
                                </div>
                                <div className={openIndex === index ? styles.Deetsopen : styles.Deetsclose}>
                                    <span className={styles.MEmail}>
                                        <a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg></a>
                                        {event.client}</span>
                                    <span className={styles.MFullDesc}>
                                        <a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" /></svg></a>
                                        {event.description}</span>
                                    <span className={event.state === 'pending' ? styles.Pending : styles.Confirmed}>
                                        <a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg></a>
                                        {event.state}</span>
                                    <span className={styles.MDate}>
                                        <a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg></a>
                                    {dateParser(event.date)}</span>
                                    <div className={styles.ButtonArr}>
                                        <button className={styles.Reschedule} onClick={() => changeDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Reschedule</button>
                                        <button className={styles.Confirm} onClick={() => confirmDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Confirm</button>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                    <Modal onPress={() => toggleModal()} show={showModal}>
                        <h3>Reschedule</h3>
                        <DatePicker
                            // showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            toggleCalendarOnIconClick
                            customInput={<CustomInput />}
                            showTimeSelect
                            filterTime={timeFilter}
                            filterDate={dateFilter}
                            dateFormat="MMMM d, yyyy h:mm aa"
                        // icon="fa fa-calendar"
                        />
                        <div className={styles.ButtonCon}>
                            <Button onPress={() => reschedule(rescheduleId)}>reschedule</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Admin