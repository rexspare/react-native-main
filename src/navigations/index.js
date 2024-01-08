import React from 'react';

import { enableScreens } from 'react-native-screens';
enableScreens();
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import {
  useLinking,
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';

import AuthNavigator from './auth';
import LandlordNavigator from './landlord';

import Loading from './Loading';
import Onboarding from 'components/Onboarding';

import StorageProvider from 'providers/storage';
import AuthProvider from 'providers/auth';
import { USER_TYPES } from 'constants/enums';
import ChangePassword from 'pages/auth/ChangePassword';
import SelectDate from 'pages/tasks/SelectDate';
import SelectRepeat from 'pages/tasks/SelectRepeat';
import SelectAlert from 'pages/tasks/SelectAlert';
import SelectAssignees from 'pages/tasks/SelectAssignees';
import SelectTaskType from 'pages/tasks/SelectTaskType';
import ResetPasswordNavigator from './resetPassword';
import useTheme from 'hooks/useTheme';
import EditEvent from 'pages/tasks/EditEvent';
import EditTask from 'pages/tasks/EditTask';
import ViewTask from 'pages/tasks/ViewTask';
import SelectAmenities from 'pages/properties/SelectAmenities';
import AssignPropertyManager from 'pages/properties/AssignPropertyManager';
import AddBuilding from 'pages/properties/AddBuilding';
import EditUnit from 'pages/properties/EditUnit';
import AssignUnitTenants from 'pages/properties/AssignUnitTenants';
import PropertyActivity from 'pages/properties/PropertyActivity';
import UnitActivity from 'pages/properties/UnitActivity';
import RateTenant from 'pages/tenants/RateTenant/RateTenant';
import EditServiceProvider from 'pages/services/EditServiceProvider';
import SelectServiceCategory from 'pages/services/SelectServiceCategory';

import ViewRequest from 'pages/TenantApp/maintenance/ViewRequest';
import EditRequest from 'pages/TenantApp/maintenance/EditRequest';
import EditEmergency from 'pages/profile/EditEmergency';
import PaymentHistory from 'pages/profile/PaymentHistory';
import FilterUnits from 'pages/properties/FilterUnits';
import MakePayment from 'pages/TenantApp/rentals/MakePayment';
import AddCreditCard from 'pages/TenantApp/rentals/AddCreditCard';
import GenericSelectScreen from 'pages/GenericSelectScreen';
import ViewEvent from 'pages/tasks/ViewEvent';
import TransactionDetails from 'pages/financials/TransactionDetails';
import ViewAllTransactions from 'pages/financials/ViewAllTransactions';
import ComplianceDetailsPage from 'pages/compliance/ComplianceDetailsPage/index.js';
import DocumentsTabs from 'pages/documents/DocumentsTabs';
import TenantTabs from 'pages/tenants/TenantTabs';
import TenantNavigator from './tenantTabs';
import RateServiceProvider from 'pages/services/RateServiceProvider';
import ServiceProviderReviews from 'pages/services/ServiceProviderReviews';
import ResetPasswordChange from 'pages/auth/ResetPasswordChange';
import AddManagerTabs from './addManager';

const RootStack = createStackNavigator();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const RootNavigator = () => {
  const { token, user, loading, onboarding } = React.useContext(AuthProvider);
  const theme = useTheme();
  const storage = React.useContext(StorageProvider);

  const { getInitialState } = useLinking(navigationRef, {
    prefixes: ['https:tigra.app/', 'https://pm.com', 'pmapp://'],
    config: {
      Login: 'login',
      ResetPasswordChange: 'reset-password/callback/:code',
      ResetPassword: 'reset-password',
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150),
      ),
    ])
      .catch(console.log)
      .then(async state => {
        if (state !== undefined) {
          setInitialState(state);
        }
        setIsReady(true);
      });
  }, [getInitialState, storage]);

  // React.useEffect(() => {
  //   if (isReady && !loading) {
  //     RNBootSplash.hide({duration: 250});
  //   }
  // }, [isReady, loading]);

  if (!isReady || loading) {
    // return null;
    return <Loading />;
  }
  return (
    <NavigationContainer
      initialState={initialState}
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme['background-basic-color-1'],
        },
      }}>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        {token && user?.id ? (
          user.userType === USER_TYPES.TENANT ? (
            <>
              <RootStack.Screen name="Tenant" component={TenantNavigator} />
              <RootStack.Screen name="EditRequest" component={EditRequest} />
              <RootStack.Screen name="ViewRequest" component={ViewRequest} />
              <RootStack.Screen
                name="PaymentHistory"
                component={PaymentHistory}
              />
              <RootStack.Screen
                name="EditEmergency"
                component={EditEmergency}
              />
              <RootStack.Screen name="MakePayment" component={MakePayment} />
              <RootStack.Screen
                name="AddCreditCard"
                component={AddCreditCard}
              />
            </>
          ) : (
            <>
              <RootStack.Screen name="Landlord" component={LandlordNavigator} />
              <RootStack.Screen name="EditTask" component={EditTask} />
              <RootStack.Screen name="EditEvent" component={EditEvent} />
              <RootStack.Screen name="ViewTask" component={ViewTask} />
              <RootStack.Screen name="AddBuilding" component={AddBuilding} />
              <RootStack.Screen name="AddManager" component={AddManagerTabs} />
              <RootStack.Screen name="ViewEvent" component={ViewEvent} />
              <RootStack.Screen
                name="SelectPropertyAmenities"
                component={SelectAmenities}
              />
              <RootStack.Screen
                name="AssignPropertyManager"
                component={AssignPropertyManager}
              />
              <RootStack.Screen
                name="EditUnit"
                component={EditUnit}
                // initialParams={props.route.params}
              />
              <RootStack.Screen
                name="AssignUnitTenants"
                component={AssignUnitTenants}
              />
              <RootStack.Screen
                name="PropertyActivity"
                component={PropertyActivity}
              />
              <RootStack.Screen name="UnitActivity" component={UnitActivity} />
              <RootStack.Screen name="RateTenant" component={RateTenant} />
              <RootStack.Screen
                name="EditServiceProvider"
                component={EditServiceProvider}
              />
              <RootStack.Screen
                name="ServiceProviderReviews"
                component={ServiceProviderReviews}
              />
              <RootStack.Screen
                name="RateServiceProvider"
                component={RateServiceProvider}
              />
              <RootStack.Screen
                name="SelectServiceCategory"
                component={SelectServiceCategory}
              />
              {/* <RootStack.Screen
                name="EditTransaction"
                component={EditTransaction}
              /> */}
              <RootStack.Screen name="FilterUnits" component={FilterUnits} />
            </>
          )
        ) : !onboarding ? (
          <RootStack.Screen name="Onboarding" component={Onboarding} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} path="" />
        )}
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
        <RootStack.Screen name="DocumentsTabs" component={DocumentsTabs} />
        <RootStack.Screen name="TenantTabs" component={TenantTabs} />
        <RootStack.Screen
          name="ResetPassword"
          component={ResetPasswordNavigator}
        />
        <RootStack.Screen
          name="ResetPasswordChange"
          component={ResetPasswordChange}
        />
        <RootStack.Screen name="SelectDate" component={SelectDate} />
        <RootStack.Screen name="SelectRepeat" component={SelectRepeat} />
        <RootStack.Screen name="SelectAlert" component={SelectAlert} />
        <RootStack.Screen name="SelectAssignees" component={SelectAssignees} />
        <RootStack.Screen name="SelectTaskType" component={SelectTaskType} />
        <RootStack.Screen
          name="GenericSelectScreen"
          component={GenericSelectScreen}
        />
        {/* Financials */}
        <RootStack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
        <RootStack.Screen
          name="ViewAllTransactions"
          component={ViewAllTransactions}
        />
        {/* Compliance */}
        <RootStack.Screen
          name="ComplianceDetails"
          component={ComplianceDetailsPage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
