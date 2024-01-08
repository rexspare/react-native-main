import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useSearch from 'hooks/useSearch';
import TaskSearch from './TaskSearch';
import TaskEventsTabs from './TaskEventsTabs';
import TaskListMainLayout from './layouts/TaskListMainLayout';

const Stack = createStackNavigator();

const TasksEvents = () => {
  const { SearchScreen } = useSearch(
    TaskSearch,
    'TaskSearch',
    'TaskEventsTabs'
  );
  return (
      <Stack.Navigator
        headerMode="none"
        mode="modal"
        keyboardHandlingEnabled={false}>
        <Stack.Screen component={TaskEventsTabs} name="TaskEventsTabs" />
        <Stack.Screen name="ListTasks" component={TaskListMainLayout} options={{headerShown: false}}/>
        <Stack.Screen component={SearchScreen} name="TaskSearch" />
      </Stack.Navigator>
  );
};

export default TasksEvents;