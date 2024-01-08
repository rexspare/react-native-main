import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import TasksEvents from 'pages/tasks/TasksEvents';

import useNestedNavigation from 'hooks/useNestedNavigation';

const Stack = createStackNavigator();

function LandlordTasksStackNavigator(props) {
  useNestedNavigation(props);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="TasksEvents"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="TasksEvents" component={TasksEvents} />
    </Stack.Navigator>
  );
}

export default LandlordTasksStackNavigator;
