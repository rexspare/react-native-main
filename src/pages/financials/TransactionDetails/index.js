import React, { useMemo } from 'react';
import { styles } from './styles';
import {
  FINANCIAL_REPORT_TYPES,
  OUTSTANDING_DEBTS,
  CASH_IN,
  REVENUE,
  CASH_FLOW,
} from '../const';
import NoticeActions from './NoticeActions';
import { getActions } from 'constants/actions';
import { t } from 'helpers/react';
import { useIsOpen } from 'hooks/useIsOpen';
import FinancialsExportModal from '../FinancialsFeedPage/FinancialsExportModal';
import { getTransactionDetailedCardsData } from './dataFormatter';
import getPaymentQuery from 'queries/financials/getPayment.gql';
import DetailedCards from 'components/DetailedCard/DetailedCards';
import TransactionDetailsHead from './TransactionDetailsHead';
import { colors } from 'styles/theme';
import HeadedScreen from 'components/HeadedScreen';
import Avatar from 'components/Avatar';
import Box from 'components/Box';
import Text from 'components/Text';
import { getIn } from 'helpers/object';
import { useQuery } from 'urql';
import { typography } from 'styles/typography';

const FEED_TYPE_TO_REPORT_TYPE = {
  [OUTSTANDING_DEBTS]: FINANCIAL_REPORT_TYPES.OVERDUE,
};

const TransactionDetails = ({ navigation, route }) => {
  const { payment, feedType, filterTab } = route?.params || {};
  const { isOpen, close, open } = useIsOpen();
  const isOutstanding = feedType === OUTSTANDING_DEBTS;
  const isIncoming =
    filterTab === CASH_IN || filterTab === REVENUE || isOutstanding;

  const [res] = useQuery({
    query: getPaymentQuery,
    pause: !route?.params?.id,
    variables: { id: route?.params?.id },
  });

  const data = useMemo(() => res?.data?.payment || payment || {}, [
    res?.data?.payment,
    payment,
  ]);

  const { id, payerPaymentsCount } = data;
  const name = isIncoming ? data?.payer?.fullName : data?.recipient?.fullName;
  const picture = isIncoming ? data?.payer?.picture : data?.recipient?.picture;
  const notice =
    isOutstanding && getIn(data, ['lease', 'notices', 'edges', 0, 'node']);
  const date = feedType === CASH_FLOW ? data?.latestPayment : data?.due;

  const onViewAllTransactions = filters => {
    const variables = { ...filters };

    navigation.navigate('ViewAllTransactions', {
      filterTab,
      feedType,
      variables,
      header: name,
    });
  };

  const details = getTransactionDetailedCardsData(
    data,
    isOutstanding,
    onViewAllTransactions,
    isIncoming,
  );

  const actions = useMemo(
    () =>
      getActions(
        ['back', { onPress: () => navigation.goBack() }],
        ['export', { onPress: open }],
      ),
    [navigation],
  );

  return (
    <HeadedScreen
      backgroundColor={colors['gray scale/5']}
      actions={actions}
      headerProps={{ transparent: true }}
      headerStyle={styles.header}>
      <Box bg="white" pb="25">
        <Box style={styles.profileContainer}>
          <Avatar
            image={picture}
            imageText={name}
            styles={{
              image: {
                borderRadius: 84 / 2,
                width: 84,
                height: 84,
                position: 'absolute',
                top: -45,
                zIndex: 2,
                borderColor: 'white',
                borderWidth: 2,
              },
              imageTextStyle: {
                fontSize: 28,
                lineHeight: 40,
              },
            }}
          />
          <Text style={styles.profileName}>
            {t(!isOutstanding, t(isIncoming, `From: `, `To: `))}
            {name}
          </Text>
        </Box>
        <TransactionDetailsHead
          name={name}
          picture={picture}
          date={date}
          paymentMethod={data.paymentMethod}
          amount={data.amount}
          filterTab={filterTab}
          feedType={feedType}
          isIncoming={isIncoming}
          isOutstanding={isOutstanding}
          amountDue={data?.amountDue}
          amountPaid={data?.amountPaid}
          displayFeatures={isOutstanding || filterTab === REVENUE}
          notice={notice}
        />
      </Box>
      <DetailedCards
        data={details}
        styles={{
          container: { mt: 3 },
          label: {
            color: colors['gray scale/90'],
            ...typography['body/small – regular'],
          },
        }}>
        {t(
          isOutstanding,
          <NoticeActions leaseId={data?.lease?.pk} notice={notice} />,
        )}
      </DetailedCards>
      <FinancialsExportModal
        reportType={
          FEED_TYPE_TO_REPORT_TYPE[feedType] ||
          FINANCIAL_REPORT_TYPES.TRANSACTION
        }
        variables={{ id }}
        visible={isOpen}
        onHide={close}
        fileName={'Transaction Details'}
      />
    </HeadedScreen>
  );
};

export default TransactionDetails;
