import React from 'react';
import Box from 'components/Box';
import CarouselCard from 'components/Cards/CarouselCard';
import Text from 'components/Text';
import Location from 'img/icons/location-1.svg';
import Dot from 'components/dot';
import { formatAmount } from 'utils/exchanges';
import { styles } from '../styles';

const ViewUnitPageHead = ({ unit }) => {
  return (
    <CarouselCard
      title={unit?.unitNumber && unit?.unitNumber != 'undefined' ? `Unit ${unit?.unitNumber}` : "Unit N/A"}
      images={unit?.photos}
      unit={unit?.price ? formatAmount(parseFloat(unit?.price)) : "N/A"}
      isUnit={true}>
      <Box justifyContent="flex-start" mb={3}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Box style={styles.info}>
            <Text style={{ ...styles?.address, textAlign: 'left' }}>
              {unit?.bedroomCount > 1
                ? unit?.bedroomCount ? `${unit?.bedroomCount} Bedroom` : "N/A Bedroom"
                : 'Studio'}
            </Text>
            <Dot />
            <Text style={styles?.address}>
              {unit?.bathroomCount ?? '-'} Bath
            </Text>
            <Dot />
            <Text style={{ ...styles?.address, textAlign: 'right' }}>
              {(!!!unit?.isFurnished ? 'Not ' : '') + 'Furnished'}
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mt={3}
          mb={3}>
          <Location />
          <Text style={styles.address1}>
            {`${unit?.building?.address ?? ''} ${(unit?.building?.city && unit?.building?.address) ? ',' : 'N/A'} ${unit?.building?.city ?? ''
              } ${!!unit?.building?.state || !!unit?.building?.zip
                ? ', ' +
                (unit?.building?.state ?? '') +
                ' ' +
                (unit?.building?.zip ?? '')
                : ''
              }`}</Text>
        </Box>
        <Box mt={10}>
          <Text style={styles.description}>{unit?.description ? unit?.description : "N/A"}</Text>
        </Box>
      </Box>
    </CarouselCard>
  );
};

export default ViewUnitPageHead;
