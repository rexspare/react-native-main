import React from 'react';
import { Layout } from '@ui-kitten/components';
import Button from 'components/Button';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import ThemedGradient from 'components/ThemedGradient';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import AuthProvider from 'providers/auth';

import getProfileQuery from 'queries/profile/getProfile.gql';
import { useQuery } from 'urql';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import FocusedStatusBar from 'components/FocusedStatusBar';
import Avatar from 'components/Avatar_old';
import { button_styles } from 'styles/button';

const ViewProfile = ({ navigation }) => {
  const theme = useTheme();
  const { logout } = React.useContext(AuthProvider);

  const [profileRes, getProfile] = useQuery({
    query: getProfileQuery,
  });

  const profile = profileRes?.data?.me;

  useFocusEffect(
    React.useCallback(() => {
      getProfile({ requestPolicy: 'network-only' });
    }, [getProfile]),
  );
  
  return (
    <Box flex={1} as={Layout} pb={20}>
      <FocusedStatusBar barStyle="dark-content" />
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            navigation.openDrawer
              ? {
                icon: 'menu',
                left: true,
                onPress: () => navigation.openDrawer(),
              }
              : {
                icon: 'settings',
                pack: 'pm',
                left: true,
                onPress: () => navigation.navigate('Settings'),
              },
            {
              icon: 'edit',
              pack: 'pm',
              onPress: () => navigation.navigate('EditProfile'),
            },
          ]}
          alignment="center"
          title="Profile"
          divider
        />
        <Box flex={1} alignItems="center">
          <Box flex={4} alignItems="center" justifyContent="center">
            <Box
              as={ThemedGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              borderRadius={100}
              overflow="hidden">
              <Box p="8px" backgroundColor="#fff" m="2px" borderRadius={100}>
                <Avatar
                  source={
                    profile?.picture
                      ? { uri: profile.picture }
                      : require('img/profile.svgpng')
                  }
                  size="giant"
                  style={{ width: 95, height: 95 }}
                />
              </Box>
            </Box>
            <Text mt={4} fontSize={16}>
              {profile?.firstName} {profile?.lastName}
            </Text>
          </Box>
          <Box flex={4} width={0.7}>
            {profile ? (
              <>
                <Box flexDirection="row" justifyContent="space-between" mb={4}>
                  <Text>Email</Text>
                  <Text category="p2" color={theme['grey-400']}>
                    {profile?.email}
                  </Text>
                </Box>
                <Box flexDirection="row" justifyContent="space-between">
                  <Text>Phone Number</Text>
                  <Text category="p2" color={theme['color-primary-500']}>
                    {formatPhoneNumber(profile?.phone)}
                  </Text>
                </Box>
              </>
            ) : (
              <ActivityIndicator
                color={theme['color-primary-500']}
                size="large"
              />
            )}
          </Box>
          <Box width={0.85}>
            <Box my={2}>
              <Button
                onPress={() => navigation.navigate('ChangePassword')}
                disabled={!profile}
                {...button_styles["bordered_clear"]}
                size="large"
              >
                Change Password
              </Button>
            </Box>
            <Box my={2}>
              <Button
                onPress={logout}
                disabled={!profile}>
                Sign Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewProfile;
