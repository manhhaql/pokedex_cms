import * as actionTypes from './actionTypes';

export const returnError = (error, status, code) => {
    return {
        type: actionTypes.GET_ERROR,
        payload: {
            error: error,
            status: status,
            code: code
        }
    }
};
export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
};