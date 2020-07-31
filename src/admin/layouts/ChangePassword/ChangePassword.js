import React, { useState } from 'react';

import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loading from 'admin/blast/views/UI/Loading/Loading';

import { updateState } from '../../store/Utils/Update';
import { Auth } from 'aws-amplify';
import Notification from 'admin/blast/views/UI/Notification/Notification';
import Button from 'admin/components/CustomButtons/Button';

const ChangePassword = (props) => {
    const [ userdata,updateData ] = useState({username: '',code: '',password: ''});
    const [ ui,update ] = useState({loading: false,success: null,error: null});

    const ChangePassword = () => {
        update({loading: true,success: null,error: null})
        Auth.forgotPasswordSubmit(userdata.username,userdata.code,userdata.password)
        .then(() => update({loading: false,success: `Password Changed Successfully`}))
        .catch(err => update({loading: false,error: err.message}));
        setTimeout(() => props.history.push('/admin/sign-in'), 2000);
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
                      <label>User-name *</label><br/>
                   </div>
                   <input type="text" className="Input-Box" placeholder="administrator username" value={userdata.username} 
                    onChange={event => updateState('username',updateData,event.target.value)}/>
                   <br/>
                   <div className="Input-Label">
                      <label>New Password *</label><br/>
                   </div>
                   <input type="password" className="Input-Box" placeholder="new password" value={userdata.password} 
                    onChange={event => updateState('password',updateData,event.target.value)}/>
                   <br/>
                   <div className="Input-Label">
                      <label>Code *</label><br/>
                   </div>
                   <input type="text" className="Input-Box" placeholder="code" value={userdata.code} 
                    onChange={event => updateState('code',updateData,event.target.value)}/>
                   <br/>
                   <Link to="/admin/sign-in" className="SignIn-Link-4">Cancel</Link>
                   <Button color="facebook" size="sm" disabled={userdata.username === '' || userdata.password === '' || userdata.code === ''} onClick={ChangePassword}>Change Password</Button><br/>
                </div>}
            </Card>
        </div>
    )
}

export default ChangePassword;