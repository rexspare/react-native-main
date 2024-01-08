import React from 'react';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import PaymentComponent from './PaymentComponent';

const EditPayment = ({ navigation, route }) => {
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
          title="Edit Payment Method"
          divider
          style={{
            title: {
              fontWeight: '700',
            },
          }}
        />
        <PaymentComponent edit={true} navigation={navigation} />
      </Box>
    </Box>
  );
};

export default EditPayment;
