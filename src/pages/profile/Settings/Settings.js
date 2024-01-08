import React from 'react';
import { useMutation, useQuery } from 'urql';
import { useIsOpen } from 'hooks/useIsOpen';
import { useLoader } from 'hooks/useLoader';
import AuthProvider from 'providers/auth';
import getProfileQuery from 'queries/profile/getProfile.gql';
import deleteUserMutation from 'queries/auth/deleteUser.gql';
import HeadedScreen from 'components/HeadedScreen';
import WhiteCard from 'components/Cards/WhiteCard';
import Button from 'components/Button';
import Box from 'components/Box';
import Icon from 'components/Icon';
import Dialog from 'components/Dialog';
import ProfileHeadCard from 'components/ProfileHeadCard';
import { getActions } from 'constants/actions';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';
import { button_styles } from 'styles/button';
import { styles } from './styles';

const Settings = ({ navigation }) => {
  const { logout, user } = React.useContext(AuthProvider);
  const { isOpen, open, close } = useIsOpen();
  const { startLoading, stopLoading, isLoading } = useLoader();

  const [profileRes, fetchProfile] = useQuery({
    query: getProfileQuery,
  });

  const [_, deleteUser] = useMutation(deleteUserMutation);

  const profile = profileRes?.data?.me;

  const handleDeleteUser = async () => {
    startLoading();
    try {
      const res = await deleteUser({});
      close();
      if (res.data?.deleteUser?.success) return logout();
    } catch (e) {
      console.log(e);
    } finally {
      stopLoading();
    }
  };

  return (
    <HeadedScreen
      backgroundColor={'#fff'}
      header={'Settings'}
      actions={getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        [
          user?.userType === 1 && 'editIcon',
          {
            onPress: () =>
              navigation.navigate('EditProfile', {
                onUpdate: () =>
                  fetchProfile({
                    requestPolicy: 'network-only',
                  }),
              }),
          },
        ],
      )}
      contentContainerProps={{
        backgroundColor: colors['gray scale/5'],
      }}
      headerStyle={{ title: { ...typography['body/large – Bold'] } }}
      divider>
      {user?.userType === 1 && (
        <ProfileHeadCard
          userName={profile?.fullName}
          userType={user?.userType}
          picture={profile?.picture}
          title={profile?.title}
          imageStyle={{ marginTop: 18 }}
          textStyle={{ marginBottom: 17 }}
        />
      )}
      <Box flex={0.7}>
        <WhiteCard mt={3}>
          <Button
            onPress={() => {
              navigation.navigate('PaymentMethod');
            }}
            shadow={false}
            size="large"
            textStyle={[
              typography['body/small – regular'],
              { color: colors['gray scale/90'] },
            ]}
            appearance="ghost"
            icon={Icon('chevron-left', 'pm')}
            style={styles.optionButtons}>
            Payment Method
          </Button>
          <Button
            onPress={() => navigation.navigate('AboutUs')}
            shadow={false}
            size="large"
            textStyle={[
              typography['body/small – regular'],
              { color: colors['gray scale/90'] },
            ]}
            appearance="ghost"
            icon={Icon('chevron-left', 'pm')}
            style={styles.optionButtons}>
            About Us
          </Button>
          <Button
            onPress={() => navigation.navigate('TermsOfUse')}
            shadow={false}
            size="large"
            textStyle={[
              typography['body/small – regular'],
              { color: colors['gray scale/90'] },
            ]}
            appearance="ghost"
            icon={Icon('chevron-left', 'pm')}
            style={styles.optionButtons}>
            Terms of Service
          </Button>
          <Button
            onPress={() => navigation.navigate('PrivacyPolicy')}
            shadow={false}
            size="large"
            textStyle={[
              typography['body/small – regular'],
              { color: colors['gray scale/90'] },
            ]}
            appearance="ghost"
            icon={Icon('chevron-left', 'pm')}
            style={styles.optionButtons}>
            Privacy Policy
          </Button>
        </WhiteCard>
      </Box>

      <Box px={20} flex={0.5} mb={4} justifyContent={'flex-end'}>
        <Box flex={0.5}>
          <Box
            as={Button}
            onPress={() => navigation.navigate('ChangePassword')}
            disabled={!profile}
            {...button_styles['primary']}
            textStyle={{
              ...typography['buttons/large'],
              textTransform: 'uppercase',
            }}>
            Change Password
          </Box>

          <Box
            as={Button}
            mt={15}
            {...button_styles['clear_gray_border']}
            textStyle={{
              ...typography['buttons/large'],
              color: colors['gray scale/40'],
              textTransform: 'uppercase',
            }}
            onPress={logout}
            disabled={!profile}>
            Sign Out
          </Box>
        </Box>
      </Box>
      <Dialog
        visible={isOpen}
        title={'Are you sure you would like to delete your account?'}
        content={'This action is not reversible!'}
        onHide={close}
        isLoading={isLoading}
        styles={{
          content: { paddingVertical: 0, marginTop: 7, marginBottom: 10 },
        }}
        buttons={[
          {
            children: 'Cancel',
            hide: false,
            theme: 'bordered_clear',
            style: { paddingHorizontal: '10%' },
            onPress: close,
          },
          {
            children: 'Delete',
            flex: 1,
            theme: 'danger',
            style: { paddingHorizontal: '10%' },
            onPress: handleDeleteUser,
          },
        ]}
      />
    </HeadedScreen>
  );
};

export default Settings;
