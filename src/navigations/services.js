import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import ServicesSubCategories from 'pages/services/ServicesSubCategories';
import ServiceProviders from 'pages/services/ServiceProviders';
import ViewServiceProvider from 'pages/services/ViewServiceProvider';
import ServicesRoot from 'pages/services/ServicesRoot';

const Stack = createStackNavigator();

function LandlordServicesStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ServicesHome"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="ServicesRoot" component={ServicesRoot} />
      <Stack.Screen
        name="ListSubCategories"
        component={ServicesSubCategories}
      />
      <Stack.Screen name="ListServiceProviders" component={ServiceProviders} />
      <Stack.Screen
        name="ViewServiceProvider"
        component={ViewServiceProvider}
      />
    </Stack.Navigator>
  );
}

export default LandlordServicesStackNavigator;
