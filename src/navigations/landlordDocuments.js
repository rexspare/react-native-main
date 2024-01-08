import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import RootDocumentList from 'pages/documents/RootDocumentList';
import ListDocuments from 'pages/documents/ListDocuments';
import FAB from 'components/FAB';
import useFab from 'hooks/useFab';

const Stack = createStackNavigator();

function LandlordDocumentsStackNavigator({route}) {
  const {props: fabProps, visible} = useFab();

  return (
    <>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="ListDocumentsRoot"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="ListDocumentsRoot" component={RootDocumentList} />
        <Stack.Screen name="ListDocuments" component={ListDocuments} />
      </Stack.Navigator>
      <FAB {...fabProps} />
    </>
  );
}

export default LandlordDocumentsStackNavigator;
