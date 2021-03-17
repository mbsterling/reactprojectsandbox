import React, { useEffect } from 'react';

const TotalTime = (props) => {

    useEffect(() => {
        console.log(props.timein);
    }, []);

    return (
        <div>
            <p>00:30:00</p>
        </div>
    );
}

export default TotalTime;