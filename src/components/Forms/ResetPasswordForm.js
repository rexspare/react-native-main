import React, { useState } from 'react';
import { Icon, Input, Text } from '@ui-kitten/components';
import Form from 'components/Form';
import { colors } from 'styles/theme';

const ResetPasswordForm = ({
  onSubmit,
  errors,
  error,
  setValue,
  isLoginStyle,
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Text category="c1" status="danger">
          {error}
        </Text>
      ) : null}
      {isLoginStyle ? (
        <>
          <Input
            onChangeText={val => setValue('Password', val)}
            placeholder="New Password"
            textContentType="password"
            secureTextEntry
            autoCompleteType="password"
            shape="rounded"
            status={errors.Password && 'danger'}
            caption={errors.Password && errors.Password.message}
            autoFocus
            size="large"
          />
          <Input
            onChangeText={val => setValue('Confirm', val)}
            placeholder="Confirm New Password"
            textContentType="password"
            secureTextEntry
            autoCompleteType="password"
            shape="rounded"
            status={errors.Confirm && 'danger'}
            caption={errors.Confirm && errors.Confirm.message}
            size="large"
          />
        </>
      ) : (
        <>
          <Input
            onChangeText={val => setValue('Password', val)}
            label="New Password"
            textContentType="password"
            secureTextEntry={!showOldPassword}
            onIconPress={() => setShowOldPassword(!showOldPassword)}
            autoCompleteType="password"
            shape="rounded"
            status={errors.Password && 'danger'}
            caption={errors.Password && errors.Password.message}
            autoFocus
            size="large"
            icon={style => (
              <Icon
                name={!showOldPassword ? 'eye-slash' : 'eye'}
                pack="pm"
                {...style}
              />
            )}
            labelStyle={{
              fontSize: 16,
              color: colors['gray scale/90'],
              marginBottom: 0,
              lineHeight: 24,
            }}
          />
          <Input
            onChangeText={val => setValue('Confirm', val)}
            label="Confirm New Password"
            textContentType="password"
            secureTextEntry={!showNewPassword}
            onIconPress={() => setShowNewPassword(!showNewPassword)}
            autoCompleteType="password"
            shape="rounded"
            status={errors.Confirm && 'danger'}
            caption={errors.Confirm && errors.Confirm.message}
            size="large"
            icon={style => (
              <Icon
                name={!showNewPassword ? 'eye-slash' : 'eye'}
                pack="pm"
                {...style}
              />
            )}
            labelStyle={{
              marginTop: 10,
              fontSize: 16,
              color: colors['gray scale/90'],
              marginBottom: 0,
              lineHeight: 24,
            }}
          />
        </>
      )}
    </Form>
  );
};

export default ResetPasswordForm;
