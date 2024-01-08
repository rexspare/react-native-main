import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EditTask from 'pages/tasks/EditTask';
import SelectAssignees from 'pages/tasks/SelectAssignees';

const Stack = createStackNavigator();

function LandlordEditTaskStackNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="EditTaskForm"
      mode="modal">
      <Stack.Screen
        name="EditTaskForm"
        component={EditTask}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="SelectAssignees"
        component={SelectAssignees}
        initialParams={props.route.params}
      />
    </Stack.Navigator>
  );
}

export default LandlordEditTaskStackNavigator;
