import * as actionTypes from './actionTypes';

const initialState = {
    error: null,
    status: null,
    code: null
};

const errorReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERROR:
            return {
                error: action.payload.error,
                status: action.payload.status,
                code: action.payload.code,
            }
        case actionTypes.CLEAR_ERROR:
            return {
                error: null,
                status: null,
                code:  null
            }
        default: {
            return { ...state }
        }
    }
};

export default errorReducers;