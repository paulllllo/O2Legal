import React, { forwardRef, useEffect, useState } from 'react'
import styles from './Contact.module.css'

import Layout from '../../components/layout/Layout'
import Input from '../../components/UI/input/Input'
import Button from '../../components/UI/button/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from 'date-fns'
import axios from 'axios'


export const dateInputFormat = {
    info: {
        title: "Info",
        elementType: 'textarea',
        elementConfig: {
            type: 'text',
            placeholder: 'What do you want to talk to us about?'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    topic: {
        title: "Topic",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'General topic or practice area'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    email: {
        title: "Email",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'johndoe@example.com'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    }
}

const offsetDate = (date, hours) => {
    date.setHours(date.getHours() + hours);
    return date;
}


const Contact = () => {
    const [dateInfo, setDateInfo] = useState(dateInputFormat)
    const [startDate, setStartDate] = useState(offsetDate(new Date(), 2));
    const [bookedDates, setBookedDates] = useState([]);




    const createAppointment = () => {
        const body = {
            'client': dateInfo.email.value,
            'topic': dateInfo.topic.value,
            'description': dateInfo.info.value,
            'state': 'pending',
            'date': startDate.toISOString()
        }

        axios.post("https://www.kelechio.tech/o2legal/api/v1/events", body)
            .then(data => console.log(data.data))   
            .catch(error => console.log(error));

        // reset inputs
        setDateInfo(dateInputFormat);
    }

    // DatePicker Functions
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.CustomInputBtn} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const checkAvail = (time) => {
        let avail = true;
        const selectedDate = new Date(time);
        bookedDates.forEach((date) => {
            const bookedDate = new Date(date);
            // console.log("time and date hours", selectedDate.getHours(), bookedDate.getHours());
            // `${selectedDate.getFullYear()}/${selectedDate.getMonth()}/${selectedDate.Date}/${selectedDate.getHours()}` === `${bookedDate.getFullYear()}/${bookedDate.getMonth()}/${bookedDate.Date}/${bookedDate.getHours()}`
            if (`${selectedDate.getFullYear()}/${selectedDate.getMonth()}/${selectedDate.getDate()}/${selectedDate.getHours()}` === `${bookedDate.getFullYear()}/${bookedDate.getMonth()}/${bookedDate.getDate()}/${bookedDate.getHours()}`){
                avail = false;
            }
        });
        return avail;
    }

    const timeFilter = (time) => {
        let passed = true;
        const currentDate = offsetDate(new Date(), 2);
        const selectedDate = new Date(time);

        // console.log("dateAvail?", checkAvail(time))
        passed = passed && checkAvail(time);
        passed = passed && !(selectedDate.getHours() < 9 || selectedDate.getHours() > 16);
        passed = passed && (currentDate.getTime() < selectedDate.getTime());

        return passed;
    };

    const dateFilter = (date) => {
        let passed = true;
        const day = getDay(date);
        const currentDate = new Date();
        passed = passed && (day !== 0 && day !== 6);
        passed = passed && (currentDate.getTime() < date.getTime());

        return passed
    };




    // 													Handles input form typing and updating
    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedInfo = {
            ...dateInfo
        }

        const updatedInfoElement = {
            ...updatedInfo[inputIdentifier]
        }

        updatedInfoElement.value = event.target.value;
        // updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
        // updatedInfoElement.touched = true

        updatedInfo[inputIdentifier] = updatedInfoElement

        // let formValid = true;

        // for (let inputIdentifier in updatedInfo) {
        // 	formValid = updatedInfo[inputIdentifier].valid && formValid;
        // }


        // this.setState({orderForm: updatedOrderForm, formValid: formValid});
        setDateInfo(updatedInfo);
        // setFormValid(formValid)
    }


    useEffect(() => {
        axios.get("https://www.kelechio.tech/o2legal/api/v1/events")
            .then(data => console.log(data.data))
            .catch(error => console.log(error));

        axios.get("https://www.kelechio.tech/o2legal/api/v1/eventdates")
            .then(data => {
                setBookedDates(data.data);  
                // console.log(data.data);
            })
            .catch(error => console.log(error));
    }, [])


    return (
        <Layout>
            <div className={`${styles.Picker} container`}>
                {/* <div className={styles.PickerPic}>
                    <img src='' alt='' />
                </div> */}
                <div className={styles.PickerCon}>
                    <div className={styles.PickerMain}>
                        <div className={styles.PickerTitle}>
                            <div className={styles.ColorBand}></div>
                            <h1>Schedule appointment</h1>
                        </div>
                        <p className={styles.Desc}>Choose a day and time you want to meet with us</p>
                        {/* <Input
                            title={dateInfo.date.title}
                            elementType={dateInfo.date.elementType}
                            elementConfig={dateInfo.date.elementConfig}
                            value={dateInfo.date.value}
                            changed={(event) => inputChangedHandler(event, "date")}
                        // invalid={!formElement.setup.valid}
                        // touched={formElement.setup.touched} 
                        /> */}
                        {/* <Input
                            title={dateInfo.time.title}
                            elementType={dateInfo.time.elementType}
                            elementConfig={dateInfo.time.elementConfig}
                            value={dateInfo.time.value}
                            changed={(event) => inputChangedHandler(event, "time")}
                        // invalid={!formElement.setup.valid}
                        // touched={formElement.setup.touched}
                        /> */}
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
                        <Input
                            title={dateInfo.email.title}
                            elementType={dateInfo.email.elementType}
                            elementConfig={dateInfo.email.elementConfig}
                            value={dateInfo.email.value}
                            changed={(event) => inputChangedHandler(event, "email")}
                        // invalid={!formElement.setup.valid}
                        // touched={formElement.setup.touched}
                        />
                        <Input
                            title={dateInfo.topic.title}
                            elementType={dateInfo.topic.elementType}
                            elementConfig={dateInfo.topic.elementConfig}
                            value={dateInfo.topic.value}
                            changed={(event) => inputChangedHandler(event, "topic")}
                        />
                        <Input
                            title={dateInfo.info.title}
                            elementType={dateInfo.info.elementType}
                            elementConfig={dateInfo.info.elementConfig}
                            value={dateInfo.info.value}
                            changed={(event) => inputChangedHandler(event, "info")}
                        />
                        <div className={styles.ButtonCon}>
                            <Button onPress={createAppointment}>Schedule</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact