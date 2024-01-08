import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';

import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import TwoFactorAuthPhone from 'pages/auth/TwoFactorAuthPhone';
import TwoFactorAuthCode from 'pages/auth/TwoFactorAuthCode';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Login"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={TwoFactorAuthPhone} name="TFAPhone" />
      <Stack.Screen component={TwoFactorAuthCode} name="TFACode" />
    </Stack.Navigator>
  );
};

export default Auth;
