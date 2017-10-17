import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import './styles/css/index.css';

import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'sans-serif']
  }
});

render(
  <Router>
    <Root/>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
