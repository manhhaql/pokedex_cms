import * as actionTypes from './actionTypes';

export const changeInitialAppState = (newInitialAppState) => dispatch => {
    dispatch({
        type: actionTypes.CHANGE_INITIAL_APP_STATE,
        payload: {newInitialAppState}
    })
};