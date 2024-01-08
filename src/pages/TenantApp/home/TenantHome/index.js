import React, { useMemo } from 'react';
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useQuery } from 'urql';
import { useLoader } from 'hooks/useLoader';
import AuthProvider from 'providers/auth';
import myLeasesQuery from 'queries/rentals/myLeases.gql';
import Box from 'components/Box';
import Text from 'components/Text';
import format from 'date-fns/format';
import Button from 'components/Button';
import BuildingCard from 'components/BuildingCard';
import ScrollHeader from 'components/ScrollHeader';
import { getActions } from 'constants/actions';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { button_styles } from 'styles/button';
import { typography } from 'styles/typography';
import { style } from './style';

const whiteCardContent = [
  {
    title: 'Attention!',
    time: '07:40 am',
    content:
      "Don't forget, on these dates the water will be turned off at these hours",
    isContactManager: true,
  },
  {
    title: 'Attention!',
    time: '07:40 am',
    content:
      "Don't forget, on these dates the water will be turned off at these hours",
    isContactManager: false,
  },
  {
    title: 'Attention!',
    time: '07:40 am',
    content:
      "Don't forget, on these dates the water will be turned off at these hours",
    isContactManager: false,
  },
  {
    title: 'Attention!',
    time: '07:40 am',
    content:
      "Don't forget, on these dates the water will be turned off at these hours",
    isContactManager: false,
  },
];

const TenantHome = ({ navigation }) => {
  const { onboarding } = React.useContext(AuthProvider);
  const [res] = useQuery({ query: myLeasesQuery });
  const { building } = useMemo(() => parseData(res), [res?.data]);
  const { loader } = useLoader({ isLoading: !res?.data?.me?.id });

  const navBarProps = React.useMemo(
    () => ({
      alignment: 'center',
      actions: getActions(['bell', { onPress: () => navigation.navigate('Notifications') }]),
      headerIcon: true,
      divider: true,
    }),
    [],
  );

  const renderContent = React.useCallback(() => {
    return (
      <>
        {loader}
        <Box as={ScrollView} mb={20} my={1} height="100%" mt={90}>
          <Box
            as={TouchableWithoutFeedback}
            onPress={() =>
              navigation.navigate('PropertyDetails', { id: building?.id })
            }>
            <BuildingCard
              name={building?.displayName}
              location={building?.fullAddress}
              image={building?.photos[0]}
            />
          </Box>
          <Box px="5%">
            <Box mt={1}>
              <Text style={style.textTitle}>
                {format(new Date(), 'MMMM dd yyyy')}
              </Text>
            </Box>
            {whiteCardContent.map(item => (
              <Box flexDirection="column" mt={10}>
                <Box flexDirection="row" style={style.titleWrapper}>
                  <Text style={style.title}>{item.title}</Text>
                  <Text
                    style={[
                      style.content,
                      { color: colors['gray scale/40'], fontSize: 12 },
                    ]}>
                    {item.time}
                  </Text>
                </Box>
                <Box>
                  <Text style={style.content}>{item.content}</Text>
                </Box>
                <Box width="100%" alignItems="flex-end">
                  {item.isContactManager && (
                    <Box
                      as={Button}
                      mt={15}
                      textStyle={style.buttonText}
                      style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 12, paddingHorizontal: -1 }}
                      onPress={() => navigation.navigate('ManagementProfile', {
                        userType: 3,
                        id: building?.manager?.id,
                        isTenant: true,
                        isContactManager: true
                      })}>
                      Contact Manager
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    );
  }, [loader, whiteCardContent, building]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/bg-image-tenant-home.png')}
      contentContainerStyle={{ paddingTop: 40 }}
      innerContainerStyle={{ marginTop: 160 }}
      isDrawer={false}
      imageContent={t(
        !onboarding,
        <Box mt={2} mx={5}>
          <Text
            style={{
              ...typography['image/BG - Bold'],
              color: 'white',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            Welcome to your Tigra Tenant Space!
          </Text>
        </Box>,
      )}
    />
  );
};

const parseData = res => {
  const me = res?.data?.me;
  const lease = me?.currentLease || me?.latestLease;
  const building = lease?.unit?.building;
  return { me, lease, building };
};

export default TenantHome;
