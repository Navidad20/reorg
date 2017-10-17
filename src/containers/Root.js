import React from 'react';
//import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import NoMatch from '../components/NotFoundPage';
import Test from '../components/Test';
import Landing from '../components/Landing';
import App from './App';

const Root = (props) => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/test" component={Test} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  );
}

Root.displayName = 'Root';

export default Root;