import React, { useCallback } from 'react';
import PaymentMethodButton from 'pages/financials/FinancialsFeedPage/FinancialsFiltersPage/PaymentMethodButton';
import SelectButtonInput from 'components/SelectButtonInput';
import SelectListItem from 'components/SelectListItem/SelectListItem';
import PaymentMethodIcon from 'components/PaymentMethodIcon';
import Box from 'components/Box';
import PopoverField from '../PopoverField';
import {
  PAYMENT_METHODS,
  stringifyEnumKey,
  stringifyEnumValue,
} from 'constants/enums';
import { colors } from 'styles/theme';

const defaultRenderValue = methods => (
  <Box flexDirection={'row'} maxWidth={'100%'} flexWrap={'wrap'} mt={2}>
    {methods.map(m => (
      <PaymentMethodButton paymentMethod={m} />
    ))}
  </Box>
);

const PaymentMethodField = ({
  Component = SelectButtonInput, 
  triggerKey = 'onAdd',
  setValue,
  value,
  renderValue = defaultRenderValue,
  limit = false,
  ...props
}) => {
  const renderItem = useCallback(({ item, isSelected, onPress }) => {
    return (
      <SelectListItem
        isSelected={isSelected}
        onPress={onPress}
        item={item}
        text={stringifyEnumValue(PAYMENT_METHODS, item)}
        icon={
          <Box marginRight={12}>
            <PaymentMethodIcon
              method={stringifyEnumKey(item)}
              fill={isSelected ? colors['primary/50'] : colors['gray scale/90']}
            />
          </Box>
        }
      />
    );
  }, []);

  const options = Object.values(PAYMENT_METHODS);

  return (
    <PopoverField
      triggerKey={triggerKey}
      Component={Component}
      value={value}
      setValue={setValue}
      renderValue={renderValue}
      navigationProps={{
        value: value,
        onSelect: paymentForm => setValue(paymentForm),
        header: 'Payment Method',
        renderItem,
        limit,
        options,
        displayDone: true,
      }}
      mb={null}
      {...props}
      label={'Payment Method'}
    />
  );
};

export default PaymentMethodField;
