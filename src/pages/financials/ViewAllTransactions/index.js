import React, { useEffect, useRef } from 'react';

import { getActions } from 'constants/actions';
import { styles } from './styles';
import InfiniteFlatList from 'components/InfiniteFlatList';
import financialsQuery from "queries/financials/getFinancialsFeed.gql";
import FinancialsFeedCard from '../FinancialsFeedPage/FinancialsFeedCard';
import { useGetListProps } from 'hooks/useGetListProps';
import { useIsOpen } from 'hooks/useIsOpen';
import FinancialsExportModal from '../FinancialsFeedPage/FinancialsExportModal';
import { FINANCIAL_REPORT_TYPES } from '../const';
import HeadedScreen from 'components/HeadedScreen';

const dataExtractor = data => data?.payments;
const keyExtractor = item => item?.type + item.id;

const ViewAllTransactions = ({ navigation, route }) => {
  const { isOpen, close, open } = useIsOpen();
  const { feedType, filterTab, variables, header } = route.params || {};
  const listRef = useRef();
  const listProps = useGetListProps(
    {
      dataExtractor,
      keyExtractor,
      renderItem: ({ item }) => (
        <FinancialsFeedCard
          feedType={feedType}
          payment={item}
          filterTab={filterTab}
        />
      ),
      variables,
    },
    [filterTab, feedType, variables],
  );
  useEffect(() => listRef.current?.refresh(), [variables, feedType]);

  return (
    <HeadedScreen
      title={header}
      headerStyle={styles.header}
      actions={getActions(
        ['back', { onPress: () => navigation.goBack() }],
        ['export', { onPress: open }],
      )}>
      <InfiniteFlatList
        query={financialsQuery}
        ref={listRef}
        key={filterTab}
        fetchPolicy={'network-only'}
        {...listProps}
      />
      <FinancialsExportModal
        fileName={'All-Transactions'}
        reportType={FINANCIAL_REPORT_TYPES.FEED}
        visible={isOpen}
        variables={variables}
        onHide={close}
      />
    </HeadedScreen>
  );
};

export default ViewAllTransactions;
