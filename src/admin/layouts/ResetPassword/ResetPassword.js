import React, { useState } from 'react';

import { Card } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import Loading from 'admin/blast/views/UI/Loading/Loading';

import { updateState } from 'admin/store/Utils/Update';
import { Auth } from 'aws-amplify';
import Notification from 'admin/blast/views/UI/Notification/Notification';
import Button from 'admin/components/CustomButtons/Button';

const ResetPassword = (props) => {
    const [ userdata,updateData ] = useState({username: ''});
    const [ ui,update ] = useState({loading: false,success: null,error: null});

    const getCode = () => {
        update({loading: true,alert: null,error: null})
        Auth.forgotPassword(userdata.username)
        .then(() => {
            update({loading: false,success: `Reset Code Sent To email`});
            setTimeout(() => {
                console.log("Redirecting...")
                props.history.push("/admin/reset-password");
                console.log("Redirected");
            }, 2000)
        })
        .catch(err => update({loading: false,error: err.message}));
    }
    return (
        <div className="SignIn-Box">
            <Card className="SignIn">
                <h4>Forgot Password</h4>
                { ui.success && <Notification text={ui.success} color="success"/> }
                { ui.error && <Notification text={ui.error} color="danger"/> }
                { ui.loading && <Loading text="Initialising Reset Please Wait."/> }
                { !ui.loading && <div>
                    <div className="Input-Label">
                        <label>User-name *</label>
                    </div>
                   <input type="text" className="Input-Box" placeholder="Enter Your Username" value={userdata.username} 
                    onChange={event => updateState('username',updateData,event.target.value)}/>
                   <br/>
                   <Link to="/admin/sign-in" className="SignIn-Link-4">Cancel</Link>
                   <Button color="success" size="sm" disabled={userdata.username === ''} onClick={getCode}>Get Code</Button><br/>
                </div>}
            </Card>
        </div>
    )
}

export default ResetPassword;
