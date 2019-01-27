/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';

import {configureStore} from './src/reducers';
import MainNavigator from './src/reducers';


const store = configureStore();
const AppContainer = createAppContainer(MainNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
      	<AppContainer />
      </Provider>
    );
  }
}

