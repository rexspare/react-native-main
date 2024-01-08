import React, { useCallback, useContext, useState, useMemo } from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'urql';

import AuthProvider from 'providers/auth';
import SubmitButton from 'components/SubmitButton';
import LoginLayout from 'components/LoginLayout';
import RegistrationForm from 'components/Forms/RegistrationForm';
import registerUserMutation from 'queries/auth/registerUser.gql';
import { REGISTRATION_SCHEMA } from './schemas';
import { useRegisterFields } from 'hooks/useRegisterFields';
import { useIsOpen } from 'hooks/useIsOpen';
import Dialog from 'components/Dialog';
import { chain } from 'helpers/func';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const schema = REGISTRATION_SCHEMA;
const copy = {
  login: 'ALREADY HAVE AN ACCOUNT?',
  title: 'SIGN UP',
  successModal: {
    title: 'Application Submitted',
    content: 'Thank you for registering with our app. We will carefully review the information you provided and get back to you soon with our response. Please check your email (including spam) for further instructions.',
  },
};

const Register = ({ navigation }) => {
  const { setUser, setToken, setTFA } = useContext(AuthProvider);
  const [error, setError] = useState(null);
  const [registerResult, onRegister] = useMutation(registerUserMutation);
  const { isOpen, open, close } = useIsOpen();
  const [acceptToS, setAcceptToS] = useState(false);
  const [toSError, setToSError] = useState(false);

  const handleAcceptToS = () => {
    setAcceptToS(!acceptToS);
  };

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    ...rest
  } = useForm({
    validationSchema: schema,
    defaultValues: { userType: 2 },
  });

  useRegisterFields(
    ['firstName', 'lastName', 'email', 'userType', 'phone', 'companyName'],
    register,
    unregister,
  );

  const onSubmit = useCallback(
    async ({ ...form }) => {
      handleSubmit
      const data = {
        ...form,
        phone: `+1${form?.phone}`,
      };

      setError(null);

      const res = acceptToS && await onRegister({ data }, { requestPolicy: 'network-only' });

      if (res?.data?.registerUser?.success) {
        open();
      } else {
        setError(
          (res?.error?.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    },
    [onRegister, setTFA, setToken, setUser, onSubmit, acceptToS],
  );

  const renderForm = useCallback(
    () => ({
      form: (
        <RegistrationForm
          onSubmit={handleSubmit(onSubmit)}
          setValue={setValue}
          error={error}
          errors={errors}
          toSError={toSError}
          handleAcceptToS={handleAcceptToS}
          acceptToS={acceptToS}
        />
      ),
      button: (
        <SubmitButton
          shape="circle"
          loading={registerResult.fetching}
          onPress={() => chain([handleSubmit(onSubmit)(), acceptToS ? setToSError(false) : setToSError(true)])}
          style={{ minHeight: 48, borderRadius: 12, marginTop: 20 }}
          textStyle={{ fontSize: 16, fontWeight: '700' }}>
          {copy.title}
        </SubmitButton>
      ),
    }),
    [error, errors, handleSubmit, onSubmit, registerResult.fetching, setValue, toSError, acceptToS],
  );

  const actions = useMemo(
    () => [
      {
        onClick: () => navigation.goBack(),
        button: 'LOGIN',
        text: copy.login,
      },
    ],
    [navigation],
  );

  return (
    <>
      <LoginLayout renderForm={renderForm} actions={actions} />
      <Dialog
        {...copy.successModal}
        visible={isOpen}
        closeIcon="close"
        onHide={() => {
          close();
          navigation.navigate('Login');
        }}
        styles={styles.dialog}
      />
    </>
  );
};

const styles = {
  dialog: {
    title: { marginTop: 3 },
    contentText: {
      ...typography['body/small – medium'],
      color: colors['gray scale/40'],
      width: '72%',
      textAlign: 'center',
      margin: 'auto',
      zIndex: 2,
    },
  },
};

export default Register;