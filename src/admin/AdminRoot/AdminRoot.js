import React,{ useEffect } from 'react';

import { Switch,Route,Redirect } from 'react-router-dom';
import AdminLayout from "../layouts/Admin.js";
import SignIn from '../layouts/SignIn/SignIn';
import { connect } from 'react-redux';
import { AutoAuth } from '../store/Actions/ActionTypes';
import ForgotPassword from '../layouts/ChangePassword/ChangePassword';
import ResetPassword from '../layouts/ResetPassword/ResetPassword';
import ChangePassword from '../layouts/ChangePassword/ChangePassword';

const AdminRoot = ({ authState,AutoAuth }) => {
    useEffect(() => {
        AutoAuth()
    },[ AutoAuth ])
    return (
        <div>
          { authState ? 
            <Switch>
                <Route path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>: 
            <Switch>
              <Route path="/admin/sign-in" component={SignIn}/>
              <Route path="/admin/forgot-password" component={ResetPassword}/>
              <Route path="/admin/change-password" component={ResetPassword}/>
              <Route path="/admin/reset-password" component={ChangePassword}/>
              <Redirect from="/admin"  to="/admin/sign-in"/>
            </Switch>}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        authState: state.AuthState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AutoAuth: () => dispatch(AutoAuth())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminRoot);
