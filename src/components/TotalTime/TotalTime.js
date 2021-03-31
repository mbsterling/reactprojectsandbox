import React, { useEffect, useState } from 'react';
//https://momentjs.com/
import moment from 'moment';

const TotalTime = (props) => {

    const[totalTime, setTotalTime] = useState("00:00:00");

    useEffect(() => {        
        let now = Date().toLocaleString();
        let timeIn = new Date(props.timein);
        console.log(now + '' + timeIn);

        now = moment(now);
        timeIn = moment(timeIn);

        var differceBetweenTheDates = moment(now).diff(moment(timeIn), 'minutes');
        var d = Math.floor(differceBetweenTheDates / 1440);
        var remainingMinutes = differceBetweenTheDates % 1440;
        //FORMATT THE TIME STRING
        var h = Math.floor(remainingMinutes / 60) < 10 ? 
            "0" + Math.floor(remainingMinutes / 60) : Math.floor(remainingMinutes / 60);
        var m = remainingMinutes % 60 < 10 ? "0" + remainingMinutes % 60 : remainingMinutes % 60;
        
        console.log("00:" + h.toString() + ":" + m.toString());
        setTotalTime(d.toString() + ":" + h.toString() + ":" + m.toString());
        
    }, []);

    return (
        <div>
            <p>{totalTime}</p>
        </div>
    );
}

export default TotalTime;