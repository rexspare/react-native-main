import React from 'react';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import {createStackNavigator} from '@react-navigation/stack';
import {useDebouncedCallback} from 'use-debounce/lib';
import ServicesHome from './ServicesHome';
import SearchServices from './SearchServices';
const Stack = createStackNavigator();

const ServicesRoot = ({navigation}) => {
  const [onSearch] = useDebouncedCallback(
    search => navigation.navigate('SearchServices', {search}),
    500,
  );

  return (
    <Box flex={1} as={Layout}>
      <Stack.Navigator
        headerMode="none"
        keyboardHandlingEnabled={false}
        mode="modal">
        <Stack.Screen
          name="ServicesHome"
          component={ServicesHome}
          initialParams={{
            onSearch,
          }}
        />
        <Stack.Screen name="SearchServices" component={SearchServices} />
      </Stack.Navigator>
    </Box>
  );
};

export default ServicesRoot;
