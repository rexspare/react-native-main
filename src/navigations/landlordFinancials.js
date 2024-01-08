import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import FinancialsHome from 'pages/financials/FinancialsHome';
import { TRANSACTION_TYPE } from 'constants/enums';
import ViewFinancials from 'pages/financials/ViewFinancials';

const Stack = createStackNavigator();

function LandlordFinancialsStackNavigator({route}) {
  return (
      <Stack.Navigator
        headerMode="none"
        initialRouteName="FinancialsRoot"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="FinancialsRoot" component={FinancialsHome} />
        <Stack.Screen
            name="FinancialExpenses"
            component={ViewFinancials}
            initialParams={{type: TRANSACTION_TYPE.EXPENSE}}
          />
      </Stack.Navigator>
  );
}

export default LandlordFinancialsStackNavigator;
