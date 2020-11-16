import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducers from '../store/auth/reducers';
import appStateReducers from '../store/appState/reducers';

const Store = () => {
    const store = createStore(
        combineReducers({
            appAuthentication: authReducers,
            appState: appStateReducers,
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : ""
        )
    );

    return store;
};

export default Store;