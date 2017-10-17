import React, { Component } from 'react';
import logo from '../logo.svg';
import Button from 'react-toolbox/lib/button/Button';

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/Landing.js</code> MAGIC HAPPENS AGAIN.
        </p>
        <Button label="Testing Button" raised primary></Button>
      </div>
    );
  }
}

export default Landing;
