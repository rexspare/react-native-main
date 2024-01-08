import React, { useCallback, useState } from 'react';
import useForm from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useMutation } from 'urql';
import { useLoader } from 'hooks/useLoader';
import { useRegisterFields } from 'hooks/useRegisterFields';
import changePasswordMutation from 'queries/auth/changePassword.gql';
import ChangePasswordForm from 'components/Forms/ChangePasswordForm';
import ChangePasswordLayout from 'components/ChangePasswordLayout';
import { CHANGE_PASSWORD_SCHEMA } from './schemas';
import { change_password_microcopy } from './microcopy/changePassword';

const schema = CHANGE_PASSWORD_SCHEMA;
const mutationOptions = { requestPolicy: 'network-only' };

const copy = change_password_microcopy;
const ChangePassword = ({ navigation }) => {
  const { register, setValue, handleSubmit, errors, unregister } = useForm({
    validationSchema: schema,
  });
  const [error, setError] = useState(null);
  const [changeRes, executeChange] = useMutation(changePasswordMutation);
  const { isLoading, startLoading, stopLoading } = useLoader();

  useRegisterFields(
    ['currentPassword', 'newPassword', 'confirm'],
    register,
    unregister,
  );

  const onSubmit = useCallback(
    async ({ currentPassword, newPassword }) => {
      startLoading();
      setError(null);
      const res = await executeChange(
        { currentPassword, newPassword },
        mutationOptions,
      );
      if (res.data?.changePassword?.success) {
        navigation?.goBack();
        Toast.show({
          type: 'success',
          text1: copy.dialog.title,
          text2: copy.dialog.content,
        });
      } else {
        setError(
          (res.error.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
      stopLoading();
    },
    [executeChange],
  );

  return (
    <ChangePasswordLayout
      onNavigate={() => navigation.navigate('ResetPassword')}
      onPress={handleSubmit(onSubmit)}
      copy={copy}
      isLoading={isLoading}
      navigation={navigation}
      containerSize={0.6}
      children={
        <ChangePasswordForm
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          error={error}
          setValue={setValue}
        />
      }
    />
  );
};

export default ChangePassword;
