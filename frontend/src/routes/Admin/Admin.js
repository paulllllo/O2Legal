import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import axios from 'axios';
import styles from './Admin.module.css'


const temp_desc = "I would like to discuss the possibility of your firm to represent me in a basic litigation case. More details will be revealed"

const Admin = () => {
    const [events, setEvents] = useState([])
    const [pendingCount, setPendingCount] = useState()


    const getPending = () => {
        const pendingEvents = events.filter(event => event.state === "pending");
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
                console.log(error)});
    }

    const confirmDate = (eventId) => {
        const body = {
            "id": eventId
        }

        axios.post("https://www.kelechio.tech/o2legal/api/v1/confirm-date", body)
            .then(data => {
                console.log(data.data);
            })
            .catch(error => console.log(error));
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
                            {/* <button className={styles.Reschedule} onClic    k={()=>confirmDate(event.id)}>Reschedule</button> */}
                            <button className={styles.Confirm} onClick={()=>confirmDate(event.id)} disabled={event.state === "confirmed" ? true : false}>Confirm</button>
                            <div className={styles.Close} onClick={()=>cancelDate(event.id)}>X</div>
                        </div>)
                    })}
                </div>
            </div>
        </AdminLayout>
    )
}

export default Admin