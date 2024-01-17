import axios from 'axios';
import { getDay } from 'date-fns';

let bookedDates = null;


export const checkAvail = (time) => {
    let avail = true;
    if (!bookedDates) {
        axios.get("https://www.kelechio.tech/o2legal/api/v1/eventdates")
            .then(data => {
                bookedDates = data.data;
            })
            .catch(error => console.log(error));
    }
    else {
        const selectedDate = new Date(time);
        bookedDates.forEach((date) => {
            const bookedDate = new Date(date);
            if (`${selectedDate.getFullYear()}/${selectedDate.getMonth()}/${selectedDate.getDate()}/${selectedDate.getHours()}` === `${bookedDate.getFullYear()}/${bookedDate.getMonth()}/${bookedDate.getDate()}/${bookedDate.getHours()}`) {
                avail = false;
            }
        });
    }
    return avail;
}

export const timeFilter = (time) => {
    let passed = true;
    const currentDate = offsetDate(new Date(), 2);
    const selectedDate = new Date(time);

    passed = passed && checkAvail(time);
    passed = passed && !(selectedDate.getHours() < 9 || selectedDate.getHours() > 16);
    passed = passed && (currentDate.getTime() < selectedDate.getTime());

    return passed;
};

export const dateFilter = (date) => {
    let passed = true;
    const day = getDay(date);
    const currentDate = new Date();
    passed = passed && (day !== 0 && day !== 6);
    passed = passed && (currentDate.getTime() < date.getTime());

    return passed
};

export const offsetDate = (date, hours) => {
    date.setHours(date.getHours() + hours);
    return date;
}