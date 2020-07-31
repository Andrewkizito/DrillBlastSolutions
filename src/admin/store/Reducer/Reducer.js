import * as actions from '../Actions/Actions';

const initialState = {
    AuthState: false,
    loading: false,
    user: null,
    error: null,
    user: null
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actions.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actions.MOVE_TO_CONFIRMATION:
            return {
                ...state,
                error: null,
                loading: false
            }
        case actions.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                AuthState: true,
                user: action.user,
                loading: false
            }
        case actions.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.AUTH_SIGNOUT:
            return {
                AuthState: false,
                loading: false,
                user: null,
                error: null
            }
        default:
            return state;
    }
}

export default reducer;


















