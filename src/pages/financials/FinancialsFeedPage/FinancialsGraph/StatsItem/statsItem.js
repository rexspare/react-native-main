import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import { styles } from './styles';

const StatsItem = ({ title, value, bgColor }) => {
  return (
    <Box style={[styles.statItem, { backgroundColor: bgColor }]}>
      <Box style={styles.statTitle}>
        <Text style={styles.statTitleText}>{title}</Text>
      </Box>
      <Text style={styles.statValueText}>{value}</Text>
    </Box>
  );
};

export default StatsItem;
