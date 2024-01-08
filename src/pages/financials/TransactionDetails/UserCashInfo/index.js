import React from 'react';
import { Text } from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { TRANSACTION_TYPE } from 'constants/enums';
import { t } from 'helpers/react';
import { styles } from './styles';
import { colors } from 'styles/theme';
import Features from 'components/Features';
import { formatAmount } from 'utils/exchanges';
import { format } from 'helpers/date';
import { standardDateFormat } from 'constants/dateFormat';

const PAYMENT_METHODS_ICONS = {
  cash: 'transaction-details-cash',
  check: 'transaction-details-check',
  credit: 'transaction-details-credit-card',
  other: 'transaction-details-other',
  ['in app']: 'transaction-details-paypal',
};

const UserCashInfo = ({
  date,
  amount,
  paymentMethod,
  transactionType,
  amountPaid,
  amountDue,
  isIncoming,
  displayFeatures,
  notice,
}) => {
  const iconName = PAYMENT_METHODS_ICONS[paymentMethod] || 'bank-account';
  if (displayFeatures) {
    return (
      <Features
        styles={{
          row: styles.rentPaymentRow,
          content: styles.rentAndDebtItemPrice,
          label: styles.rentAndDebtItemText,
        }}
        features={[
          {
            label: 'Rent Payment: ',
            content: formatAmount(amount),
            icon: 'home-transaction',
            pack: 'pm',
            styles: { iconContainer: styles.featuresIconContainer },
          },
          amountPaid > 0 && {
            label: 'Amount Paid: ',
            content: formatAmount(amountPaid),
            icon: 'rent-payment-details',
            icon: 'amount-paid',
            pack: 'pm',
            styles: {
              iconContainer: {
                ...styles.featuresIconContainer,
                backgroundColor: colors['primary/5'],
              },
            },
          },
          {
            label: 'Outstanding Debt: ',
            content: formatAmount(amountDue),
            icon: 'reminder',
            pack: 'pm',
            styles: { iconContainer: { ...styles.featuresIconContainer } },
          },
          notice && {
            label: 'Notice Sent:',
            content: format(notice?.dateSent, standardDateFormat, null, {
              toDate: true,
            }),
            iconProps: { height: 22, width: 20 },
            icon: 'bell-transaction',
            pack: 'pm',
            styles: { iconContainer: styles.featuresIconContainer },
          },
        ]}
      />
    );
  }

  return (
    <Box mt={3} alignItems={'center'}>
      {t(
        paymentMethod,
        <>
          <Box style={styles.bankAccountLine} />
          <Box style={styles.bankAccountButtonContainer}>
            <Box
              style={[
                styles.bankAccountButton,
                {
                  backgroundColor:
                    transactionType === TRANSACTION_TYPE.INCOME
                      ? colors['primary/50']
                      : colors['additional/out & expens'],
                },
              ]}>
              <Box
                as={Button}
                icon={style => Icon(iconName, 'pm')({ ...style })}
                appearance="ghost"
                style={styles.bankAccountButtonIcon}
              />
              <Text style={styles.bankAccountButtonText}>
                {paymentMethod?.toLowerCase()}
              </Text>
            </Box>
          </Box>
        </>,
      )}
      <Text style={styles.dateText}>
        {format(date, 'dd MMM yyyy', null, { toDate: true })}
      </Text>
      <Text style={styles.amountText}>
        {t(!isIncoming, '-')} {formatAmount(amount)}
      </Text>
    </Box>
  );
};

export default UserCashInfo;
