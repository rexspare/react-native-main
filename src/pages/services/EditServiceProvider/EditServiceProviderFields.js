import React from 'react';
import Box from 'components/Box';
import Input from 'components/Input';
import SelectInput from 'components/SelectInput';
import ProfileImageInput from 'components/ProfileImageInput';
import ServiceField from 'components/Forms/Fields/ServiceField';
import WorkHoursField from 'components/Forms/Fields/DateTimeRange/WorkHoursField';
import Text from 'components/Text';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import { formatHours } from 'utils/formatWorkHours';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import states from 'constants/states';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const statesFormatted = states.map(s => ({
  key: s.abbreviation,
  title: `${s.abbreviation} - ${s.name}`,
}));

const EditServiceProviderFields = ({
  initialValues,
  errors,
  watching,
  setValue,
  navigation,
  submitting,
}) => {
  const categoryComponent = (services, props) => {
    return (
      <>
        {services?.map((service, index) => (
          <Box
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              backgroundColor: colors['primary/50 – brand'],
              borderRadius: 12,
            }}>
            <Text
              style={{
                ...typography['body/small – normal'],
                color: colors['gray scale/0'],
                textTransform: 'uppercase',
              }}>
              {service?.name}
            </Text>
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      <Box mt={1} mb={24} alignItems="center" justifyContent="center">
        <ProfileImageInput
          value={watching?.picture}
          onChange={val => setValue('picture', val)}
          disabled={submitting}
          name={`${watching?.firstName} ${watching?.lastName}`}
        />
      </Box>
      <ServiceField
        limit={1}
        value={watching?.category}
        setValue={category => setValue('category', category)}
        label={'Category'}
        changeBtnText="SELECT"
        labelStyle={{
          ...typography['body/medium – medium'],
          textTransform: 'uppercase',
          color: colors['gray scale/40'],
        }}
        renderValue={categoryComponent}
      />
      <Input
        containerProps={{ mt: 15 }}
        label="Occupation"
        value={watching?.occupation}
        defaultValue={initialValues?.occupation}
        status={errors.occupation && 'danger'}
        caption={errors.occupation && errors.occupation.message}
        onChangeText={val => setValue('occupation', val)}
        placeholder="Add occupation"
        size="large"
        placeholderTextColor={colors['gray scale/40']}
      />
      <Input
        containerProps={{ mt: 15 }}
        value={watching?.firstName}
        label="First Name"
        defaultValue={initialValues?.firstName}
        status={errors.firstName && 'danger'}
        caption={errors.firstName && errors.firstName.message}
        onChangeText={val => setValue('firstName', val)}
        size="large"
      />
      <Input
        label="Last Name"
        value={watching?.lastName}
        containerProps={{ mt: 15 }}
        defaultValue={initialValues?.lastName}
        status={errors.lastName && 'danger'}
        caption={errors.lastName && errors.lastName.message}
        onChangeText={val => setValue('lastName', val)}
        size="large"
      />
      <Input
        containerProps={{ mt: 15 }}
        label="Company Name"
        value={watching?.companyName}
        defaultValue={initialValues?.companyName}
        status={errors.companyName && 'danger'}
        caption={errors.companyName && errors.companyName.message}
        onChangeText={val => setValue('companyName', val)}
        size="large"
      />
      <Input
        containerProps={{ mt: 15 }}
        label="Website"
        value={watching?.website}
        defaultValue={initialValues?.website}
        status={errors.website && 'danger'}
        caption={errors.website && errors.website.message}
        onChangeText={val => setValue('website', val)}
        placeholder="https://"
        placeholderTextColor={colors['gray scale/40']}
        size="large"
      />
      <PhoneNumberInput
        defaultValue={initialValues?.phone}
        value={formatPhoneNumber(watching?.phone, true)}
        label="Mobile Number"
        onChangeText={val => setValue('phone', val)}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoCompleteType="tel"
        status={errors.phone && 'danger'}
        caption={errors.phone?.message}
        disabled={submitting}
        containerProps={{ mt: 15 }}
        size="large"
      />
      <PhoneNumberInput
        defaultValue={initialValues?.phoneNumberOffice}
        value={formatPhoneNumber(watching?.phoneNumberOffice, true)}
        label="Phone Number"
        onChangeText={val => setValue('phoneNumberOffice', val)}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoCompleteType="tel"
        status={errors.phoneNumberOffice && 'danger'}
        caption={errors.phoneNumberOffice?.message}
        disabled={submitting}
        containerProps={{ mt: 15 }}
        size="large"
      />
      <Input
        value={watching?.email}
        defaultValue={initialValues?.email}
        label="Email"
        onChangeText={val => setValue('email', val)}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        status={errors.email && 'danger'}
        caption={errors.email?.message}
        disabled={submitting}
        containerProps={{ mt: 15 }}
        size="large"
      />
      <Input
        label="Address"
        containerProps={{ mt: 15 }}
        value={watching?.address}
        defaultValue={initialValues?.address}
        status={errors.address && 'danger'}
        caption={errors.address && errors.address.message}
        onChangeText={val => setValue('address', val)}
        size="large"
      />
      <Input
        containerProps={{ mt: 15 }}
        label="Specialty"
        value={watching?.specialty}
        defaultValue={initialValues?.specialty}
        status={errors.specialty && 'danger'}
        caption={errors.specialty && errors.specialty.message}
        onChangeText={val => setValue('specialty', val)}
        size="large"
      />
      <Input
        label="City"
        value={watching?.city}
        defaultValue={initialValues?.city}
        status={errors.city && 'danger'}
        caption={errors.city && errors.city.message}
        onChangeText={val => setValue('city', val)}
        size="large"
        containerProps={{ mt: 15 }}
      />
      <SelectInput
        mt={15}
        label="State"
        options={statesFormatted}
        status={errors.state && 'danger'}
        caption={errors.state && errors.state.message}
        onSelect={val => setValue('state', val)}
        value={watching.state?.title}
        size="large"
      />
      <WorkHoursField
        onSelect={(val, week) => setValue('hours', formatHours(week))}
        value={formatHours(watching?.hours)}
        error={errors?.hours?.message}
        changeBtnText="SELECT"
        isChange={!!watching?.hours}
      />
    </>
  );
};

export default EditServiceProviderFields;
