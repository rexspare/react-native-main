import React from 'react';
import Text from 'components/Text';
import ScrollableWhiteCard from 'components/ScrollableWhiteCard';
import Box from 'components/Box';
import { View } from 'react-native';
import { useQuery } from 'urql';
import PropertyDetail from 'queries/rentals/propertyDetail.gql';
import { useLoader } from 'hooks/useLoader';
import Persona from 'components/Persona';
import CarouselCard from 'components/Cards/CarouselCard';
import Location from 'img/icons/location-1.svg';
import Button from 'components/Button';
import { style } from './style';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const PropertyInfo = ({ buildingId, navigation }) => {
  const [res] = useQuery({
    query: PropertyDetail,
    pause: !buildingId,
    variables: { id: buildingId },
    requestPolicy: 'network-only',
  });
  const building = res?.data?.building;
  const { loader } = useLoader({ isLoading: res?.fetching });
  return (
    <View>
      <ScrollableWhiteCard minHeight="95%">
        {loader}
        <CarouselCard images={building?.photos} title={building?.displayName}>
          <Box mt={10} mb={10} style={style.infoBox}>
            {building?.units?.totalCount && (
              <Text style={style.subTitle}>
                {building?.units?.totalCount}{' '}
                {building?.units?.totalCount > 1 ? 'UNITS' : 'UNIT'}
              </Text>
            )}
            <Box
              width={6}
              height={6}
              borderRadius={20}
              bg={colors['primary/50 – brand']}
            />
            <Text style={style.subTitle}>
              {(building?.floors && building?.floors + ' FLOORS') || '- FLOORS'}
            </Text>
            <Box
              width={6}
              height={6}
              borderRadius={20}
              bg={colors['primary/50 – brand']}
            />
            <Text style={style.subTitle}>
              {building?.neighbourhood || building?.address || building?.city}
            </Text>
          </Box>
          <Box mt={10} flexDirection={`row`}>
            <Location style={style.arrowRightIcon} />
            <Text style={style.titleThinner}>
              {building?.fullAddress.toUpperCase()}
            </Text>
          </Box>
          <Box mt={20} mb={10}>
            <Text style={style.semiBoldTitle}>{`LANDLORD`.toUpperCase()}</Text>
            <Box style={style.personaContainer}>
              <Persona
                key={building?.owner?.id}
                profile={building?.owner?.picture}
                name={building?.owner?.fullName}
                title={building?.owner?.title}
                width={'80%'}
                styles={{
                  text: {
                    ...typography['body/medium – medium'],
                    color: colors['gray scale/90'],
                  },
                }}
              />
              <Button
                shape="circle"
                size="small"
                appearance="outline"
                style={style.viewButton}
                onPress={() =>
                  navigation.navigate('ManagementProfile', {
                    userType: 3,
                    id: building?.owner?.id,
                    isTenant: true,
                    isContactManager: true,
                  })
                }>
                VIEW
              </Button>
            </Box>
          </Box>
          <Box mb={10}>
            <Text style={style.semiBoldTitle}>{`PROPERTY MANAGERS`}</Text>
            <Box>
              {building?.managementTeam?.members?.map(e => {
                return (
                  <Box style={style.personaContainer}>
                    <Persona
                      key={e?.id}
                      profile={e?.picture}
                      name={e?.fullName}
                      title={e?.title}
                      width={'80%'}
                      styles={{
                        text: {
                          ...typography['body/medium – medium'],
                          color: colors['gray scale/90'],
                        },
                      }}
                    />
                    <Button
                      shape="circle"
                      size="small"
                      appearance="outline"
                      style={style.viewButton}
                      onPress={() =>
                        navigation.navigate('ManagementProfile', {
                          userType: 3,
                          id: e?.id,
                          isTenant: true,
                          isContactManager: true,
                        })
                      }>
                      VIEW
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box mb={30}>
            <Text style={style.semiBoldTitle}>{`RELEVANT CONTACTS`}</Text>
            {building?.managementCompany?.employees?.edges?.map(({ node }) => (
              <Box style={style.personaContainer}>
                <Persona
                  key={node.id}
                  profile={node.picture}
                  name={node.fullName}
                  subtext={node.title}
                  width={'80%'}
                  styles={{
                    subtext: { left: 10 },
                    text: {
                      ...typography['body/medium – medium'],
                      color: colors['gray scale/90'],
                    },
                  }}
                />
                <Button
                  shape="circle"
                  size="small"
                  appearance="outline"
                  style={style.viewButton}
                  onPress={() =>
                    navigation.navigate('ManagementProfile', {
                      userType: 3,
                      id: node?.id,
                      isTenant: true,
                      isContactManager: true,
                    })
                  }>
                  VIEW
                </Button>
              </Box>
            ))}
          </Box>
        </CarouselCard>
      </ScrollableWhiteCard>
    </View>
  );
};
export default PropertyInfo;
