import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EditUnit from 'pages/properties/EditUnit';
import AssignUnitTenants from 'pages/properties/AssignUnitTenants';

const Stack = createStackNavigator();

function LandlordEditPropertyStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="EditUnitForm"
      mode="modal">
      <Stack.Screen
        name="EditUnitForm"
        component={EditUnit}
        initialParams={props.route.params}
      />
      {/* <Stack.Screen name="AssignUnitTenants" component={AssignUnitTenants} /> */}
    </Stack.Navigator>
  );
}

export default LandlordEditPropertyStackNavigator;
