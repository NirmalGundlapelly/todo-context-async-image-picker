import {Text, View} from 'react-native';
import React, {Component} from 'react';
import StackNavigation from './src/navigation/StackNavigation';

import TodoContextProvider from './context/TodoContextProvider';

export default class App extends Component {
  render() {
    return (
      <TodoContextProvider>
        <StackNavigation />
      </TodoContextProvider>
    );
  }
}
