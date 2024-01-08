import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import TenantRentals from 'pages/TenantApp/rentals/TenantRentals';
import RentalPaymentDetails from 'pages/TenantApp/rentals/RentalPaymentDetails';

const Stack = createStackNavigator();

function TenantPayments(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="TenantRentals"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="TenantRentals">
        {props => <TenantRentals {...props} />}
      </Stack.Screen>
      <Stack.Screen name="RentalPaymentDetails">
        {props => <RentalPaymentDetails {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default TenantPayments;
