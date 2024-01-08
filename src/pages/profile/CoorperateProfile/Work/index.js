import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'urql';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import getManagementCompanyEmployees from 'queries/properties/getAllManagementUsers.gql';
import Box from 'components/Box';
import Text from 'components/Text';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import WhiteCard from 'components/Cards/WhiteCard';
import Persona from 'components/Persona';
import BuildingCard from 'components/BuildingCard';
import Button from 'components/Button';
import WorkHours from 'components/WorkHours';
import { t } from 'helpers/react';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { USER_TYPES } from 'constants/enums';
import { button_styles } from 'styles/button';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles } from './styles';

const Work = ({ data, navigation }) => {
  const [managementUserRes, fetchManagementUsers] = useQuery({
    query: getManagementCompanyEmployees,
    requestPolicy: 'cache-and-network',
    pause: data,
  });

  const permissions = usePermissions(PERMISSION_SECTIONS.PROFILE);

  const workHours = !!data?.workHours?.length && (
    <WorkHours data={data?.workHours} />
  );

  const renderBuilding = React.useCallback(
    item => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            permissions.view &&
            (() => navigation.navigate('ViewProperty', { id: item.id }))
          }>
          <BuildingCard
            style={{
              width: '90%',
              marginLeft: '5%',
            }}
            name={item.displayName}
            location={`${item?.address}, ${item?.city}`}
            image={item.photos?.[0]}
            vacantCount={item.vacantUnits?.edgeCount}
          />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const buildingsJsx = data?.managementTeams?.length && (
    <Box>
      <Text style={styles.headingStyle}>BUILDING (S)</Text>
      {data?.managementTeams?.map(item => {
        return renderBuilding(item?.building);
      })}
    </Box>
  );

  return (
    <Box as={ScrollView}>
      <FeaturesTab
        features={[
          { label: 'Title', content: data?.title },
          { label: 'Company Name', content: data?.managementCompany?.name },
          {
            label: 'Office Phone',
            content: data?.workingDetails?.phone
              ? formatPhoneNumber(data?.workingDetails?.phone)
              : '',
          },
          { label: 'Office Email', content: data?.workingDetails?.email },
          { label: 'Office Address', content: data?.workingDetails?.address },
          !!data?.workHours?.length && {
            label: 'Hours',
            contentJsx: workHours,
          },
        ]}
        featuresChildren={data?.managementTeams.length ? buildingsJsx : null}
        styles={{
          features: {
            label: {
              ...typography['body/medium – regular'],
              color: colors['gray scale/40'],
            },
            content: {
              ...typography['body/medium – regular'],
              color: colors['gray scale/90'],
            },
            row: {
              height: 'auto',
              minHeight: 54,
              borderColor: colors['gray scale/10'],
              paddingHorizontal: 7,
            },
          },
        }}>
        <WhiteCard
          px="3"
          py={3}
          my={3}
          header={'MANAGEMENT TEAM'}
          headerProps={{ mb: 3, ...styles.headingType }}>
          {managementUserRes &&
            managementUserRes?.data?.managementUsers?.edges.map(
              ({ node: { id, picture, title, fullName } }, index) => (
                <Persona
                  onPress={() =>
                    navigation.navigate('ViewCoorperateProfile', {
                      userType: USER_TYPES.MANAGEMENT,
                      id,
                    })
                  }
                  profile={picture}
                  name={fullName}
                  title={title}
                  styles={{
                    text: {
                      ...typography['body/medium – medium'],
                      color: colors['gray scale/90'],
                    },
                  }}
                />
              ),
            )}

          {t(
            permissions?.create,
            <Box
              as={Button}
              mx={3}
              mt={1}
              mb={3}
              onPress={() =>
                navigation.navigate('AddManager', {
                  onSuccess: () =>
                    fetchManagementUsers({
                      requestPolicy: 'network-only',
                    }),
                })
              }
              children={'Add Team Member'}
              {...button_styles['bordered_clear']}
            />,
          )}
        </WhiteCard>
      </FeaturesTab>
    </Box>
  );
};

export default Work;
