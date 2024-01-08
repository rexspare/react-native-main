import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import ResetPasswordEmail from 'pages/auth/ResetPasswordEmail';

const Stack = createStackNavigator();

function ResetPasswordNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ResetPasswordEmail"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        children={() => <ResetPasswordEmail {...props} />}
        name="ResetPasswordEmail"
      />
    </Stack.Navigator>
  );
}

export default ResetPasswordNavigator;
