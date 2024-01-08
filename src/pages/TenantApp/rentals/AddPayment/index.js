import React, { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import TabListButton from 'components/TabListSelect/TabListButton';
import Button from 'components/Button';

export const PAY_METHOD = {
  bank_account: 'Bank Account',
  card: 'Credit Card',
};

const paymentMethod = ['bank_account', 'card'];

const ChoosePaymentMethod = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          title="Add A Payment Method"
          divider
          style={{
            title: {
              fontWeight: '700',
            },
          }}
        />
        <Box px={20} justifyContent="space-between" flex={1} pb={35}>
          <Box>
            {paymentMethod.map((e, index) => (
              <TabListButton
                key={index}
                isRadio={true}
                text={PAY_METHOD[e]}
                onButtonPress={() => {
                  setSelectedValue(index);
                }}
                isChecked={selectedValue === index}
                textStyle={{ fontSize: 16 }}
              />
            ))}
          </Box>
          <Box
            style={{ borderRadius: 12 }}
            textStyle={{ fontSize: 16, textTransform: 'uppercase' }}
            as={Button}
            onPress={() =>
              selectedValue >= 0 &&
              navigation.navigate('AddPayment', {
                type: selectedValue + 1,
              })
            }>
            Add
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChoosePaymentMethod;
