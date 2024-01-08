import React from 'react';
import {Text} from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';

import {styles} from './styles';

const OutstandingDebtInfo = ({rentPayment, outstandingDebt}) => {
  return (
    <>
      <Box style={styles.rentPaymentRow}>
        <Box style={styles.rentAndDebtItemRow}>
          <Box
            as={Button}
            icon={style => Icon('rent-payment-details', 'pm')({...style, ...styles.rentAndDebtItemIcon})}
            appearance="ghost"
            style={styles.rentAndDebtItemIcon}
          />
          <Text style={styles.rentAndDebtItemText}>Rent payment:</Text>
        </Box>
        <Text style={styles.rentAndDebtItemPrice}>${rentPayment}</Text>
      </Box>
      <Box style={styles.outstandingDebtRow}>
        <Box style={styles.rentAndDebtItemRow}>
          <Box
            as={Button}
            icon={style =>Icon('outstanding-debt-details', 'pm')({...style, ...styles.rentAndDebtItemIcon})}
            appearance="ghost"
            style={styles.rentAndDebtItemIcon}
          />
          <Text style={styles.rentAndDebtItemText}>Outstanding debt:</Text>
        </Box>
        <Text style={styles.rentAndDebtItemPrice}>${outstandingDebt}</Text>
      </Box>
    </>
  );
};

export default OutstandingDebtInfo;
