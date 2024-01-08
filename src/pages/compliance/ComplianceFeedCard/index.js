import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Box from 'components/Box';
import Text from 'components/Text';
import withComplianceType from '../hoc/withComplianceType';
import { complianceColors } from '../ComplianceDetailsPage/helpers';
import { COMPLIANCE_CARD_TYPE_MAP } from '../const';
import styles from './styles';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const ComplianceFeedCard = ({
  title = 'Violation',
  type = 'HPD',
  supplierId,
  id,
  location,
  navigation,
  __typename,
  unit,
}) => {
  return (
    <Box
      style={styles.container}
      as={TouchableOpacity}
      onPress={() =>
        navigation.navigate('ComplianceDetails', { id, __typename, title })
      }>
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Text
            marginRight={10}
            style={{
              ...typography['heading-medium'],
              textTransform: 'uppercase',
            }}>
            {title} #{supplierId}
          </Text>
        </Box>
        <Box
          backgroundColor={complianceColors[type]}
          px={'8px'}
          style={{ borderRadius: 8 }}>
          <Text
            style={{
              ...typography['body/small – normal'],
              color: colors['gray scale/0'],
              textTransform: 'uppercase',
            }}>
            {type}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row">
        <Text numberOfLines={1} style={styles.location}>
          {location}
        </Text>
        {unit?.unitNumber && (
          <Text style={styles.location}> / unit{unit?.unitNumber}</Text>
        )}
      </Box>
    </Box>
  );
};

export default withComplianceType(ComplianceFeedCard, COMPLIANCE_CARD_TYPE_MAP);
