import React from 'react';
import { Text } from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import PaymentMethodIcon from 'components/PaymentMethodIcon';
import {
  PAYMENT_METHODS,
  stringifyEnumValue,
  stringifyEnumKey,
} from 'constants/enums';
import { styles } from './styles';

const PaymentMethodButton = ({ paymentMethod }) => {
  const icon = paymentMethod?.text || stringifyEnumKey(paymentMethod);
  return (
    <Box mx={1} my={1} style={{ flexDirection: 'row' }}>
      <Box style={styles.bankAccountButton}>
        <Box
          as={Button}
          style={styles.bankAccountButtonIcon}
          icon={style => <PaymentMethodIcon method={icon} fill={'white'} />}
          appearance="ghost"
        />
        <Text style={styles.bankAccountButtonText}>
          {paymentMethod?.text ||
            stringifyEnumValue(PAYMENT_METHODS, paymentMethod)}
        </Text>
      </Box>
    </Box>
  );
};

export default PaymentMethodButton;
