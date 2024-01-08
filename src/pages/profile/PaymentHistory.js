import React, { useEffect, useState, useMemo } from 'react';
import format from 'date-fns/format';
import { useLoader } from 'hooks/useLoader';
import useShouldRefresh from 'hooks/useShouldRefresh';
import listPendingPaymentsQuery from 'queries/rentals/listTenantPayments.gql';
import Box from 'components/Box';
import Text from 'components/Text';
import InfiniteFlatList from 'components/InfiniteFlatList';
import PayHistoryCard from 'components/RentalCard/payHistoryCard';
import {
  renderSectionHeader,
  sectionExtractor,
  _getSections,
} from 'helpers/list';
import { dateFormatMonthYrs } from 'constants/dateFormat';
import { TENANT_PAYMENTS } from 'constants/refreshConsts';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const ShadowBox = styled(Box)`
  shadow-opacity: 0.1;
  shadow-radius: 8;
  shadow-color: #000;
  elevation: 5;
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;

const dateSections = [];
const now = new Date();
for (let i = now.getFullYear(); i > now.getFullYear() - 10; i--) {
  for (let m = 0; m < 13; m++) {
    const d = new Date(i, m);
    dateSections.push(format(d, dateFormatMonthYrs));
  }
}

export default function PaymentHistory({ navigation, variables }) {
  const paymentListRef = React.useRef();
  const [pause, setPause] = useState(false);
  const { loader, startLoading, stopLoading, isLoading } = useLoader();
  const [sections, setSections] = useState([]);

  const onRefresh = React.useCallback(async () => {
    const refresh = async () => {
      startLoading();
      await paymentListRef.current?.refresh?.(false);
      stopLoading();
    };
    await refresh();
  }, []);

  useShouldRefresh(TENANT_PAYMENTS, () => onRefresh());

  useEffect(() => setPause(false), [variables]);

  const paymentsListProps = useMemo(
    () => ({
      keyExtractor: item => item.id,
      dataExtractor: data => data?.payments,
      onResCallback: res => getSections(res?.data),
      sections,
      sectionExtractor: item =>
        sectionExtractor({
          date: item?.latestPayment,
          df: 'MMMM dd yyyy',
        }),
      renderSectionHeader: section =>
        renderSectionHeader(section, {
          textTransform: 'uppercase',
          color: colors['gray scale/40'],
          ...typography['body/medium – medium'],
        }),
      renderItem: ({ item }) => {
        const status = getPaymentStatus(item, new Date(item.due));
        return (
          <>
            <PayHistoryCard
              price={item.amount}
              notes={item.notes}
              paymentMethod={item.paymentMethod}
              onViewDetails={() =>
                navigation.navigate('RentalPaymentDetails', { item, status })
              }
            />
          </>
        );
      },
    }),
    [navigation, sections],
    sections.length,
  );

  const getSections = _data => {
    const sections = _getSections(
      _data?.payments?.edges,
      'latestPayment',
      'MMMM dd yyyy',
    );
    return setSections(sections);
  };

  const getPaymentStatus = (item, due) => {
    if (item?.amountDue <= 0) return 'PAID';
    const now = new Date();
    const diff = differenceInDays(due || now, now);
    if (diff < 0 && diff !== 0) return 'OVERDUE';
    return 'UNPAID';
  };

  return (
    <>
      {loader}
      <InfiniteFlatList
        query={listPendingPaymentsQuery}
        onRefresh
        ref={paymentListRef}
        variables={variables}
        refresh={isLoading}
        onLoad={() => setPause(true)}
        pause={pause}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Previous Payments
          </Text>
        }
        {...paymentsListProps}
      />
    </>
  );
}
