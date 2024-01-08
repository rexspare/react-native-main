import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import Form from 'components/Form';
import { colors } from 'styles/theme';

const RegisterPasswordEmailForm = ({
  setValue,
  onSubmit,
  errors,
  error,
  isLoginStyle,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Text category="c1" status="danger">
          {error}
        </Text>
      ) : null}
      {isLoginStyle ? (
        <Input
          onChangeText={val => setValue('Email', val)}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          shape="rounded"
          status={errors.Email && 'danger'}
          caption={errors.Email && errors.Email.message}
          size="large"
        />
      ) : (
        <Input
          label={'Email Address'}
          onChangeText={val => setValue('Email', val)}
          status={errors.Email && 'danger'}
          caption={errors.Email && errors.Email.message}
          keyboardType="email-address"
          onIconPress={() => setShowOldPassword(!showOldPassword)}
          shape="rounded"
          size="large"
          labelStyle={{
            fontSize: 16,
            color: colors['gray scale/90'],
            marginBottom: 0,
            lineHeight: 24,
          }}
        />
      )}
    </Form>
  );
};

export default RegisterPasswordEmailForm;
