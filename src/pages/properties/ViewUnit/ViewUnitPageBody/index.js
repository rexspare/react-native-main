import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Box from 'components/Box';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Button from 'components/Button';
import WhiteFeaturesCard from 'components/Features/WhiteFeaturesCard';
import AmenitiesList from 'components/AmenitiesList';
import BuildingCard from 'components/BuildingCard';
import Persona from 'components/Persona';
import ActivityFeedButton from 'components/ActivityFeed/ActivityFeedButton';
import { t } from 'helpers/react';
import { format } from 'helpers/date';
import { usaDateFormat } from 'constants/dateFormat';
import { toCapitalize } from 'utils/exchanges';
import { RENT_TYPES, stringifyEnumValue, UNIT_STATUS } from 'constants/enums';
import { button_styles } from 'styles/button';
import { typography } from 'styles/typography';
import { styles } from '../styles';
import { colors } from 'styles/theme';

const horizontalSpacing = 20;

const ViewUnitPageBody = ({ unit, navigation }) => {
  const [lastTenant, setLastTenant] = useState();

  useEffect(() => {
    setLastTenant(unit?.tenants?.edges);
  }, [unit?.tenants?.edges]);

  const rentalLnk = () => {
    return (
      <TouchableOpacity>
        <Icon pack={'pm'} name="copy" width={32} height={32} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <WhiteFeaturesCard
        containerProps={{ mt: 3 }}
        labelProps={styles.whiteCardLabel}
        styles={{ features: { row: styles.whiteCardRow } }}
        features={[
          {
            content: Object.keys(UNIT_STATUS)
              .filter(k => UNIT_STATUS[k] === unit?.status)
              .map(k =>
                k
                  .split('_')
                  .map(w => toCapitalize(w, true))
                  .join(' '),
              ),
            label: 'Unit Status',
          },
          ,
          {
            content: stringifyEnumValue(RENT_TYPES, unit?.rentType),
            label: 'Regulation Status',
            contentStyle: { textTransform: "capitalize" }
          },
          { content: unit?.floor ? unit?.floor : "N/A", label: 'Floor' },
          {
            content: unit?.vacancyDate
              ? format(new Date(unit?.vacancyDate), usaDateFormat)
              : '',
            label: 'Vacancy Date',
          },
          { content: unit?.areaSize ? `${unit?.areaSize} SQ FT` : "N/A", label: 'Unit SQ FT' },
          {
            label: 'Rental Application Link',
            contentJsx: rentalLnk(),
          },
        ]}>
        {unit?.amenities?.length > 0 && <AmenitiesList
          mt={3}
          mb={2}
          style={{ marginHorizontal: 20 }}
          amenities={unit?.amenities?.edges.map(({ node }) => node)}
        />}
        <Box px={horizontalSpacing}>
          <Divider />
        </Box>

        {t(unit?.building, <Box px={horizontalSpacing} pt={10} pb={20}>
          <Box
            mb="3"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Text style={{ ...typography['body/medium – medium'], color: colors['gray scale/40'], textTransform: 'uppercase' }}>
              More about Building
            </Text>
          </Box>
          <TouchableOpacity
            activeOpacity={0.75}
            disabled={!unit?.building?.id}
            onPress={() =>
              !unit?.draftItem && navigation.navigate('ViewProperty', { id: unit?.building?.id })
            }>
            <BuildingCard
              name={unit?.building?.displayName}
              vacantCount={unit?.building?.vacantUnits?.edgeCount}
              location={(unit?.building?.address && unit?.building?.city) ? `${unit?.building?.address}, ${unit?.building?.city}` : "N/A"}
              image={unit?.building?.photos?.[0]}
              mx="-2"
            />
          </TouchableOpacity>
        </Box>)}
        <Box px={horizontalSpacing}>
          <Divider />
        </Box>
        {t(
          lastTenant,
          <Box pt={10} pb={20}>
            <Box px={horizontalSpacing}>
              <Box
                mb="3"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text
                  category="label"
                  style={{ ...typography['body/medium – medium'], color: colors['gray scale/40'], textTransform: 'uppercase' }}>
                  {unit?.status == '1' ? 'Previous Tenants' : 'Tenants'}
                </Text>
              </Box>
              {lastTenant ? lastTenant?.map(({ node }) => (
                <Persona
                  profile={node?.picture}
                  key={node?.id}
                  name={node?.fullName}
                  avatarProps={{ shape: 'rounded' }}
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      screen: 'ViewTenant',
                      params: { id: node?.id },
                    })
                  }
                  styles={{ text: { ...typography['body/medium – medium'] }, image: { marginLeft: -12, borderRadius: 50 / 2, backgroundColor: colors['gray scale/5'], borderWidth: 0, } }}
                />
              )) : (
                <Text category="c2" flex={1} my={2} textAlign="center">
                  No Tenants
                </Text>
              )}
            </Box>
            <Box mx={1}>
              <ActivityFeedButton
                unit={unit?.tenants?.edges}
                navigation={navigation}
                title={unit?.status == '1' ? 'See all previous tenants' : "See all tenants"}
                url="PreviousTenant"
              />
            </Box>
          </Box>,
        )}

        {t(
          unit?.tenants?.edges?.length,
          <Box px={horizontalSpacing}>
            <Divider />
          </Box>,
        )}
        {t(!unit?.draftItem, <Box mt={3} pb={3} mx={1}>
          <Box
            as={Button}
            mx={3}
            children={'Post'}
            {...button_styles['primary']}
          />
          <ActivityFeedButton
            title="Activity"
            feedId={unit?.activityFeed?.pk}
          />
        </Box>)}
      </WhiteFeaturesCard>
    </>
  );
};

export default ViewUnitPageBody;
