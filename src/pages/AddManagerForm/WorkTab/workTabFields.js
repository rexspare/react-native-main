import React from 'react';
import Input from 'components/Input';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import formatPhoneNumber from 'utils/formatPhoneNumber';

const WorkTabFields = ({ watching, setValue }) => {
  return (
    <>
      <Input
        label="Title"
        mb={15}
        defaultValue={watching?.title}
        onChangeText={val => setValue('title', val)}
        size="large"
      />
      <Input
        label="Email"
        mb={15}
        defaultValue={watching?.email}
        onChangeText={val => setValue('email', val)}
        isUppercase={true}
        size="large"
      />
      <PhoneNumberInput
        label="Office phone"
        mb={15}
        defaultValue={watching.phoneNumberOffice}
        value={watching?.phoneNumberOffice}
        onChangeText={val => {
          const phoneNum = formatPhoneNumber(val, true);
          setValue('phoneNumberOffice', phoneNum);
        }}
        size="large"
      />
      <Input
        label="Office address"
        mb={15}
        defaultValue={watching?.officeAddress}
        onChangeText={val => setValue('officeAddress', val)}
        size="large"
      />
      <Input
        label="Management company"
        mb={15}
        defaultValue={watching?.managementCompany}
        onChangeText={val => setValue('managementCompany', val)}
        size='large'
      />
    </>
  );
};

export default WorkTabFields;
