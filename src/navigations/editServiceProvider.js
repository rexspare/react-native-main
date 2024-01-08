import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EditServiceProvider from 'pages/services/EditServiceProvider';
import SelectServiceCategory from 'pages/services/SelectServiceCategory';

const Stack = createStackNavigator();

function LandlordEditServiceProviderStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="EditProviderForm"
      mode="modal">
      <Stack.Screen
        name="EditProviderForm"
        component={EditServiceProvider}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="SelectServiceCategory"
        component={SelectServiceCategory}
      />
    </Stack.Navigator>
  );
}

export default LandlordEditServiceProviderStackNavigator;
