import * as actionTypes from './actionTypes';

export const loadAuthData= (newAuthData) => dispatch => {
    dispatch({
        type: actionTypes.CHANGE_AUTH_DATA,
        payload: {newAuthData}
    })
};