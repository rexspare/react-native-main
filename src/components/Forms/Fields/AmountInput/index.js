import React from 'react';
import { isNaN, isNumber } from 'lodash';
import { Icon } from '@ui-kitten/components';
import ValidatedInput from 'components/ValidatedInput';
import Box from 'components/Box';

export const isValidAmountInput = val => {
  const float = parseFloat(val);
  return !isNaN(float) && isNumber(float);
};

const AmountInput = ({ prefix = '$', onChange, value = '', ...props }) => {

  const handleChange = a => {
    if (a === '') return onChange('');
    if (isValidAmountInput(a)) return onChange(a);
  };

  const to2Dp = () => {
    const val = parseFloat(value?.toString().replace(/,/g, '')).toFixed(2);
    const calVal = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return handleChange(calVal);
  };

  return (
    <ValidatedInput
      onChangeText={handleChange}
      keyboardType="decimal-pad"
      value={value}
      onBlur={to2Dp}
      textStyle={{ paddingLeft: 18 }}
      icon={style => (
        <Box
          position={'absolute'}
          justifyContent={'center'}
          alignItems={'center'}
          height={18}
          width={18}>
          <Icon {...style} name={'dollar'} pack={'pm'} height={36} width={36} />
        </Box>
      )}
      {...props}
    />
  );
};

export default AmountInput;
