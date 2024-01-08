import React, { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Icon, Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { styles, buttonStyle } from './styles';

const AddPayment = ({ navigation, route }) => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [cardNumber, setCardNumber] = useState();
  const [cardholder, setCardholder] = useState();
  const [cardExp, setCardExp] = useState();

  useEffect(() => {
    if (route?.params?.type === 2) {
      componentWillMount();
    }
  }, [Platform, route?.params?.type]);

  const componentWillMount = () => { 
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  };

  const scanCard = () => {
    CardIOModule.scanCard({
      usePaypalActionbarIcon: false,
      useCardIOLogo: true,
      suppressManualEntry: true,
      suppressConfirmation: true,
      requireExpiry: true,
      guideColor: colors['gray scale/10'],
      hideCardIOLogo: true,
    })
      .then(card => {
        setCardNumber(card?.cardNumber);
      })
      .catch(() => {
        // the user cancelled
      });
  };

  const transformNumber = (value, originalValue) =>
    originalValue !== null && originalValue !== undefined
      ? `${originalValue}`.replace(/[^0-9.]+/g, '')
      : null;

  const transformCreditCard = value => {
    if (!value && value !== 0) {
      return '';
    }
    const number = `${transformNumber(null, value)}`;
    if (number.length <= 4) {
      return number;
    } else if (number.length <= 8) {
      return `${number.substring(0, 4)}-${number.substring(4)}`;
    } else if (number.length <= 12) {
      return `${number.substring(0, 4)}-${number.substring(
        4,
        8,
      )}-${number.substring(8)}`;
    } else {
      return `${number.substring(0, 4)}-${number.substring(
        4,
        8,
      )}-${number.substring(8, 12)}-${number.substring(12, 16)}`;
    }
  };

  const transformExp = value => {
    if (!value && value !== 0) {
      return '';
    }
    const number = `${transformNumber(null, value)}`;
    if (number.length <= 2) {
      return number;
    }
    return `${number.substring(0, 2)}/${number.substring(2, 4)}`;
  };

  const bankAccountForm = () => {
    return (
      <>
        <Input
          // onChangeText={val => setValue('title', val)}
          labelStyle={styles.inputLabelStyle}
          label={'Title'}
          inputMode="none"
          textContentType="none"
          shape="rounded"
          //   status={errors.title && 'danger'}
          //   caption={errors.title && errors.title.Title}
          size="large"
        />
        <Box flexDirection="row" justifyContent="space-between" mb={20} mt={10}>
          <Button
            style={selectedButton === 1 ? buttonStyle : styles.unActiveButton}
            textStyle={[
              styles.buttonText,
              selectedButton !== 1 && styles.unActiveText,
            ]}
            onPress={() => setSelectedButton(1)}>
            Checking
          </Button>
          <Button
            textStyle={[
              styles.buttonText,
              selectedButton !== 2 && styles.unActiveText,
            ]}
            style={selectedButton === 2 ? buttonStyle : styles.unActiveButton}
            onPress={() => setSelectedButton(2)}>
            Saving
          </Button>
        </Box>

        <Input
          // onChangeText={val => setValue('routingNumber', val)}
          labelStyle={styles.inputLabelStyle}
          label={'Routing Number'}
          inputMode="numeric"
          textContentType="numeric"
          shape="rounded"
          //   status={errors.routingNumber && 'danger'}
          //   caption={errors.routingNumber && errors.daroutingNumberte.message}
          size="large"
        />
        <Input
          // onChangeText={val => setValue('accountNumber', val)}
          labelStyle={styles.inputLabelStyle}
          label={'Account Number'}
          inputMode="numeric"
          textContentType="number"
          shape="rounded"
          //   status={errors.accountNumber && 'danger'}
          //   caption={errors.accountNumber && errors.accountNumber.message}
          size="large"
        />
      </>
    );
  };

  const cardForm = () => {
    return (
      <>
        <Input
          onChangeText={val => setCardholder(val)}
          labelStyle={styles.inputLabelStyle}
          label={'Cardholder Name'}
          inputMode="text"
          textContentType="text"
          shape="rounded"
          //   status={errors.cardholder && 'danger'}
          //   caption={errors.cardholder && errors.cardholder.message}
          size="large"
        />
        <Input
          value={transformCreditCard(cardNumber)}
          onChangeText={val => setCardNumber(val)}
          labelStyle={styles.inputLabelStyle}
          label={'Card Number'}
          inputMode="numeric"
          textContentType="number"
          shape="rounded"
          //   status={errors.cardNumber && 'danger'}
          //   caption={errors.cardNumber && errors.cardNumber.message}
          size="large"
          icon={style => <Icon name={'camera'} pack="pm" {...style} />}
          onIconPress={() => scanCard()}
        />
        <Box flexDirection="row" justifyContent="space-between">
          <Input
            containerProps={{
              style: {
                width: '63%',
              },
            }}
            placeholder="mm/yy"
            onChangeText={val => `${val}`.length <= 5 && val.slice(0, 2) <= 12 && setCardExp(val)}
            labelStyle={styles.inputLabelStyle}
            label={'Expiration Date'}
            inputMode="number-pad"
            textContentType="none"
            shape="rounded"
            value={transformExp(cardExp)}
            //   status={errors.date && 'danger'}
            //   caption={errors.date && errors.date.message}
            size="large"
          />
          <Input
            containerProps={{
              style: {
                width: '33%',
              },
            }}
            // onChangeText={val => setValue('CVV', val)}
            labelStyle={styles.inputLabelStyle}
            label={'CVV'}
            inputMode="numeric"
            shape="rounded"
            //   status={errors.CVV && 'danger'}
            //   caption={errors.CVV && errors.CVV.message}
            size="large"
          />
        </Box>
        <Input
          // onChangeText={val => setValue('postalCode', val)}
          labelStyle={styles.inputLabelStyle}
          label={'Billing Postal Code'}
          inputMode="numeric"
          textContentType="number"
          shape="rounded"
          //   status={errors.postalCode && 'danger'}
          //   caption={errors.postalCode && errors.postalCode.message}
          size="large"
        />
      </>
    );
  };

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
          title={`Add A ` + (route.params.type === 1 ? 'Bank Account' : 'Card')}
          divider
          style={{
            title: {
              fontWeight: '700',
            },
          }}
        />
        <Box
          as={TouchableWithoutFeedback}
          onPress={Keyboard.dismiss}
          mx={20}
          height="93%"
          marginTop={'8px'}
          style={{ justifyContent: 'space-between' }}>
          <Form onSubmit={() => navigation.goBack()}>
            <Box>
              {route?.params?.type === 1 ? bankAccountForm() : cardForm()}
            </Box>
          </Form>
          <Button
            textStyle={styles.saveButtonText}
            onPress={() => navigation.pop(2)}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPayment;
