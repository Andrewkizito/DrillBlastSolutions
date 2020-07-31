import * as actions from './Actions';
import { Auth } from 'aws-amplify';

const setUser = (user) => {
    return {
        type: actions.SET_USER,
        user
    }
}

const MoveToConfirmation = () => {
    return {
        type: actions.MOVE_TO_CONFIRMATION
    }
}

const AuthStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const AuthSuccess = (user) => {
    return {
        type: actions.AUTH_SUCCESS,
        user
    }
}

const AuthFailure = (error) => {
    return {
        type: actions.AUTH_FAILURE,
        error
    }
}

const AuthSignOut = () => {
    return {
        type: actions.AUTH_SIGNOUT
    }
}

export const ConfirmUser = (user,new_password) => {
    return dispatch => {
        AuthStart();
        Auth.completeNewPassword(user,new_password)
        .then((res) => {
            dispatch(AuthSuccess(user.username))
            setUser(null);
        })
        .catch(err => dispatch(AuthFailure(err.message)))
    }
}

export const UserAuth = (username,password) => {
    return dispatch => {
        dispatch(AuthStart());
        Auth.signIn({username: username,password: password})
        .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch(setUser(user));
                dispatch(MoveToConfirmation());
            } else {
                dispatch(AuthSuccess(user.username));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(AuthFailure(err.message))
        })
    }
}

export const AutoAuth = () => {
    return dispatch => {
        Auth.currentAuthenticatedUser()
        .then(user => {
            dispatch(AuthSuccess(user.username));
        })
        .catch(err => dispatch(AuthFailure(null)))
    }
}

export const SignOut = () => {
    return dispatch => {
        Auth.signOut()
        .then(() => {
            dispatch(AuthSignOut());
            localStorage.clear();
        })
    }
}