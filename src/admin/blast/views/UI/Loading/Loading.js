import React from 'react';

import './Loading.css';
import { CircularProgress } from '@material-ui/core';

const Loading = ({text}) => {
    return (
    <div className="Loader-Box">
        <div className="Loading-Box">
            <CircularProgress />
            <p>{text}</p>
        </div>
    </div>
    )
}

export default Loading
