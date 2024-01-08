import React, { useCallback, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';
import resetMutation from 'queries/auth/createResetPasswordLink.gql';
import { useRegisterFields } from 'hooks/useRegisterFields';
import AuthProvider from 'providers/auth';
import LoginLayout from 'components/LoginLayout';
import SubmitButton from 'components/SubmitButton';
import ChangePasswordLayout from 'components/ChangePasswordLayout';
import RegisterPasswordEmailForm from 'components/Forms/RegisterPasswordEmailForm';
import { RESET_EMAIL_CHANGE_SCHEMA } from './schemas';
import { RESET_PASSWORD_EMAIL_COPY } from './microcopy/resetPasswordEmail';

const schema = RESET_EMAIL_CHANGE_SCHEMA;
const copy = RESET_PASSWORD_EMAIL_COPY;

const ResetPasswordEmail = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [resetResult, onReset] = useMutation(resetMutation);
  const { register, setValue, handleSubmit, errors, unregister } = useForm({
    validationSchema: schema,
  });
  const [isSended, setIsSended] = useState(false);
  const { token } = useContext(AuthProvider);

  useRegisterFields(['Email'], register, unregister);

  const onSubmit = useCallback(
    async ({ Email: email }) => {
      setError(null);
      const res = await onReset({ email });
      if (
        res.data &&
        res.data.createResetPasswordLink &&
        res.data.createResetPasswordLink.success
      ) {
        Toast.show({
          type: 'success1',
          text1: 'Check Your Inbox',
          text2: 'We have sent you a link to reset your password.',
          autoHide: true,
          position: 'top',
          props: {
            buttons: [{ children: 'OK', onPress: () => Toast.hide() }],
            styles: { text1: { textTransform: 'uppercase' } },
          },
        });
        setIsSended(true);
      } else {
        setError(
          (res.error.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    },
    [onReset],
  );

  const renderForm = React.useCallback(
    () => ({
      form: (
        <RegisterPasswordEmailForm
          onSubmit={handleSubmit(onSubmit)}
          error={error}
          errors={errors}
          setValue={setValue}
          isLoginStyle
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          loading={resetResult.fetching}
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
      errors.Email,
      handleSubmit,
      onSubmit,
      resetResult.fetching,
      setValue,
    ],
  );

  return (
    <>
      {!token ? (
        <LoginLayout
          renderForm={renderForm}
          isBeckButton={true}
          navigation={navigation}
          {...copy.layout}
        />
      ) : (
        <ChangePasswordLayout
          onNavigate={handleSubmit(onSubmit)}
          onPress={handleSubmit(onSubmit)}
          copy={copy}
          isLoading={resetResult.fetching}
          navigation={navigation}
          containerSize={0.5}
          isSubText={isSended}
          children={
            <RegisterPasswordEmailForm
              onSubmit={handleSubmit(onSubmit)}
              error={error}
              errors={errors}
              setValue={setValue}
            />
          }
        />
      )}
    </>
  );
};

export default ResetPasswordEmail;
