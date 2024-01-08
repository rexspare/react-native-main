import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Icon } from '@ui-kitten/components';
import { useIsOpen } from 'hooks/useIsOpen';
import {
  CASH_FLOW,
  OUTSTANDING_DEBTS,
  PAYMENT_METHOD_ICONS,
  PROFIT_AND_LOSS,
} from 'pages/financials/const';
import SendNoticeModal from 'pages/financials/TransactionDetails/NoticeActions/SendNoticeModal';
import Box from 'components/Box';
import Text from 'components/Text';
import { t } from 'helpers/react';
import { formatAmount } from 'utils/exchanges';
import { styles } from './styles';

const paymentMethodIcons = PAYMENT_METHOD_ICONS;
const FEED_TYPE_TO_AMOUNT_FIELD = {
  [OUTSTANDING_DEBTS]: 'amountDue',
  [CASH_FLOW]: 'amountPaid',
  [PROFIT_AND_LOSS]: 'amount',
};

const FinancialsFeedCard = ({ payment, feedType, filterTab, permissions }) => {
  const { isOpen, open, close } = useIsOpen();
  const { building, unit, paymentMethod, payer, recipient } = payment;
  const navigation = useNavigation();
  const paymentIcon =
    (paymentMethod && paymentMethodIcons[paymentMethod.toLowerCase()]) ||
    'other';
  const fullName =
    filterTab === 'EXPENSES' ? recipient?.fullName : payer?.fullName;
  const isOutstanding = feedType === OUTSTANDING_DEBTS;
  const amount =
    payment[FEED_TYPE_TO_AMOUNT_FIELD[feedType]] || payment?.amount;

  return (
    <>
      <Box
        as={TouchableWithoutFeedback}
        onPress={() =>
          permissions?.view
            ? navigation.navigate('TransactionDetails', {
                payment,
                feedType,
                filterTab,
              })
            : null
        }>
        <Box {...styles.container} mt={'13'}>
          <Box flex={3} {...styles.content}>
            <Box {...styles.buildingTextContainer} mb={2}>
              {!!building || !!unit ? (
                <>
                  <Text numberOfLines={1} style={styles.buildingText}>
                    {building?.address}
                  </Text>
                  {t(
                    building && unit,
                    <Text style={styles.slashSeparator}> / </Text>,
                  )}
                  <Text numberOfLines={1} style={styles.buildingText}>
                    {unit?.unitNumber}
                  </Text>
                </>
              ) : (
                <Text style={styles.buildingText}>N.A.</Text>
              )}
            </Box>
            <Box flexDirection="row">
              <Text numberOfLines={1} {...styles.tenantText}>
                {fullName ?? 'N.A.'}
              </Text>
              {paymentIcon && feedType === PROFIT_AND_LOSS && (
                <Box ml={10} width={18}>
                  <Icon
                    pack={'pm'}
                    height={18}
                    width={18}
                    name={
                      filterTab === 'EXPENSES'
                        ? 'orange-' + paymentIcon
                        : paymentIcon
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box {...styles.amountContainer}>
            <Text
              numberOfLines={1}
              {...styles.amountText}
              {...(isOutstanding && styles.altAmountText)}>
              {filterTab === 'EXPENSES' ? '-' : ''} {formatAmount(amount)}
            </Text>
          </Box>
        </Box>
      </Box>
      {t(isOutstanding, <SendNoticeModal visible={isOpen} onHide={close} />)}
    </>
  );
};

const getDifferenceInDays = (dateOne, dateTwo) => {
  const timeDifference = dateOne.getTime() - dateTwo.getTime();
  const msPerDay = 1000 * 3600 * 24;
  const daysDifference = timeDifference / msPerDay;
  return Math.round(daysDifference);
};

export default FinancialsFeedCard;
