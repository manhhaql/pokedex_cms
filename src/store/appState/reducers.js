import { APP_STATE_IS_INITIAL_NO } from 'constant/appState';
import * as actionTypes from './actionTypes';
import * as appStateConstant from 'constant/appState';

const initialState = {
    isInitial: appStateConstant.APP_STATE_IS_INITIAL_NO
};

const appStateReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INITIAL_APP_STATE:
            return {
                isInitial: action.payload.newInitialAppState
            }
        default: {
            return { ...state }
        }
    }
};

export default appStateReducers;