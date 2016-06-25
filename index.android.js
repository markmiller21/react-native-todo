import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import App from './app/app';

class Todo extends Component {

  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Todo', () => Todo);
