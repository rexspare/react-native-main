import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { useMutation, useQuery } from 'urql';
import requestPaymentApprovalMutation from 'queries/rentals/requestPaymentApproval.gql';
import initCreditCardPaymentMutation from 'queries/rentals/initCreditCardPayment.gql';
import viewPaymentQuery from 'queries/rentals/viewPayment.gql';
import {
  PAYMENT,
  paymentMethods,
  PAYMENT_METHODS,
} from 'pages/profile/Settings/Pages/PaymentsMethod/PaymentComponent';
import Box from 'components/Box';
import Button from 'components/Button';
import FullPageBottomModal from 'components/FullPageBottomModal';
import TabListButton from 'components/TabListSelect/TabListButton';
import SwitchField from 'components/Forms/Fields/SwitchField';
import { input_label_16 } from 'styles/reusable-classes';
import { typography } from 'styles/typography';

export default function MakePayment({
  navigation,
  paymentId,
  visible,
  onHide,
}) {
  const [method, setMethod] = React.useState();
  const [payment, setPayment] = useState();
  const [activeMethod, setActiveMethod] = useState();
  const [savePayment, setSavePayment] = useState(false);

  const [res, executeQuery] = useQuery({
    query: viewPaymentQuery,
    variables: {
      id: paymentId,
      pause: !!payment,
    },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (res?.data?.payment) {
      setPayment(res?.data?.payment);
    }
  }, [res]);

  const [requestPaymentApprovalRes, requestPaymentApproval] = useMutation(
    requestPaymentApprovalMutation,
  );
  const [initCreditCardPaymentRes, initCreditCardPayment] = useMutation(
    initCreditCardPaymentMutation,
  );
  const [cashModalId, setCashModalId] = React.useState(null);

  const onRequestPaymentApproval = React.useCallback(
    id => {
      const approve = async () => {
        const res = await requestPaymentApproval({ input: { id } });
        if (!res.data?.requestPaymentApproval.success) {
          console.log(res.error);
        }
        setCashModalId(null);
        navigation.goBack();
      };
      approve();
    },
    [navigation, requestPaymentApproval],
  );

  const onPay = React.useCallback(() => {
    if (method === 'cash') {
      setCashModalId(paymentId);
    } else {
      const init = async () => {
        const res = await initCreditCardPayment({ input: { id: paymentId } });
        if (res.data?.initCreditCardPayment?.success) {
          navigation.navigate('AddCreditCard', {
            paymentId,
            submitUrl: res.data.initCreditCardPayment.submitUrl,
          });
        }
      };
      init();
    }
  }, [initCreditCardPayment, method, navigation, paymentId]);

  return (
    <FullPageBottomModal
      visible={visible}
      onHide={onHide}
      title={'Make A Payment'}
      displayDone={false}>
      <Box>
        <Box
          px="4"
          py="40"
          mt={3}
          justifyContent={'center'}
          alignItems="center">
          <Text style={typography['headline/H2']}>
            {payment?.amount &&
              '$' +
                payment?.amount?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </Text>
        </Box>
        <Box mb={13} as={ScrollView} maxHeight={'60%'} width="100%">
          {PAYMENT?.map((e, index) => {
            return (
              <TabListButton
                key={index}
                isChecked={index === activeMethod}
                onButtonPress={() => setActiveMethod(index)}
                text={
                  paymentMethods[e.type] +
                  ' ' +
                  (e.type === PAYMENT_METHODS.VISA ||
                  e.type === PAYMENT_METHODS.MASTER
                    ? e.code
                    : '')
                }
                isRadio
                icon={
                  <Icon
                    name={e.type}
                    pack="pm"
                    height={24}
                    width={24}
                    style={{ marginRight: 12 }}
                  />
                }
              />
            );
          })}
        </Box>
        <SwitchField
          label={'Save for future use'}
          checked={savePayment}
          styles={{
            switchContainer: { marginVertical: 13, marginHorizontal: 20 },
          }}
          onChange={val => setSavePayment(val)}
          labelStyle={{ ...input_label_16 }}
          containerStyle={{ height: 26, width: 40 }}
          circleSize={22}
          circleRadius={20}
        />
        <Button
          appearance="outline"
          style={{ backgroundColor: 'transparent', borderRadius: 12 }}
          size={'large'}
          textStyle={{
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'uppercase',
          }}
          onPress={() => navigation.navigate('AddNewPayment')}>
          Add Payment Method
        </Button>
        <Button
          style={{ marginTop: 40, borderRadius: 12 }}
          size={'large'}
          textStyle={{
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'uppercase',
          }}
          onPress={onPay}>
          Submit Payment
        </Button>
      </Box>
    </FullPageBottomModal>
  );
}
