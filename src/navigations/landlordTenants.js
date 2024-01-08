import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import TenantsList from 'pages/tenants/TenantsList';
import ViewTenant from 'pages/tenants/ViewTenant';
import useNestedNavigation from 'hooks/useNestedNavigation';
import AddTenantsTabs from './addTenants';
import ArchivedTenants from 'pages/tenants/ArchivedTenants';

const Stack = createStackNavigator();

function LandlordTenantsStackNavigator(props) {
  useNestedNavigation(props);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ListTenants"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="ListTenants" component={TenantsList} />
      <Stack.Screen name="ViewTenant" component={ViewTenant} />
      <Stack.Screen name="AddTenant" component={AddTenantsTabs} />
      <Stack.Screen name="ArchivedTenants" component={ArchivedTenants} />
    </Stack.Navigator>
  );
}

export default LandlordTenantsStackNavigator;
