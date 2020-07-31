import React from 'react';

import SnackbarContent from "Client/components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
import WarningRounded from "@material-ui/icons/WarningRounded";

const Notification = ({color,text}) => {
    return (
        <div className="Notification">
            {color === "success" && <SnackbarContent
                message={
                <span>
                    {text}
                </span>
                }
                close
                color="success"
                icon={Check}/>}
            {color === "danger" && <SnackbarContent
                message={
                <span>
                    {text}
                </span>
                }
                close
                color="danger"
                icon={WarningRounded}/>}
            {color === "notification" && <SnackbarContent
                message={
                <span>
                    {text}
                </span>
                }
                close
                color="notification"
                />}
        </div>
    )
}

export default Notification;
