class AccessControl {
    constructor(store, browserHistory) {
        this.store = store;
        this.browserHistory = browserHistory;
    };

    checkRoute(pathname) {
        let state = this.store.getState();
        
        if (pathname !== `/` && !state.appAuthentication.current) {
            this.browserHistory.push(`/`);
            return;
        }
        if (pathname.indexOf(`auth`) > -1 && state.appAuthentication.current) {
            this.browserHistory.push(`/`);
            return;
        }
        if (pathname.indexOf(`/main`) > -1 && !state.appAuthentication.current) {
            this.browserHistory.push(`/auth/login`);
            return;
        }
        if (!state.appAuthentication.current) {
            return;
        }
    };
};

export default AccessControl;