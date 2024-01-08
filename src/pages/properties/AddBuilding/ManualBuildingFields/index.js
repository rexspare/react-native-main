import Divider from 'components/Divider';
import React, { useEffect, useState } from 'react';
import SelectInput from 'components/SelectInput';
import Input from 'components/Input';
import {
  formatEnumToSelectOptions,
  PROPERTY_TYPES,
  stringifyEnumValue,
} from 'constants/enums.js';
import { toCapitalLetter } from '../helper';
import { styles } from './styles';
import Text from 'components/Text';

const commonProps = {
  labelStyle: styles.labelStyle,
  style: styles.input,
  size: 'large',
  isRequired: true,
  mb: 7.5,
  mt: 7.5,
};

const ManualBuildingFields = ({
  form,
  handleAutoFetchData,
  setValue,
  editing = false,
  owner,
  handleFetchNYChData,
  error,
}) => {
  const [params, setParams] = useState();

  useEffect(() => {
    if (params?.zip && form?.address) {
      handleFetchNYChData({ zip: params.zip, address: form.address });
    } else if (params?.address && form?.zip) {
      handleFetchNYChData({ zip: form.zip, address: params.address });
    } else {
      handleFetchNYChData(params);
    }
  }, [params?.zip, params?.address]);

  return (
    <>
      <Input
        label={'Building name'}
        onChangeText={val => setValue('name', val)}
        value={form?.name}
        {...commonProps}
        labelIcon={form?.name ? 'green-circle-tick' : null}
        isRequired={form?.name ? false : true}
      />
      <Input
        label={'Building address'}
        onChangeText={val => {
          setParams({ ...params, address: toCapitalLetter(val.trim()) });
          setValue('address', toCapitalLetter(val));
        }}
        value={form?.address}
        onBlur={handleAutoFetchData}
        {...commonProps}
        labelIcon={form?.address ? 'green-circle-tick' : null}
        isRequired={form?.address ? false : true}
      />
      <Input
        label={'State'}
        onBlur={handleAutoFetchData}
        onChangeText={val => setValue('state', val)}
        value={form?.state}
        {...commonProps}
      />
      <Input
        label={'ZIP Code'}
        onBlur={handleAutoFetchData}
        keyboardType="numeric"
        onChangeText={val => {
          setParams({ ...params, zip: val.trim() });
          setValue('zip', val.trim());
        }}
        value={form?.zip}
        {...commonProps}
      />
      <Text ml={1} color={'red'}>
        {params?.zip || (params?.address && error) ? error : ''}
      </Text>
      <Input
        label={'Building city'}
        onChangeText={val => setValue('city', val)}
        value={form?.city}
        onBlur={handleAutoFetchData}
        {...commonProps}
      />
      <Divider mt={3} />
      <SelectInput
        label="Property type"
        placeholder="Select from list"
        options={formatEnumToSelectOptions(PROPERTY_TYPES)}
        value={stringifyEnumValue(PROPERTY_TYPES, form?.propertyType)}
        onSelect={val => setValue('propertyType', val?.key)}
        {...commonProps}
      />
      <Input
        label={'Neighborhood'}
        value={form?.neighbourhood}
        onChangeText={val => setValue('neighbourhood', toCapitalLetter(val))}
        {...commonProps}
      />
      <Input
        label={'Max FAR'}
        onChangeText={val => setValue('maxFar', val)}
        labelStyle={{}}
        keyboardType="numeric"
        value={form?.maxFar}
        isNoTransform
        {...commonProps}
        isRequired={false}
      />
      <Input
        label={'Building FAR'}
        onChangeText={val => setValue('far', val)}
        keyboardType="numeric"
        value={form?.far}
        isNoTransform
        {...commonProps}
        isRequired={false}
      />
    </>
  );
};
export default ManualBuildingFields;
