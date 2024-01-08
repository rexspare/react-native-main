import React, { useState } from 'react';
import Config from 'react-native-config';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';

import generateCodeMutation from 'queries/auth/generateTFACode.gql';
import LoginLayout from 'components/LoginLayout';
import SubmitButton from 'components/SubmitButton';
import { TWO_FACTOR_PHONE_SCHEMA } from './schemas';
import { useRegisterFields } from 'hooks/useRegisterFields';
import TwoFactorAuthPhoneForm from 'components/Forms/TwoFactorAuthPhoneForm';

const schema = TWO_FACTOR_PHONE_SCHEMA;

const copy = {
  layout: {
    title: 'Please Enter Your Phone Number',
    subtitle:
      '2-Factor Authentification enables us to ensure that your account is secure',
  },
  submitBtn: 'Submit',
};

const TwoFactorAuthPhone = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [generateResult, generateCode] = useMutation(generateCodeMutation);
  const { register, setValue, handleSubmit, errors, unregister } = useForm({
    validationSchema: schema,
  });
  useRegisterFields(['Phone Number'], register, unregister);

  const onSubmit = React.useCallback(
    async data => {
      if (Config.VALIDATE_TFA !== 'true') {
        // ignore tfa for development -blindly continue
        return navigation.navigate('TFACode', { setError });
      }
      setError(null);
      const res = await generateCode({
        phone: data['Phone Number'],
      });
      if (res.data && res.data.createTfaCode) {
        if (res.data.createTfaCode.success) {
          navigation.navigate('TFACode', { setError });
        } else {
          setError('Failed to send verification code');
        }
      } else {
        setError(
          (res.error.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    },
    [generateCode, navigation],
  );

  const renderForm = React.useCallback(
    () => ({
      form: (
        <TwoFactorAuthPhoneForm
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          error={error}
          setValue={setValue}
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          loading={generateResult.fetching}
          onPress={handleSubmit(onSubmit)}
          style={{ minHeight: 48, borderRadius: 12, marginTop: 20 }}
          textStyle={{
            fontSize: 16,
            fontWeight: '700',
            textTransform: 'uppercase',
          }}>
          {copy.submitBtn}
        </SubmitButton>
      ),
    }),
    [error, errors, generateResult.fetching, handleSubmit, onSubmit, setValue],
  );

  return <LoginLayout renderForm={renderForm} {...copy.layout} />;
};

export default TwoFactorAuthPhone;
