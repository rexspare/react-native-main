import React, { useMemo, useState, useEffect } from 'react';
import { Linking } from 'react-native';
import Box from 'components/Box';
import Form from 'components/Form';
import { Text, Input } from '@ui-kitten/components';
import styled from 'styled-components/native';
import MultiTextSwitch from 'components/MultiTextSwitch';
import { stringifyEnumValue, USER_TYPES } from 'constants/enums';
import PhoneNumberInput from './Fields/PhoneNumberInput';
import CheckboxField from './Fields/CheckboxField';
import { IS_SMALLER } from 'styles/responsive';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { Icon } from '@ui-kitten/components';

const getUserTypes = () => {
  let userTypes = { ...USER_TYPES };
  delete userTypes['STAFF'];
  delete userTypes['TENANT'];
  delete userTypes['MANAGEMENT'];
  userTypes['MANAGER'] = 3;
  return userTypes;
};

const ToSURL = 'https://tigra.app/termsOfService'
const PrivacyURL = 'https://tigra.app/privacyPolicy'

const OpacityInput = styled(Input)`
  opacity: 1;
  flex: ${({ row }) => (row ? 1 : 0)};
`;

const Space = styled.View`
  margin-horizontal: 5;
`;

const Row = styled.View`
  flex-direction: row;
`;
const OpacityPhoneInput = styled(PhoneNumberInput)`
  opacity: 1;
  flex: ${({ row }) => (row ? 1 : 0)};
`;

const style = {
  switch: IS_SMALLER
    ? {
      marginTop: 1,
      marginBottom: 10,
      height: 48,
      switchBackground: {
        height: 48,
      },
    }
    : {
      marginTop: 10,
      marginBottom: 20,
      height: 48,
      switchBackground: {
        height: 48,
      },
    },
  text: {
    fontSize: '14px',
  },
};

const RegistrationForm = ({ onSubmit, error, setValue, errors, handleAcceptToS, acceptToS, toSError }) => {
  const [userType, setUserType] = useState(null);
  const userTypes = useMemo(() => getUserTypes(), []);
  const [calError, setCalError] = useState({})

  useEffect(() => {
    if (error)
      setCalError(JSON.parse(error.replace(/'/g, "\"")))
  }, [error])

  const handleSwitch = option => {
    setValue('userType', option.value);
    setUserType(option.value);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <MultiTextSwitch
          shape="circle"
          size="small"
          options={Object.values(userTypes).map(value => ({
            text: stringifyEnumValue(userTypes, value),
            value,
          }))}
          style={style.switch}
          textStyle={style.text}
          onSelect={option => handleSwitch(option)}
        />
        <Row>
          <OpacityInput
            row
            onChangeText={val => setValue('firstName', val)}
            placeholder="First Name"
            textContentType="name"
            autoCompleteType="name"
            returnKeyType="next"
            shape="rounded"
            status={errors['firstName'] && 'danger'}
            caption={errors['firstName'] && errors['firstName'].message}
            size={!IS_SMALLER && 'large'}
          />
          <Space />
          <OpacityInput
            row
            onChangeText={val => setValue('lastName', val)}
            placeholder="Last Name"
            textContentType="nameSuffix"
            autoCompleteType="name"
            shape="rounded"
            status={errors['lastName'] && 'danger'}
            caption={errors['lastName'] && errors['lastName'].message}
            size={!IS_SMALLER && 'large'}
          />
        </Row>
        <OpacityInput
          onChangeText={val => setValue('email', val)}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          shape="rounded"
          status={(errors.email || calError?.email) && 'danger'}
          caption={(errors.email && errors.email.message) || (calError?.email?.[0])}
          size={!IS_SMALLER && 'large'}
        />
        <OpacityPhoneInput
          onChangeText={val => setValue('phone', val)}
          placeholder="Phone"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          shape="rounded"
          status={(errors['phone'] || calError?.phone) && 'danger'}
          caption={(errors['phone'] && errors['phone'].message) || calError?.phone?.[0]}
          size={!IS_SMALLER && 'large'}
        />
        {userType && userType === USER_TYPES.MANAGEMENT && (
          <OpacityInput
            row
            onChangeText={val => setValue('companyName', val)}
            placeholder="Company Name"
            textContentType="name"
            autoCompleteType="name"
            returnKeyType="next"
            shape="rounded"
            status={errors['companyName'] && 'danger'}
            caption={errors['companyName'] && errors['companyName'].message}
            size={!IS_SMALLER && 'large'}
          />
        )}
      </Form>
      <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckboxField
          onPress={handleAcceptToS}
          isSelected={acceptToS}
          style={{ backgroundColor: 'white', borderColor: colors['primary/50 – brand'] }}
        />
        <Text style={[typography['body/small – regular'], { marginLeft: '2.5%', color: colors['primary/80'] }]}>
          I agree to the <Text onPress={() => Linking.openURL(ToSURL)} style={[typography['body/small – regular'], { color: colors['additional/success'] }]}>terms</Text> and <Text onPress={() => Linking.openURL(PrivacyURL)} style={[typography['body/small – regular'], { color: colors['additional/success'] }]}>privacy policy</Text>.
        </Text>
      </Box>
      {toSError &&
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="error" pack="pm" height={14} width={14} />
          <Text style={[typography['buttons/small'], { marginLeft: '2.5%', color: colors['additional/danger'] }]}>
            Please accept our terms and policy
          </Text>
        </Box>
      }
    </>
  );
};

export default RegistrationForm;
