import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MaintenanceRequests from 'pages/TenantApp/maintenance/MaintenanceRequests';

const Stack = createStackNavigator();

function TenantMaintenanceStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="MaintenanceRequests"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="MaintenanceRequests"
        component={MaintenanceRequests}
        initialParams={{tabBarVisible: true}}
      />
    </Stack.Navigator>
  );
}

export default TenantMaintenanceStackNavigator;
