import React from 'react';
import format from 'date-fns/format';
import Text from 'components/Text';
import Box from 'components/Box';
import Input from 'components/Input';
import Icon from 'components/Icon';
import Button from 'components/Button';
import useTheme from 'hooks/useTheme';
import { styles } from '../styles';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import ProfileImageInput from 'components/ProfileImageInput';
import { usaDateFormat } from 'constants/dateFormat';
import BirthCalendar from 'components/Forms/Fields/BirthCalendar';
import ValidatedInput from 'components/ValidatedInput';
import InputLabel from 'components/InputLabel';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { numericValidator } from 'helpers/validators';
import { input_label_14, input_label_16 } from 'styles/reusable-classes';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const dobMin = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
const dobMax = new Date(new Date().setFullYear(new Date().getFullYear() - 15));
const tabListData = [
  { text: 'Driver licence', value: 'drivingLicense' },
  { text: 'Passport number', value: 'passport' },
  { text: 'SSN', value: 'ssn' },
];

const InfoTabFormFields = ({ watching, setValue, errors, submitting }) => {
  const theme = useTheme();
  return (
    <>
      <Box minHeight={108} flex={1} alignItems="center" justifyContent="center">
        <ProfileImageInput
          isAvatar={true}
          value={watching?.picture}
          onChange={val => setValue('picture', val)}
          disabled={submitting}
          cameraIcon={'camera-green'}
        />
      </Box>
      <Box py={3}>
        <Text
          style={{
            ...typography['body/large – Bold'],
            color: colors['gray scale/90'],
            textTransform: 'capitalize',
          }}>
          Fields without asterics are optional since a member will have a chance
          to fill up it later.
        </Text>
      </Box>
      <Input
        label="First Name"
        mb={15}
        defaultValue={watching.firstName}
        onChangeText={val => setValue('firstName', val)}
        isRequired
        size="large"
      />
      <Input
        label="Last Name"
        mb={15}
        defaultValue={watching.lastName}
        onChangeText={val => setValue('lastName', val)}
        isRequired
        size="large"
      />
      <Input
        label="Email"
        mb={15}
        defaultValue={watching?.emailPersonal}
        onChangeText={val => setValue('emailPersonal', val)}
        isRequired
        size="large"
      />
      <PhoneNumberInput
        label="Cell phone"
        mb={15}
        defaultValue={watching.phoneNumberCell}
        value={watching?.phoneNumberCell}
        onChangeText={val => {
          const phoneNum = formatPhoneNumber(val, true);
          setValue('phoneNumberCell', phoneNum);
        }}
        isRequired
        size="large"
      />
      <Input
        label="Home Address"
        mb={15}
        defaultValue={watching.homeAddress}
        onChangeText={val => setValue('homeAddress', val)}
        isRequired
        size="large"
      />
      <ValidatedInput
        label="ID"
        mb={1}
        keyboardType="numeric"
        defaultValue={watching.docNumber}
        onChangeText={val => setValue('docNumber', val)}
        validators={[numericValidator]}
        isUppercase={true}
        isRequired
        size="large"
      />
      <Box mb={35} mt={15}>
        <InputLabel
          labelStyle={{
            ...input_label_14,
            textTransform: 'none',
            marginBottom: 5,
          }}
          label={'Date Of Birth'}
          isRequired
        />
        <BirthCalendar
          onSelect={d => { setValue('dateOfBirth', d) }}
          Component={Button}
          value={watching?.dateOfBirth}
          triggerKey={'onPress'}
          date={dobMax}
          inputProps={{
            icon: Icon('calendar_black', 'pm'),
            appearance: 'ghost',
            children: watching?.dateOfBirth
              ? format(watching?.dateOfBirth, usaDateFormat)
              : 'Date of birth',
            textStyle: [
              !watching?.dateOfBirth
                ? { ...styles.dateFieldText }
                : {
                  color: colors['black'],
                  ...typography['body/medium – regular'],
                },
            ],
            style: styles.dateField(theme),
          }}
          size="large"
        />
      </Box>
    </>
  );
};

export default InfoTabFormFields;
