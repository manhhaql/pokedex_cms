import * as appStateConstant from 'constant/appState';
import * as localStorageItemConstant from 'constant/localStorageItem';

class AccessControl {
    constructor(store, browserHistory) {
        this.store = store;
        this.browserHistory = browserHistory;
    };

    checkRoute(pathname) {
        let state = this.store.getState();
        if (pathname !== `/` && state.appState.isInitial !== appStateConstant.APP_STATE_IS_INITIAL_YES ) {
            localStorage.setItem(localStorageItemConstant.LOCAL_STORAGE_ITEM_CURRENT_PATH, pathname)
            this.browserHistory.push(`/`);
            return;
        }
        if (pathname.indexOf(`auth`) > -1 && state.appAuthentication.current) {
            this.browserHistory.push(`/main`);
            return;
        }
        if (pathname.indexOf(`auth`) > -1 && !state.appAuthentication.current) {
            return;
        }
        if ((pathname.indexOf(`/main`) > -1) && !state.appAuthentication.current) {
            this.browserHistory.push(`/auth/login`);
            return;
        }
        if (!state.appAuthentication.current) {
            return;
        }
    };
};

export default AccessControl;