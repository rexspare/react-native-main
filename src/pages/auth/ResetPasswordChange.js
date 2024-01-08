import React, { useCallback, useContext, useState } from 'react';
import useForm from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useMutation } from 'urql';
import AuthProvider from 'providers/auth';
import { useRegisterFields } from 'hooks/useRegisterFields';
import changePasswordMutation from 'queries/auth/resetPassword.gql';
import SubmitButton from 'components/SubmitButton';
import LoginLayout from 'components/LoginLayout';
import ResetPasswordForm from 'components/Forms/ResetPasswordForm';
import ChangePasswordLayout from 'components/ChangePasswordLayout';
import { RESET_PASSWORD_COPY } from './microcopy/resetPasswordChange';
import { RESET_PASSWORD_CHANGE_SCHEMA } from './schemas';

const schema = RESET_PASSWORD_CHANGE_SCHEMA;
const copy = RESET_PASSWORD_COPY;

const ResetPasswordChange = ({ navigation, route }) => {
  const [error, setError] = useState(null);
  const [changeResult, onChange] = useMutation(changePasswordMutation);
  const { register, setValue, handleSubmit, errors, unregister } = useForm({
    validationSchema: schema,
  });
  const { token } = useContext(AuthProvider);

  useRegisterFields(['Password', 'Confirm'], register, unregister);

  const onSubmit = useCallback(
    async ({ Password: password }) => {
      setError(null);
      const code = route.params?.code;
      const res = await onChange({ password, code });
      if (
        res.data &&
        res.data.resetPassword &&
        res.data.resetPassword.success
      ) {
        navigation.pop(2);
        Toast.show({
          type: 'success1',
          text1: copy.dialog?.title,
          text2: copy.dialog.content,
          autoHide: true,
          position: 'top',
          props: {
            buttons: [{ children: 'OK', onPress: () => Toast.hide() }],
            styles: { text1: { textTransform: 'uppercase' } },
          },
        });
      } else {
        setError(
          (res.error.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    },
    [onChange, route.params],
  );

  const renderForm = React.useCallback(
    () => ({
      form: (
        <ResetPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          error={error}
          setValue={setValue}
          isLoginStyle
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          loading={changeResult.fetching}
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
      changeResult.fetching,
      error,
      errors.Confirm,
      errors.Password,
      handleSubmit,
      onSubmit,
      setValue,
    ],
  );

  return (
    <>
      {!token ? (
        <LoginLayout title={copy?.title} renderForm={renderForm} />
      ) : (
        <ChangePasswordLayout
          onNavigate={handleSubmit(onSubmit)}
          onPress={handleSubmit(onSubmit)}
          copy={copy}
          navigation={navigation}
          containerSize={0.5}
          children={
            <ResetPasswordForm
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

export default ResetPasswordChange;
