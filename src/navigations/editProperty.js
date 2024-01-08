import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EditProperty from 'pages/properties/EditProperty';
import SelectAmenities from 'pages/properties/SelectAmenities';
import AssignPropertyManager from 'pages/properties/AssignPropertyManager';

const Stack = createStackNavigator();

function LandlordEditPropertyStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="EditPropertyForm"
      mode="modal">
      <Stack.Screen
        name="EditPropertyForm"
        component={EditProperty}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="SelectPropertyAmenities"
        component={SelectAmenities}
      />
      <Stack.Screen
        name="AssignPropertyManager"
        component={AssignPropertyManager}
      />
    </Stack.Navigator>
  );
}

export default LandlordEditPropertyStackNavigator;
