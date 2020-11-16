import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';

import Store from './store';
import AppRoutes from './AppRoutes';
import AccessControl from './accessControl';

import './App.css'

const store = Store();
const browserHistory = createBrowserHistory();

const accessControl = new AccessControl(store, browserHistory);
accessControl.checkRoute(browserHistory.location.pathname);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.unlistenRouterChanged = null;
  }
  componentDidMount() {
    this.unlistenRouterChanged = browserHistory.listen((location, action) => {
      accessControl.checkRoute(location.pathname);
    });
  };
  componentWillUnmount() {
    if (this.unlistenRouterChanged) {
      this.unlistenRouterChanged();
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            {renderRoutes(AppRoutes)}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
