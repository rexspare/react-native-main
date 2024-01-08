import React from 'react';
import Box from 'components/Box';
import { isNaN, isNumber } from 'lodash';
import Input from 'components/Input';
import InputLabel from 'components/InputLabel';
import { typography } from 'styles/typography';
import { styles } from './styles';

export const isValidAmountInput = val => {
  const float = parseFloat(val);
  return !isNaN(float) && isNumber(float);
};

const NumericInput = ({ onChange, value, ...props }) => {
  const handleChange = a => {
    if (a === '') return onChange(0);
    if (isValidAmountInput(a)) return onChange(a);
  };

  const to2Dp = () => {
    const val = parseFloat(value?.replace(/,/g, '')).toFixed(2);
    const calVal = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return handleChange(calVal);
  };

  return (
    <Input
      keyboardType="numeric"
      onChangeText={handleChange}
      onBlur={to2Dp}
      containerProps={{ flex: 1 }}
      size="large"
      value={value}
      {...props}
    />
  );
};

const NumericRangeField = ({
  label,
  setMin,
  setMax,
  min,
  max,
  minPlaceholder = 'From',
  maxPlaceholder = 'To',
  inputProps,
  styles: _styles
}) => {

  return (
    <Box
      borderBottomWidth={0}
      borderWidth={1}
      width={'100%'}
      justifyContent={'space-between'}
      {...styles?.container}>
      <InputLabel
        label={label}
        borderWidth={1}
        style={[{ ...typography['body/medium – regular'] }, { ..._styles?.labelStyle }]}
        mb={3}
      />
      <Box style={styles?.inputsContainer}>
        <NumericInput
          label={minPlaceholder}
          height={'100%'}
          onChange={v => setMin(v)}
          value={min && min}
          {...inputProps}
        />
        <Box style={styles.seperator} mx={2} />
        <NumericInput
          label={maxPlaceholder}
          height={'100%'}
          onChange={v => setMax(v)}
          value={max && max}
          {...inputProps}
        />
      </Box>
    </Box>
  );
};

export default NumericRangeField;
