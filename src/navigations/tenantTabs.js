import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout } from '@ui-kitten/components';
import MaintenanceRequests from 'pages/TenantApp/maintenance/MaintenanceRequests';
import TenantHome from 'pages/TenantApp/home/TenantHome';
import PropertyDetails from 'pages/TenantApp/home/PropertyDetails';
import NotificationsRoot from 'pages/notifications/NotificationsRoot';
import CoorperateProfile from 'pages/profile/CoorperateProfile';
import TenantPayments from './TenantPayments';
import Box from 'components/Box';
import BottomTab from './BottomTab';
import ProfileNavigator from './profile';

const Tab = createBottomTabNavigator();

const TenantNavigator = () => {
  return (
    <Box as={Layout} flex={1}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Tab.Navigator
        initialRouteName="TenantHome"
        tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen
          name="TenantHome"
          component={TenantHome}
          options={({ route }) => ({
            tabBarLabel: 'Home',
            tabBarIcon: 'home',
            tabBarIconActive: 'home-active',
          })}
        />

        <Tab.Screen
          name="TenantMaintenance"
          component={MaintenanceRequests}
          options={({ route }) => ({
            tabBarLabel: 'Maintenance',
            tabBarIcon: 'maintenance',
            tabBarIconActive: 'maintenance-active',
          })}
        />
        <Tab.Screen
          name="TenantPayments"
          component={TenantPayments}
          options={({ route }) => ({
            tabBarLabel: 'Payments',
            tabBarIcon: 'payments',
            tabBarIconActive: 'payments-active',
          })}
        />
        <Tab.Screen
          name="TenantProfile"
          component={ProfileNavigator}
          options={({ route }) => ({
            tabBarLabel: 'Profile',
            tabBarIcon: 'nav-people',
            tabBarIconActive: 'nav-people-active',
          })}
        />
        <Tab.Screen
          name="PropertyDetails"
          component={PropertyDetails}
          options={() => ({
            tabBarLabel: 'PropertyDetails',
            hidden: true,
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsRoot}
          options={({ route }) => ({
            tabBarLabel: 'Notifications',
            hidden: true,
          })}
        />
        <Tab.Screen
          name="ManagementProfile"
          component={props => <CoorperateProfile userType={props?.route?.params?.userType} userId={props?.route?.params?.id} isSelf={false} isTenant={props?.route?.params?.isTenant} isContactManager={props?.route?.params?.isContactManager} {...props} />}
          options={({ route }) => ({
            tabBarLabel: 'Notifications',
            hidden: true,
          })}
        />
      </Tab.Navigator>
    </Box>
  );
};

export default TenantNavigator;
