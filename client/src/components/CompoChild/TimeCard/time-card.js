import React, { useState } from 'react';
import './time.css';

function TimeCard({ time, selected, onClick }) {
    // const [selectedTime,setSelectedTime] = useState('')

    return (
        <div className={`movie-time-card p-2 bg-light  ${selected ? 'selected' : ''}`} onClick={onClick}>
            <span>{time}</span>
        </div>
    );
}

export default TimeCard;
