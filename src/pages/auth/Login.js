import React, { useCallback, useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';
import AuthProvider from 'providers/auth';
import SubmitButton from 'components/SubmitButton';
import LoginLayout from 'components/LoginLayout';
import loginMutation from 'queries/auth/login.gql';
import { LOGIN_SCHEMA } from './schemas';
import { useRegisterFields } from 'hooks/useRegisterFields';
import { compact } from 'lodash-es';
import { LOGIN_MICROCOPY } from './microcopy/login';
import LoginForm from 'components/Forms/LoginForm';
const schema = LOGIN_SCHEMA;
const copy = LOGIN_MICROCOPY;

const Login = ({ navigation }) => {
  const { setUser, setToken, setTFA } = useContext(AuthProvider);
  const [error, setError] = useState(null);
  const [loginResult, onLogin] = useMutation(loginMutation);
  const { register, setValue, handleSubmit, errors, unregister } = useForm({
    validationSchema: schema,
  });

  useEffect(() => {
    setTFA(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useRegisterFields(['Email', 'Password'], register, unregister);

  const onSubmit = useCallback(
    async ({ Email: email, Password: password }) => {
      setError(null);
      const res = await onLogin({ email, password });
      if (res.data && res.data.tokenAuth && res.data.tokenAuth.token) {
        setUser(res.data.tokenAuth.user);
        setToken(res.data.tokenAuth.token);
        if (res.data.tokenAuth.user?.tfaRequired ?? true) {
          navigation.navigate('TFAPhone');
        } else {
          setTFA(true);
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
    [navigation, onLogin, setToken, setUser],
  );

  const renderForm = React.useCallback(
    () => ({
      form: (
        <LoginForm
          error={error}
          onSubmit={handleSubmit(onSubmit)}
          setValue={setValue}
          errors={errors}
          textStyle={{ fontSize: '14px !important' }}
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          onPress={handleSubmit(onSubmit)}
          textStyle={{ fontSize: 16, fontWeight: '700' }}
          loading={!!loginResult.fetching}
          style={{ minHeight: 48, borderRadius: 12, marginTop: 20 }}>
          {' '}
          {copy.submitButton}
        </SubmitButton>
      ),
    }),
    [
      error,
      errors.Email,
      errors.Password,
      handleSubmit,
      loginResult.fetching,
      onSubmit,
      setValue,
    ],
  );

  const actions = compact([
    {
      onClick: () => navigation.navigate('Register'),
      button: 'SIGN UP',
      ...copy.actions.signUp,
    },
    {
      onClick: () => navigation.navigate('ResetPassword'),
      button: 'RESET',
      ...copy.actions.resetPassword,
    },
  ]);

  return <LoginLayout renderForm={renderForm} actions={actions} />;
};

export default Login;
