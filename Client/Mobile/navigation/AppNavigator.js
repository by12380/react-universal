import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({ LogIn: LogInScreen });

export default createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
);