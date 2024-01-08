import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import StatsItem from '../StatsItem/statsItem';
import { formatAmount } from 'utils/exchanges';
import { colors } from 'styles/theme';
import { styles } from './styles';

const TotalValues = ({
  companyName,
  date,
  cashIn,
  cashOut,
  title,
  title1,
  title2,
  style,
  ...props
}) => {
  return (
    <Box style={{ ...styles.mainContainer, ...style }} {...props}>
      <Box style={styles.titleContainer}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.timeFrameText}>{date}</Text>
      </Box>
      <Box style={styles.statsContainer}>
        <StatsItem
          title={title1}
          value={formatAmount(cashIn)}
          bgColor={colors['primary/50']}
        />
        <StatsItem
          title={title2}
          value={formatAmount(cashOut)}
          bgColor={colors['primary/brand']}
        />
        <StatsItem
          title={title}
          value={formatAmount(cashIn - cashOut)}
          bgColor={colors['additional/success']}
        />
      </Box>
    </Box>
  );
};

export default TotalValues;
