import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import PropertiesRoot from 'pages/properties/PropertiesRoot';
import ViewUnit from 'pages/properties/ViewUnit';
import ViewProperty from 'pages/properties/ViewProperty';
import PreviousTenant from 'pages/tenants/PreviousTenants'

const Stack = createStackNavigator();

function LandlordPropertiesStackNavigator(props) {

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ListProperties"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="ListProperties" component={PropertiesRoot} />
      <Stack.Screen name="ViewProperty" component={ViewProperty} />
      <Stack.Screen name="ViewUnit" component={ViewUnit} />
      <Stack.Screen name="PreviousTenant" component={PreviousTenant} />
    </Stack.Navigator>
  );
}

export default LandlordPropertiesStackNavigator;
