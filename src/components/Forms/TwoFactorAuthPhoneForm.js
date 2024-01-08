import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import Form from 'components/Form';

const TwoFactorAuthPhoneForm = ({ onSubmit, error, errors, setValue }) => {
  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Text category="c1" status="danger">
          {error}
        </Text>
      ) : null}
      <Input
        onChangeText={val => setValue('Phone Number', val)}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoCompleteType="tel"
        autoFocus
        shape="rounded"
        status={errors['Phone Number'] && 'danger'}
        caption={errors['Phone Number'] && errors['Phone Number'].message}
        size="large"
      />
    </Form>
  );
};

export default TwoFactorAuthPhoneForm;
