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
<<<<<<< HEAD
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : ""
=======
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : a => a
>>>>>>> hotfix/styling_auth_components
        )
    );

    return store;
};

export default Store;