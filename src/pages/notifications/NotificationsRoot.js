import React, { useContext } from 'react';
import SafeAreaView from 'components/SafeAreaView';
import AuthProvider from 'providers/auth';
import Header from 'components/Header';
import Box from 'components/Box';
import { Layout } from '@ui-kitten/components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notifications from './Notifications';
import { colors } from 'styles/theme';

const Tab = createMaterialTopTabNavigator();

const NotificationsRoot = ({ navigation }) => {
  const { user } = useContext(AuthProvider);

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} pb={0} forceInset={{ top: 'always' }}>
        <Header
          alignment="center"
          color={colors['gray scale/90']}
          title="Notifications"
          actions={[
            user?.userType != 1 && {
              icon: 'menu',
              left: true,
              onPress: () => navigation.openDrawer(),
            },
            {
              icon: 'bell',
              pack: 'pm',
              status: 'primary',
              onPress: () => navigation.goBack(),
            },
          ]}
        />
        <Box flex={1}>
          <Notifications />
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationsRoot;
