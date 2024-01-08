import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import UnitStatusBadge from './UnitStatusBadge';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const UnitCards = ({ style, price, status, unitNumber, draftItem }) => {
  const formatPrice = price => {
    const formattedPrice = price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedPrice;
  };

  return (
    <Box
      px={3}
      flexDirection="row"
      justifyContent="space-between"
      style={style}
      alignItems="center">
      <Box flexDirection="row" justifyContent="space-between">
        <Text
          my={10}
          color={colors['gray scale/90']}
          numberOfLines={1}
          style={{ ...typography['Capital/small – medium'], width: 120 }}>
          {unitNumber && unitNumber != 'undefined' ? `${unitNumber}`.toUpperCase() : "N/A"}
        </Text>
        <UnitStatusBadge
          draftItem={draftItem}
          status={status}
          position="absolute"
          left="80%"
          top={8}
          marginLeft={4}
        />
      </Box>
      <Box width={75}>
        <Text
          style={{...typography['body / medium – medium'], textAlign: 'right'}}
          color={colors['gray scale/90']}>
          {price ? `$ ${formatPrice(parseFloat(price))}` : "N/A"}
        </Text>
      </Box>
    </Box>
  );
};

export default UnitCards;
