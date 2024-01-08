import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from '@ui-kitten/components';
import MakePayment from 'pages/TenantApp/rentals/MakePayment';
import Box from 'components/Box';
import { button_styles } from 'styles/button';

export const STATUS_VARS = {
  ['OVERDUE']: {
    buttonProps: { ...button_styles['primary'] },
    text: 'Pay Now',
  },
  ['UNPAID']: { buttonProps: { ...button_styles['primary'] }, text: 'Pay Now' },
  ['PENDING']: {
    buttonProps: { ...button_styles['primary'], disabled: true },
    text: 'Pending',
  },
  ['PAID']: {
    buttonProps: { ...button_styles['greyed'], disabled: true },
    text: 'Paid',
  },
};

const LeasePaymentButton = ({ status = 'UNPAID', paymentId, ...props }) => {
  const { buttonProps, text } = STATUS_VARS[status];
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <Box
        as={Button}
        onPress={() => setOpen(true)}
        width={'100%'}
        {...buttonProps}
        {...props}
        style={{ ...buttonProps.style, ...props.style }}>
        {text}
      </Box>
      <MakePayment
        navigation={navigation}
        paymentId={paymentId}
        visible={open}
        onHide={() => setOpen(false)}
      />
    </>
  );
};

export default LeasePaymentButton;
