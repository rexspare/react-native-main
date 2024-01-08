import React from 'react';
import Config from 'react-native-config';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';

import verifyCodeMutation from 'queries/auth/verifyTFACode.gql';
import LoginLayout from 'components/LoginLayout';
import SubmitButton from 'components/SubmitButton';
import AuthProvider from 'providers/auth';
import { TWO_FACTOR_CODE_SCHEMA } from './schemas';
import { useRegisterFields } from 'hooks/useRegisterFields';
import TwoFactorAuthCodeForm from 'components/Forms/TwoFactorAuthCodeForm';

const schema = TWO_FACTOR_CODE_SCHEMA;
const copy = {
  layout: {
    title: 'Please Enter Your Verification Code',
    subtitle:
      '2-Factor Authentification enables us to ensure that your account is secure',
  },
  submitBtn: 'Submit',
};

const TwoFactorAuthCode = ({ navigation }) => {
  const { setTFA } = React.useContext(AuthProvider);
  const [error, setError] = React.useState(null);
  const [verifyResult, verifyCode] = useMutation(verifyCodeMutation);
  const form = useForm({
    validationSchema: schema,
  });
  const { register, setValue, handleSubmit, errors, unregister } = form;

  useRegisterFields(['Code'], register, unregister);

  const onSubmit = React.useCallback(
    async ({ Code: code }) => {
      setError(null);
      if (Config.VALIDATE_TFA !== 'true') {
        return setTFA(true);
      }
      const res = await verifyCode({ code: data.Code });
      if (res.data) {
        if (res.data.verifyTfaCode.verified) {
          setTFA(true);
        } else {
          setError("Code doesn't match or expired");
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
    [setTFA, verifyCode],
  );

  const renderForm = React.useCallback(
    () => ({
      form: (
        <TwoFactorAuthCodeForm
          onSubmit={handleSubmit(onSubmit)}
          error={error}
          errors={errors}
          setValue={setValue}
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          loading={verifyResult.fetching}
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
    [
      error,
      errors.Code,
      handleSubmit,
      onSubmit,
      setValue,
      verifyResult.fetching,
    ],
  );

  return <LoginLayout renderForm={renderForm} {...copy.layout} />;
};

export default TwoFactorAuthCode;
