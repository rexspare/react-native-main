import React, { useContext } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import DrawerScreen from './DrawerScreen';
import EditProfile from 'pages/profile/EditProfile';
import CoorperateProfile from 'pages/profile/CoorperateProfile';
import AuthProvider from 'providers/auth';
import EditCoorperateProfile from 'pages/profile/CoorperateProfile/EditCoorperateProfile';
import AddManagerTabs from './addManager';
import ViewTenant from 'pages/tenants/ViewTenant';
import Settings from 'pages/profile/Settings/Settings';
import ViewProperty from 'pages/properties/ViewProperty';
import ListDocuments from 'pages/documents/ListDocuments';
import SettingsPage from 'pages/profile/Settings/Pages/SettingsPage';
import PaymentMethod from 'pages/profile/Settings/Pages/PaymentsMethod';
import EditPayment from 'pages/profile/Settings/Pages/PaymentsMethod/EditPayment';
import ChoosePaymentMethod from 'pages/TenantApp/rentals/AddPayment';
import AddPayment from 'pages/TenantApp/rentals/AddPayment/AddPayment';

const Stack = createStackNavigator();
function ProfileNavigator(props) {
  const Container = props.navigation.openDrawer ? DrawerScreen : React.Fragment;
  const { user } = useContext(AuthProvider);
  const ProfileComponent = user?.userType != 1 ? CoorperateProfile : ViewTenant;
  const EditProfileComponent =
    user?.userType != 1 ? EditCoorperateProfile : EditProfile;

  return (
    <Container>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="ViewProfile"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="ViewProfile">
          {props => (
            <ProfileComponent
              userId={user?.id}
              isSelf={true}
              userType={user?.userType}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditProfile">
          {props => (
            <EditProfileComponent
              userId={user?.id}
              userType={user?.userType}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ViewCoorperateProfile">
          {props => (
            <CoorperateProfile
              userType={props?.route?.params?.userType}
              userId={props?.route?.params?.id}
              isSelf={false}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddManager" component={AddManagerTabs} />
        <Stack.Screen name="Settings">
          {props => <Settings userType={user?.userType} {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="TermsOfUse"
          component={SettingsPage}
          initialParams={{ page: 'terms' }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={SettingsPage}
          initialParams={{ page: 'privacy' }}
        />
        <Stack.Screen
          name="AboutUs"
          component={SettingsPage}
          initialParams={{ page: 'about' }}
        />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="EditPayment" component={EditPayment} />
        <Stack.Screen name="AddNewPayment" component={ChoosePaymentMethod} />
        <Stack.Screen name="AddPayment" component={AddPayment} />

        <Stack.Screen name="ViewProperty" component={ViewProperty} />
        <Stack.Screen name="ListDocuments" component={ListDocuments} />
      </Stack.Navigator>
    </Container>
  );
}

export default ProfileNavigator;
