import React, { Component } from 'react';
import '../toolbox/theme.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../toolbox/theme';
import logo from '../logo.svg';

const App = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default App;
