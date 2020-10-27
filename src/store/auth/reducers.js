import * as actionTypes from './actionTypes';

const initialState = {
    current: null
};

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_AUTH_DATA:
            return {
                current: action.payload.newAuthData
            }
        default: {
            return { ...state }
        }
    }
};

export default authReducers;