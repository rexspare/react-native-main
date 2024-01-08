import React, { useState } from 'react';
import { Input, Text, Icon } from '@ui-kitten/components';
import { change_password_microcopy } from 'pages/auth/microcopy/changePassword';
import Form from 'components/Form';
import { colors } from 'styles/theme';
import styled from 'styled-components';

const CostumeInput = styled(Input)`
  background-color: #f0f2f2;
`;

const inputProps = {
  textContentType: 'password',
  autoCompleteType: 'password',
  shape: 'rounded',
  size: 'large',
  labelStyle: {
    fontSize: 16,
    color: colors['gray scale/90'],
    marginBottom: 0,
    lineHeight: 24,
  },
};

const ChangePasswordForm = ({ onSubmit, errors, error, setValue }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const copy = change_password_microcopy;

  return (
    <Form onSubmit={onSubmit}>
      {error && (
        <Text category="c1" status="danger">
          {error}
        </Text>
      )}
      <CostumeInput
        label={copy.inputs.currentPassword.placeholder}
        onChangeText={val => setValue('currentPassword', val)}
        status={errors.currentPassword && 'danger'}
        caption={errors.currentPassword && errors.currentPassword.message}
        icon={style => (
          <Icon
            name={!showOldPassword ? 'eye-slash' : 'eye'}
            pack="pm"
            {...style}
          />
        )}
        secureTextEntry={!showOldPassword}
        onIconPress={() => setShowOldPassword(!showOldPassword)}
        {...inputProps}
      />
      <CostumeInput
        label={copy.inputs.newPassword.placeholder}
        onChangeText={val => setValue('newPassword', val)}
        status={errors.newPassword && 'danger'}
        caption={errors.newPassword && errors.newPassword.message}
        {...inputProps}
        icon={style => (
          <Icon
            name={!showNewPassword ? 'eye-slash' : 'eye'}
            pack="pm"
            {...style}
          />
        )}
        secureTextEntry={!showNewPassword}
        onIconPress={() => setShowNewPassword(!showNewPassword)}
      />
      <CostumeInput
        label={copy.inputs.confirmPassword.placeholder}
        onChangeText={val => setValue('confirm', val)}
        status={errors.confirm && 'danger'}
        caption={errors.confirm && errors.confirm.message}
        {...inputProps}
        icon={style => (
          <Icon
            name={!showConfirmPassword ? 'eye-slash' : 'eye'}
            pack="pm"
            {...style}
          />
        )}
        secureTextEntry={!showConfirmPassword}
        onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </Form>
  );
};

export default ChangePasswordForm;
