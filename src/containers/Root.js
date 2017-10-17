import React from 'react';
//import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import NoMatch from '../components/NotFoundPage';
import Test from '../components/Test';
import App from '../containers/App';

const Root = (props) => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/test" component={Test} />
        <Route component={NoMatch} />
      </Switch>
    </main>
  );
}

Root.displayName = 'Root';

export default Root;