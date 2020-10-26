import * as actionTypes from './actionTypes';

const initialState = {
    isAuthenticated:  null,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: null
};

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case actionTypes.LOGIN_SUCCESS: 
        case actionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case actionTypes.AUTH_ERROR: 
        case actionTypes.LOGIN_FAILED: 
        case actionTypes.LOGOUT_SUCCESS: 
        case actionTypes.REGISTER_FAILED: 
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null
            }
        default: {
            return { ...state }
        }
    }
};

export default authReducers;