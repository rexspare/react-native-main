import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import PaymentMethodButton from 'pages/financials/FinancialsFeedPage/FinancialsFiltersPage/PaymentMethodButton';
import BorderedText from 'components/BorderedText';
import Box from 'components/Box';
import SelectButtonInput from 'components/SelectButtonInput';
import PopoverField from '../PopoverField';
import { t } from 'helpers/react.js';
import { formatAmount } from 'utils/exchanges';
import { colors } from 'styles/theme';

const defaultRenderValue = ([val], props) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%">
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <BorderedText
          br={8}
          bw={0}
          fw="400"
          fs={16}
          mr={1}
          bgc={colors['primary/50']}
          text={formatAmount(parseFloat(val?.amount.replace(',', '.')))}
          c={'#fff'}
          maxHeight={32}
        />
        <PaymentMethodButton paymentMethod={val?.paymentMethod} />
      </Box>
      <Box>
        {t(
          props?.removeItem,
          <Box
            as={TouchableOpacity}
            marginRight={10}
            onPress={() => props?.removeItem(val, 0)}>
            <Icon width={20} height={20} pack={'pm'} name={'remove'} />
          </Box>,
        )}
      </Box>
    </Box>
  );
};
const AmountField = ({
  Component = SelectButtonInput,
  triggerKey = 'onAdd',
  limit,
  setPaymentMethod,
  setAmount,
  value,
  renderValue = defaultRenderValue,
  setValue,
  ...props
}) => {
  const onDone = ({ amount, paymentMethod }) => {
    if (setValue) return setValue({ amount, paymentMethod });
    setAmount(amount);
    setPaymentMethod(paymentMethod);
  };

  return (
    <PopoverField
      navigationProps={{ header: 'Enter Amount', onDone, value }}
      value={value}
      isModal={false}
      popoverPageName="AmountPage"
      label={'Amount'}
      renderValue={renderValue}
      {...props}
    />
  );
};

export default AmountField;
