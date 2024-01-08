import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import Form from 'components/Form';

const TwoFactorAuthCodeForm = ({ onSubmit, error, errors, setValue }) => {
  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Text category="c1" status="danger">
          {error}
        </Text>
      ) : null}
      <Input
        onChangeText={val => setValue('Code', val)}
        placeholder="Verification Code"
        keyboardType="number-pad"
        autoCompleteType="off"
        shape="rounded"
        status={errors.Code && 'danger'}
        caption={errors.Code && errors.Code.message}
        size="large"
      />
    </Form>
  );
};

export default TwoFactorAuthCodeForm;
