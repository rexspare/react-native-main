import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

export const PAYMENT_METHODS = {
  VISA: 'visa',
  MASTER: 'master',
  BANK: 'bank_account',
  PAYPAL: 'pay_pal',
};

export const paymentMethods = {
  visa: 'Visa',
  master: 'Master Card',
  bank_account: 'Bank Account',
  pay_pal: 'PayPal',
};

export const PAYMENT = [
  {
    type: 'visa',
    code: '4567',
  },
  {
    type: 'master',
    code: '4682',
  },
  {
    type: 'bank_account',
  },
  {
    type: 'pay_pal',
  },
];

const PaymentComponent = ({ edit = false, navigation, ...props }) => {
  return (
    <Box as={ScrollView} {...props}>
      <Box mt={24} style={{ paddingHorizontal: 20 }}>
        {PAYMENT.map((e, index) => {
          return (
            <Box
              style={{
                borderWidth: 1,
                borderColor: colors['gray scale/10'],
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={index}>
              <Box flexDirection="row">
                <Icon
                  name={e.type}
                  pack="pm"
                  height={24}
                  width={24}
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={{
                    ...typography['body/medium – regular'],
                    color: colors['gray scale/90'],
                  }}>
                  {paymentMethods[e.type]}{' '}
                  {e.type === PAYMENT_METHODS.VISA ||
                  e.type === PAYMENT_METHODS.MASTER
                    ? e.code
                    : ''}
                </Text>
              </Box>
              {edit && (
                <Box
                  as={TouchableOpacity}
                  style={{
                    borderColor: colors['gray scale/40'],
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 6,
                    width: 32,
                  }}>
                  <Icon name="remove" pack="pm" height={15} width={17} />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        as={Button}
        appearance="outline"
        style={{
          backgroundColor: 'transparent',
          borderRadius: 12,
          marginHorizontal: 20,
        }}
        textStyle={{
          textTransform: 'uppercase',
          fontWeight: '500',
          fontSize: 16,
        }}
        onPress={() => navigation.navigate('AddNewPayment')}>
        Add Payment Method
      </Box>
    </Box>
  );
};

export default PaymentComponent;
