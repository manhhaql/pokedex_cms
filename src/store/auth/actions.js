import * as actionTypes from './actionTypes';

import HTTPRequest from '../../helper/httpRequest';

import { returnError } from '../error/actions';

export const loadUser = () => (dispatch, getState) => {
    //loading
    dispatch({
        type: actionTypes.USER_LOADING
    });
    let token = getState().appAuthentication.token

    HTTPRequest.get({
        url: 'users/user-info',
        params: {
            token: token
        }
    }).then(response => {
        dispatch({
            type: actionTypes.USER_LOADED,
            payload: response.data.data
        })
    }).catch(error => {
        dispatch(returnError(error))
        dispatch({
            type: actionTypes.AUTH_ERROR
        })
    });
};

export const register = (user, history) => dispatch => {
    HTTPRequest.post({
        url: 'authentication/signup',
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
            password_check: user.password_check,
            type: user.type,
        }
    }).then(response => {
        history.push(`/main`)
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: response.data.data
        })
    }).catch(error => {
        dispatch(returnError(error.response.data.error, error.response.status, actionTypes.REGISTER_FAILED))
        dispatch({
            type: actionTypes.REGISTER_FAILED
        })
    });
};

export const login = (user, history) => dispatch => {
    HTTPRequest.post({
        url: 'authentication/signin',
        data: {
            username: user.username,
            password: user.password,
        }
    }).then(response => {
        history.push('/main')
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: response.data.data
        })
        
    }).catch(error => {
        dispatch(returnError(error.response.data.error, error.response.status, actionTypes.LOGIN_FAILED))
        dispatch({
            type: actionTypes.LOGIN_FAILED
        })
    });
};