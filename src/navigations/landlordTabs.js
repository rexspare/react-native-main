import React, { useContext, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from './BottomTab';
import DrawerScreen from './DrawerScreen';
import LandlordServicesStackNavigator from './services';
import LandlordTenantsStackNavigator from './landlordTenants';
import LandlordDocumentsStackNavigator from './landlordDocuments';
import NotificationsRoot from 'pages/notifications/NotificationsRoot';
import TasksEvents from 'pages/tasks/TasksEvents';
import ComplianceRoot from 'pages/compliance/ComplianceRoot';
import FinancialsRoot from 'pages/financials/FinancialsRoot';
import LandlordPropertiesStackNavigator from './landlordProperties';
import Box from 'components/Box';
import LandlordProfileNavigator from './profile';
import AuthContext from 'providers/auth';
import { Layout } from '@ui-kitten/components';
import { compact } from 'lodash';

const Tab = createBottomTabNavigator();

const LandlordTabNavigator = () => {
  const { permissions } = useContext(AuthContext);

  const screens = useMemo(
    () =>
      compact([
        !permissions?.tasks?.isHidden && (
          <Tab.Screen
            name="LandlordTasks"
            component={TasksEvents}
            options={({ route }) => ({
              tabBarLabel: 'Tasks',
              tabBarIcon: 'tasks',
              tabBarIconActive: 'tasks-active',
            })}
          />
        ),
        !permissions?.properties?.isHidden && (
          <Tab.Screen
            name="LandlordProperties"
            component={LandlordPropertiesStackNavigator}
            options={({ route }) => ({
              tabBarLabel: 'Properties',
              tabBarIcon: 'properties',
              tabBarIconActive: 'properties-active',
            })}
          />
        ),
        <Tab.Screen
          name="LandlordCompliance"
          component={ComplianceRoot}
          options={({ route }) => ({
            tabBarLabel: 'Compliance',
            hidden: true,
          })}
        />,

        !permissions?.tenants?.isHidden && (
          <Tab.Screen
            name="LandlordTenants"
            component={LandlordTenantsStackNavigator}
            options={({ route }) => ({
              tabBarLabel: 'Tenants',
              tabBarIcon: 'tenants',
              tabBarIconActive: 'tenants-active',
            })}
          />
        ),
        <Tab.Screen
          name="LandlordServices"
          component={LandlordServicesStackNavigator}
          options={({ route }) => ({
            tabBarLabel: 'Services',
            tabBarIcon: 'services',
            tabBarIconActive: 'services-active',
          })}
        />,
        !permissions?.documents?.isHidden && (
          <Tab.Screen
            name="LandlordDocuments"
            component={LandlordDocumentsStackNavigator}
            options={({ route }) => ({
              tabBarLabel: 'Documents',
              tabBarIcon: 'documents',
              tabBarIconActive: 'documents-active',
            })}
          />
        ),
        <Tab.Screen
          name="LandlordFinancials"
          component={FinancialsRoot}
          options={({ route }) => ({
            tabBarLabel: 'Financials',
            hidden: true,
          })}
        />,
        <Tab.Screen
          name="Notifications"
          component={NotificationsRoot}
          options={({ route }) => ({
            tabBarLabel: 'Notifications',
            hidden: true,
          })}
        />,
        <Tab.Screen
          name="LandlordProfile"
          component={LandlordProfileNavigator}
          options={({ route }) => ({
            tabBarLabel: 'Profile',
            hidden: true,
          })}
        />,
      ]),
    [permissions],
  );

  return (
    <Box as={Layout} flex={1}>
      <DrawerScreen>
        <Tab.Navigator
          initialRouteName="LandlordTasks"
          tabBar={props => <BottomTab {...props} />}>
          {screens}
        </Tab.Navigator>
      </DrawerScreen>
    </Box>
  );
};

export default LandlordTabNavigator;
