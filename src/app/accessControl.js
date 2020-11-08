import * as appStateConstant from 'constant/appState';
import * as localStorageItemConstant from 'constant/localStorageItem';
import * as routeNameConstant from 'constant/routeName';
import * as dataConstant from 'constant/data';

class AccessControl {
    constructor(store, browserHistory) {
        this.store = store;
        this.browserHistory = browserHistory;
    };

    checkRoute(pathname) {
        let state = this.store.getState();
        if (pathname !== `${routeNameConstant.ROUTE_NAME_SPLASH}` && state.appState.isInitial !== appStateConstant.APP_STATE_IS_INITIAL_YES ) {
            localStorage.setItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH, pathname)
            this.browserHistory.push(`${routeNameConstant.ROUTE_NAME_SPLASH}`);
            return;
        }
        if (pathname.indexOf(`${routeNameConstant.ROUTE_NAME_AUTH}`) > -1 && state.appAuthentication.current) {
            this.browserHistory.push(`/${routeNameConstant.ROUTE_NAME_MAIN}`);
            return;
        }
        if (pathname.indexOf(`${routeNameConstant.ROUTE_NAME_AUTH}`) > -1 && !state.appAuthentication.current) {
            return;
        }
        if (pathname.indexOf(`${routeNameConstant.ROUTE_NAME_MAIN}/`) > -1 && !state.appAuthentication.current) {
            this.browserHistory.push(`/${routeNameConstant.ROUTE_NAME_AUTH}/${routeNameConstant.ROUTE_NAME_LOGIN}`);
            return;
        }
        if (pathname.indexOf(`${routeNameConstant.ROUTE_NAME_MAIN}/${routeNameConstant.ROUTE_NAME_USERS}`) > -1 && state.appAuthentication.current.user.type === dataConstant.USER_GUEST) {
            this.browserHistory.push(`/${routeNameConstant.ROUTE_NAME_MAIN}`);
            return;
        }
        if (!state.appAuthentication.current) {
            return;
        }
    };
};

export default AccessControl;