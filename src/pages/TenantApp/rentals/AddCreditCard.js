import { Text } from '@ui-kitten/components';
import Box from 'components/Box';
import React from 'react';
import { useMutation } from 'urql';
import Button from 'components/Button';
import Input from 'components/Input';
import * as yup from 'yup';
import useForm from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import Form from 'components/Form';
import completeCreditCardPaymentMutation from 'queries/rentals/completeCreditCardPayment.gql';
import { useSetShouldRefresh } from 'hooks/useShouldRefresh';
import { TENANT_PAYMENTS } from 'constants/refreshConsts';
import DismissKeyboardContainer from 'components/DismissKeyboard';
import HeadedScreen from 'components/HeadedScreen';
import Row from 'components/Row';
import { input_label_14 } from 'styles/reusable-classes';

const transformNumber = (value, originalValue) =>
  originalValue !== null && originalValue !== undefined
    ? `${originalValue}`.replace(/[^0-9.]+/g, '')
    : null;

const schema = yup.object().shape({
  number: yup
    .string()
    .max(19)
    .label('Credit Card Number')
    .transform(transformNumber),
  exp: yup
    .string()
    .max(5)
    .label('Expiration Date')
    .transform(transformNumber),
  cvc: yup
    .number()
    .max(9999)
    .label('CVC'),
});

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

export default function AddCreditCard({ navigation, route }) {
  const paymentId = route?.params?.paymentId;
  const submitUrl = route?.params?.submitUrl;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    watch,
    formState: { isSubmitting },
  } = useForm({
    validationSchema: schema,
  });

  const [_, completeCreditCardPayment] = useMutation(
    completeCreditCardPaymentMutation,
  );

  const watching = watch(['number', 'exp', 'cvc']);

  React.useEffect(() => {
    Object.keys(schema.fields).forEach(name => register({ name }));
    return () => {
      Object.keys(schema.fields).forEach(name => unregister({ name }));
    };
  }, [register, unregister]);

  const setRefreshPaymentsFeed = useSetShouldRefresh(TENANT_PAYMENTS)

  const onSubmit = React.useCallback(
    form => {
      const submit = async () => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('billing-cc-number', form.number);
        formData.append('billing-cc-exp', transformExp(form.exp));
        formData.append('cvv', form.cvc);
        const res = await fetch(submitUrl, {
          body: formData,
          method: 'post',
          redirect: 'follow',
        });
        const exec = /token-id=([^/=&]+)/.exec(res.url);
        if (exec && exec.length >= 2) {
          const tokenId = exec[1];
          const payRes = await completeCreditCardPayment({
            input: {
              id: paymentId,
              token: tokenId,
            },
          });
          if (payRes.data?.completeCreditCardPayment?.payment?.id) {
            setRefreshPaymentsFeed()
            navigation.navigate('Tenant');
          } else {
            setError(
              (payRes?.error?.message ?? 'Failed to process payment').replace(
                '[GraphQL] ',
                '',
              ),
            );
          }
        }
        setLoading(false);
      };
      submit();
    },
    [completeCreditCardPayment, navigation, paymentId, submitUrl],
  );
  return (
    <HeadedScreen
      actions={[
        {
          icon: 'arrow-ios-back',
          left: true,
          onPress: () => navigation.goBack(),
        },
      ]}
      title="Add Credit Card"
      divider
    >
      <DismissKeyboardContainer>
        <Box flex={1} behavior="padding">
          <Box as={KeyboardAvoidingView} flex={1} px="4" py="3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Text status="danger" style={{ fontSize: 14 }}>
                {error}
              </Text>
              <Box mb="2" />
              <Input
                label="Card number"
                size="large"
                keyboardType="number-pad"
                status={errors.number && 'danger'}
                caption={errors.number && errors.number.message}
                onChangeText={val =>
                  `${val}`.length <= 19 && setValue('number', val)
                }
                value={transformCreditCard(watching.number)}
              />
              <Row minHeight={90}>
                <Input
                  label="Expiration date"
                  containerProps={{ width: "67%", mr: 1, minHeight: 90 }}
                  keyboardType="number-pad"
                  placeholder="MM/YY"
                  status={errors.exp && 'danger'}
                  caption={errors.exp && errors.exp.message}
                  onChangeText={val =>
                    `${val}`.length <= 5 && setValue('exp', val)
                  }
                  value={transformExp(watching.exp)}
                />
                <Input
                  label="CVV"
                  size="large"
                  labelStyle={[input_label_14, { textTransform: "none" }]}
                  containerProps={{ width: "30%", minHeight: 90 }}
                  keyboardType="number-pad"
                  status={errors.cvc && 'danger'}
                  caption={errors.cvc && errors.cvc.message}
                  onChangeText={val =>
                    `${val}`.length <= 4 && setValue('cvc', val)
                  }
                  value={watching.cvc}
                />
              </Row>

            </Form>
          </Box>
          <Box px="3" py="4" mx="4">
            <Button
              loading={loading}
              size="large"
              onPress={handleSubmit(onSubmit)}>
              Pay With Credit Card
            </Button>
          </Box>
        </Box>
      </DismissKeyboardContainer>
    </HeadedScreen>
  )
}
