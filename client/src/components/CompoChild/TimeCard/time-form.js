import { React, useEffect, useState } from 'react';
import TimeList from './time-list';
import axios from 'axios';

function BookingTime(props) {
    const [timeList, setTimeList] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/services/times/${props.serviceID}`);
                setTimeList(res.data);
                setStatus(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.serviceID]);
    const localStorageTime = () => {
        let newLocalData = localStorage.getItem('time_stamp');

        if (newLocalData === null) {
            return null;
        } else {
            return newLocalData;
        }
    };

    const [selectedTime, setSelectedTime] = useState(localStorageTime());

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    useEffect(()=>{
        localStorage.setItem('time_stamp', selectedTime);
    },[selectedTime])

    return (
        <div className="booking-form ">
            {status ? <TimeList times={timeList} selectedTime={selectedTime} onTimeSelect={handleTimeSelect} /> : <></>}
        </div>
    );
}

export default BookingTime;
