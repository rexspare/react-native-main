import React from 'react';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Button from 'components/Button';
import { button_styles } from 'styles/button';
import ActivityFeedButton from 'components/ActivityFeed/ActivityFeedButton';
import WhiteFeaturesCard from 'components/Features/WhiteFeaturesCard';
import { styles } from '../styles';
import AmenitiesList from 'components/AmenitiesList';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import { splitString } from 'utils/exchanges';

const ViewPropertyPageBody = ({ building, navigation }) => {
  const permissions = usePermissions(PERMISSION_SECTIONS.FINANCIALS);

  return (
    <WhiteFeaturesCard
      containerProps={{ mt: 3 }}
      labelProps={styles.whiteCardLabel}
      features={[
        {
          label: 'Ownership',
          content: `${building?.managementCompany?.name ? splitString(
            building?.managementCompany?.name.toUpperCase() ?? '',
            20,
          ) : "N/A"}`,
        },
        {
          label: 'Address',
          content: building?.address || building?.city ? `${!!building?.address ? building?.address : ""} , ${building?.city ? `${building?.city}` : ""}` : "N/A",
        },
        { label: 'State', content: building?.state ? building?.state : "N/A" },
        { label: 'ZIP Code', content: building?.zip ? building?.zip : "N/A" },
        building?.automatedData?.block && {
          label: 'Block',
          content: building?.automatedData?.block,
        },
        building?.automatedData?.lot && {
          label: 'Lot',
          content: building?.automatedData?.lot,
        },
        building?.lotDimensions?.[0] && {
          label: 'Lot SQ FT',
          content: `${(building?.lotDimensions?.[0] ?? 0) *
            (building?.lotDimensions?.[1] ?? 0)} SQ FT`,
        },
        building?.lotDimensions?.[0] && {
          label: 'Lot Dimensions',
          content: `${building?.lotDimensions?.[0] ?? 0} FT x ${building
            ?.lotDimensions?.[1] ?? 0} FT`,
        },
        building?.automatedData?.year && {
          label: 'Year Built',
          content: building?.automatedData?.year,
        },
        building?.automatedData?.bldgcl && {
          label: 'Building Class',
          content: building?.automatedData?.bldgcl,
        },
        building?.areaSize && {
          label: 'Building SQ FT',
          content: `${building?.areaSize} SQ FT`,
        },
        building?.automatedData?.taxclass && {
          label: 'Taxes',
          content: `$${building?.automatedData?.taxclass}`,
        },

        // { label: 'Neighborhood', content: building?.neighbourhood },
        // { label: "Floors", content: building?.floors },
        // { label: "Tax Class", content: `${building?.taxClass}%` },
        { label: 'Max FAR', content: building?.maxFar ? building?.maxFar : "N/A" },
        { label: 'Building FAR', content: building?.far ? building?.far : "N/A" },
      ]}>
      <Divider mb={0} />
      <AmenitiesList
        mx={3}
        mt={3}
        styles={{ title: { color: '#727978' } }}
        amenities={building?.amenities?.edges?.map(({ node }) => node)}
      />
      {building?.amenities?.edges?.length > 0 && (
        <Divider mt={4} style={{ backgroundColor: '#E7E9E9' }} />
      )}
      <Box mt={30}>
        {!building?.draftItem && !permissions.isHidden && (
          <Box
            as={Button}
            mx={3}
            children={'Financials'}
            onPress={() =>
              navigation.navigate('ViewAllTransactions', {
                variables: { building: building?.pk },
                header: building?.displayName,
              })
            }
            {...button_styles['primary']}
          />
        )}
        {!building?.draftItem && <ActivityFeedButton
          feedId={building?.activityFeed?.pk}
          title="Activity"
          listProps={{ variables: { building: building?.pk } }}
        />}
      </Box>
    </WhiteFeaturesCard>
  );
};

export default ViewPropertyPageBody;
