import React from 'react';
import TimeCard from './time-card';
function TimeList({ times, selectedTime, onTimeSelect }) {
    
    return (
        <div className="time-list d-flex justify-content-start flex-wrap" style={{ gap: 10 + 'px' }}>
            {(times.time).map((time, index) => (
                <TimeCard key={index} time={time} selected={selectedTime === time} onClick={() => onTimeSelect(time)} />
            ))}
        </div>
    );
}

export default TimeList;
