import React, { useState,useEffect } from 'react';

import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserAuth,ConfirmUser } from '../../store/Actions/ActionTypes';
import { updateState } from '../../store/Utils/Update';
import Notification from '../../blast/views/UI/Notification/Notification';
import Loading from '../../blast/views/UI/Loading/Loading';
import './SignIn.css';

const SignIn = (props) => {
    const [ userdata,updateData ] = useState({username: '',password: ''});
    const [ loading,update ] = useState(true);
    const [ confirmUser,setConfirmation ] = useState(null);
    setTimeout(() => update(false),3000);

    useEffect(() => {
        setTimeout(() => {
            setConfirmation(props.user);
        },3000)
        if(props.user){
            console.log(props.user);
        }
    },[props.user])
    
    const signIn = (event) => {
        event.preventDefault();
        props.onAuth(userdata.username,userdata.password);
    }

    const onConfirmAccount = (event) => {
        event.preventDefault();
        props.confirmAccount(confirmUser,userdata.password);
    }

    return (
        <div className="SignIn-Box">
                {!confirmUser ?<Card className="SignIn">
                    <section className="Header-Section">
                        <span className="Heading">Sign in as administrator</span>
                    </section>
                    { props.error && <Notification text={props.error} color="danger" close/> }
                    { loading && <Loading text="Initialising Sign In Please Wait."/> }
                    { props.loading && <Loading text="Checking credentials please wait.."/> }
                    { !props.loading && !loading && <form onSubmit={(event => signIn(event))}>
                        <div className="Input-Label">
                        <label>User-name *</label><br/>
                    </div>
                    <input type="text" className="Input-Box" placeholder="Enter your user-name" 
                        value={userdata.username} onChange={event => updateState('username',updateData,event.target.value)}/>
                    <br/>
                    <div className="Input-Label">
                        <label>Password *</label><br/>
                    </div>
                    <input type="password" className="Input-Box" placeholder="Enter your password" value={userdata.password} 
                        onChange={event => updateState('password',updateData,event.target.value)}/><br/>
                        <div className="Hint">
                        <Link to="/admin/forgot-password" className="SignIn-Link-2">Forgot Password</Link>
                        <Link to="/admin/change-password" className="SignIn-Link-3">Change Password</Link>
                        </div>
                        <a href="/" className="SignIn-Link">Not administrator,leave page</a>
                        <button className="SignIn-Btn">Sign In</button>
                    </form>}
                </Card> : 
                <Card className="SignIn">
                    <section className="Header-Section">
                        <span className="Heading">Confirm Account</span>
                    </section>
                    { props.error && <Notification text={props.error} color="danger" close/> }
                    { loading && <Loading text="Initialising Sign In Please Wait."/> }
                    { props.loading && <Loading text="Confirming Account Please Wait.."/> }
                    { !props.loading && !loading && <form onSubmit={(event => onConfirmAccount(event))}>
                        <div className="Input-Label">
                        <label>User-name *</label><br/>
                    </div>
                    <input type="text" className="Input-Box" placeholder="Enter your user-name" 
                        value={userdata.username} onChange={event => updateState('username',updateData,event.target.value)}/>
                    <br/>
                    <div className="Input-Label">
                        <label>Password *</label><br/>
                    </div>
                    <input type="password" className="Input-Box" placeholder="Enter New Password" value={userdata.password} 
                        onChange={event => updateState('password',updateData,event.target.value)}/><br/>
                        <a href="/" className="SignIn-Link">Not administrator,leave page</a>
                        <button className="SignIn-Btn">Sign In</button>
                    </form>}
                </Card>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username,password) => dispatch(UserAuth(username,password)),
        confirmAccount: (user,password) => dispatch(ConfirmUser(user,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
