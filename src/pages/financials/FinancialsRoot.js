import React from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useNestedNavigation from 'hooks/useNestedNavigation';
import FinancialsHome from './FinancialsHome';
import FinancialsFeedPage from './FinancialsFeedPage';
import TransactionDetails from './TransactionDetails';

import ManualExpense from 'components/Forms/ManualExpenseForm';
import ManualPayment from 'components/Forms/ManualPaymentForm';
import AmountPage from 'components/Forms/AmountPage/AmountPage';

const Tab = createMaterialTopTabNavigator();

const FinancialsRoot = ({ navigation, route }) => {
  useNestedNavigation({ navigation, route });
  return (
        <Tab.Navigator
          swipeEnabled={false}
          pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
          tabBar={tabBarProps => null}>
          <Tab.Screen name="FinancialsHomePage" component={FinancialsHome} />
          <Tab.Screen name="FinancialsFeed" component={FinancialsFeedPage}/>
          <Tab.Screen name="TransactionDetails" component={TransactionDetails} />
          <Tab.Screen name="ManualExpense" component={ManualExpense}/>
          <Tab.Screen name="ManualPaymentPage" component={ManualPayment}/>
          <Tab.Screen name="AmountPage" component={AmountPage}/>
        </Tab.Navigator>
  );
};

export default FinancialsRoot;
