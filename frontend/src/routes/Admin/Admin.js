import React, { forwardRef, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import axios from 'axios';
import styles from './Admin.module.css'
import Modal from '../../components/UI/modal/Modal';
import { dateFilter, timeFilter, offsetDate } from '../../utils/dateUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../components/UI/button/Button';



const Admin = () => {
    const [events, setEvents] = useState([]);
    const [pendingCount, setPendingCount] = useState();
    const [showModal, setShowModal] = useState(false);
    const [rescheduleId, setRescheduleId] = useState('');
    const [startDate, setStartDate] = useState(offsetDate(new Date(), 2))



    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.CustomInputBtn} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));



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
            if (event.id === id){
                const newEvent = {...event}
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
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error);
            });
    }

    const getPending = () => {
        if(events.length  < 1) return 0;
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
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error)
            });
    }

    const confirmDate = (eventId) => {
        const eventsCopy = [...events];
        const eventFx = eventsCopy.map((event) => {
            if (event.id === eventId){
                const newEvent = {...event}
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
            })
            .catch(error => {
                setEvents(eventsCopy);
                console.log(error);
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
                    {events.map((event) => {
                        return (<div className={styles.Booking} key={event.id}>
                            <div className={styles.BookingIcon}></div>
                            <span className={styles.Email}>{event.client}</span>
                            <span className={styles.Topic}>{event.topic}</span>
                            <div className={styles.DescCon}>
                                <p className={styles.Desc}>{shorten(event.description)}</p>
                                <span className={styles.FullDesc}>{event.description}</span>
                            </div>
                            <span className={styles.State}>{event.state}</span>
                            <span className={styles.Date}>{dateParser(event.date)}</span>
                            {/* Nov 15, 2024. 10:00am */}
                            <button className={styles.Reschedule} onClick={() => changeDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Reschedule</button>
                            <button className={styles.Confirm} onClick={() => confirmDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Confirm</button>
                            <div className={styles.Close} onClick={() => cancelDate(event.id)}>X</div>
                        </div>)
                    })}
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