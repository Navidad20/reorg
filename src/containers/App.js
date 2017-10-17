import React, { Component } from 'react';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
//import theme from '../public/react-toolbox/theme'
//import '../public/react-toolbox/theme.css'
import logo from '../logo.svg';

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> MAGIC HAPPENS AGAIN.
          </p>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
