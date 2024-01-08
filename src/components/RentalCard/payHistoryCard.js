import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import Text from 'components/Text';
import { styles } from './styles';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const PayHistoryCard = ({
  price,
  notes,
  paymentMethod,
  onViewDetails,
  ...props
}) => {
  return (
    <Box
      as={TouchableOpacity}
      onPress={onViewDetails}
      mx={20}
      mt={12}
      style={styles.container}
      {...props}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={typography['body/xlarge – medium']}>
          {notes.charAt(0).toUpperCase() + notes.slice(1)}
        </Text>
        <Text style={typography['body/xlarge – medium']}>
          {price &&
            '$' +
              price?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </Box>
      <Text
        style={[
          typography['body/small – normal'],
          { color: colors['gray scale/40'], textTransform: 'capitalize' },
        ]}>
        {paymentMethod}
      </Text>
    </Box>
  );
};

export default PayHistoryCard;
