import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';

import Store from './store';

import AppRoutes from './AppRoutes';
import { loadUser } from '../store/auth/actions';

const store = Store();
const browserHistory = createBrowserHistory();

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {renderRoutes(AppRoutes)}
        </Router>
      </Provider>
    );
  }
}

export default App;
