import React, { useMemo, useState, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import TabListSelect from 'components/TabListSelect/TabListSelect';
import Box from 'components/Box';
import Button from 'components/Button';
import HeadedScreen from 'components/HeadedScreen';
import PaymentMethodIcon from 'components/PaymentMethodIcon';
import { getActions } from 'constants/actions';
import { chain } from 'helpers/func';
import { colors } from 'styles/theme';
import { styles } from './style';

const getTabListData = (selectedPaymentMethod, fill, activeFill) => [
  {
    text: 'Card',
    value: '1',
    icon: (
      <PaymentMethodIcon
        method={'card'}
        fill={selectedPaymentMethod?.value === '1' ? activeFill : fill}
        activeFill={'fff'}
      />
    ),
  },

  {
    text: 'Bank',
    value: '2',
    icon: (
      <PaymentMethodIcon
        method={'bank'}
        fill={selectedPaymentMethod?.value === '2' ? activeFill : fill}
      />
    ),
  },

  {
    text: 'Paypal',
    value: '3',
    icon: (
      <PaymentMethodIcon
        method={'paypal'}
        fill={selectedPaymentMethod?.value === '3' ? activeFill : fill}
      />
    ),
  },
  {
    text: 'Check',
    value: '4',
    icon: (
      <PaymentMethodIcon
        method={'check'}
        fill={selectedPaymentMethod?.value === '4' ? activeFill : fill}
      />
    ),
  },
  {
    text: 'Cash',
    value: '5',
    icon: (
      <PaymentMethodIcon
        method={'cash'}
        fill={selectedPaymentMethod?.value === '5' ? activeFill : fill}
      />
    ),
  },
  {
    text: 'Other',
    value: '6',
    icon: (
      <PaymentMethodIcon
        method={'other'}
        fill={selectedPaymentMethod?.value === '6' ? activeFill : fill}
      />
    ),
  },
];

const AmountPage = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState();
  const fill = colors['gray scale/60'];
  const activeFill = colors['gray scale/0'];

  const tabListData = useMemo(
    () => getTabListData(paymentMethod, fill, activeFill),
    [paymentMethod],
  );

  const clearFields = chain([
    () => setAmount(''),
    () => setPaymentMethod(null),
  ]);

  useEffect(() => {
    setAmount(route?.params?.value?.amount);
    setPaymentMethod(route?.params?.value?.paymentMethod);
  }, [route?.params?.value]);

  const onSuccess = () => {
    clearFields();
    route.params?.onDone({ amount, paymentMethod });
    navigation.goBack();
  };

  return (
    <HeadedScreen
      alignment="center"
      title="Enter amount"
      actions={getActions(['back', { onPress: () => navigation.goBack() }])}>
      <Box flex={1} justifyContent={'center'} marginBottom="40%">
        <Box width={'100%'} flexDirection={'row'} justifyContent="center">
          <Text style={styles.textInputDollarSign}>$</Text>
          <TextInput
            keyboardType={'decimal-pad'}
            autoFocus={true}
            value={amount}
            onChangeText={setAmount}
            blurOnSubmit={true}
            style={styles.textInput}
          />
        </Box>
        <View style={styles.tablistContainer}>
          <TabListSelect
            buttonWidth={'30%'}
            values={tabListData}
            isRadio={false}
            onPress={selectedItem => setPaymentMethod(selectedItem)}
            flexDirection={'row'}
            currentSelectedItem={paymentMethod}
          />
        </View>
        <Button
          onPress={onSuccess}
          style={styles.doneBtn}
          size="large"
          textStyle={styles.buttonText}>
          Done
        </Button>
      </Box>
    </HeadedScreen>
  );
};

export default AmountPage;
