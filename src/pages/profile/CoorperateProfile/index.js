import React, { useMemo, useContext } from 'react';
import { useQuery } from 'urql';
import ProfilePage from 'components/ProfilePage';
import { getActions } from 'constants/actions';
import {
  tabs as allTabs,
  steps as allSteps,
  getUserProfileQuery,
  getManagerProfileQuery,
} from './schema';
import AuthContext from 'providers/auth';
import Work from './Work/index.js';

const CoorperateProfile = ({ navigation, userId, userType, isSelf, isTenant, isContactManager }) => {
  const { permissions } = useContext(AuthContext);
  const [profileRes, fetchProfile] = useQuery({
    query:
      userType == 2
        ? getUserProfileQuery(userType)
        : getManagerProfileQuery(userType),
    pause: !userId,
    variables: { id: userId },
    requestPolicy: 'network-only',
  });

  const actions = useMemo(
    () =>
      getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        permissions?.profile.edit && [
          'editIcon',
          {
            onPress: () =>
              navigation.navigate('EditProfile', {
                onUpdate: () => fetchProfile(),
              }),
            disable: true,
            height: 21,
            width: 21,
            marginTop: 3,
          },
        ],
        !isTenant && ['setting', { onPress: () => navigation.navigate('Settings') }],
      ),
    [navigation],
  );

  const { tabs, steps } = isTenant ?
    useMemo(
      () => ({
        tabs: allTabs,
        steps: allSteps,
      }),
      [isSelf, permissions?.profile?.view],
    ) :
    useMemo(
      () => ({
        tabs:
          !isSelf && !permissions?.profile?.view
            ? [
              {
                text: 'Work',
                value: 'isWork',
              },
            ]
            : allTabs,
        steps: !isSelf && !permissions?.profile?.view ? [Work] : allSteps,
      }),
      [isSelf, permissions?.profile?.view],
    );

  return (
    <ProfilePage
      user={profileRes?.data?.user}
      userId={userId}
      fetching={profileRes?.fetching}
      navigation={navigation}
      actions={actions}
      userType={userType}
      tabs={tabs}
      steps={steps}
      isSelf={isSelf}
      permissions={permissions}
      isTenant={isTenant}
      isContactManager={isContactManager}
    />
  );
};

export default CoorperateProfile;
