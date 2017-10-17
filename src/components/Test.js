import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';

class Test extends Component {
  render() {
    return (
      <AppBar title='React Toolbox' leftIcon='menu'>
        <Navigation type='horizontal'>
          <Link href='http://' label='Inbox' icon='inbox' />
          <Link href='http://' active label='Profile' icon='person' />
        </Navigation>
      </AppBar>
    )
  }
}

export default Test;