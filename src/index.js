import React from 'react';
import ReactDOM from 'react-dom';

import {
  Container
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

