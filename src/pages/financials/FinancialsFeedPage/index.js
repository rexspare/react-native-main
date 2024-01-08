import React, { useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import Box from 'components/Box';
import { useIsOpen } from 'hooks/useIsOpen';
import { arrayToObject } from 'helpers/object';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import useFab from 'hooks/useFab';
import FAB from 'components/FAB';
import { feedTypes, TABS_TO_FILTER } from '../const';
import FinancialsPageHead from './FinancialsPageHead';
import FinancialsFeed from './FinancialsFeed';
import ExpensePaymentModal from './ExpensePaymentModal';
import useFilter from "hooks/useFilter";

const FinancialsFeedPage = ({ navigation, route }) => {
  const feedType = route.params?.type;
  if (!feedType) return null;
  const [filter] = useFilter(["financialsFeed"]);
  const [filterTab, setFilterTab] = useState(null);
  const { isOpen: displayGraph } = useIsOpen();

  const {
    isOpen: displayExpenseModal,
    close: closeExpenseModal,
    open: openExpenseModal,
  } = useIsOpen();

  const permissions = usePermissions(PERMISSION_SECTIONS.FINANCIALS);
  const { tabs, cardThemeMap, header, feedVariables } = useMemo(
    () => getFeedTypeParams(feedType),
    [feedType],
  );
  const { graphOnly, tabVariables } = useMemo(
    () => getTabParams(cardThemeMap, filterTab),
    [filterTab, cardThemeMap],
  );

  useEffect(() => setFilterTab(tabs[0].value), [feedType, tabs]);
  const listVariables = { ...filter?.financialsFeed, ...tabVariables, ...feedVariables };

  const canAdd = permissions?.create;
  const fabContext = useFab();
  const { props: fabProps } = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? openExpenseModal : null,
      });
      fabContext.setVisible(canAdd);
    }, []),
  );

  return (
    <Box flex={1}>
      <FinancialsPageHead
        header={header}
        navigation={navigation}
        setFilterTab={setFilterTab}
        tabs={tabs}
        feedType={feedType}
        filters={listVariables}
        permissions={permissions}
        displayGraph={graphOnly || displayGraph}
      />
      <FinancialsFeed
        displayGraph={graphOnly || displayGraph}
        filterTab={filterTab}
        filters={filter}
        feedType={feedType}
        variables={listVariables}
        permissions={permissions}
      />
      <ExpensePaymentModal
        visible={displayExpenseModal}
        onHide={closeExpenseModal}
      />
      {feedType !== 'OUTSTANDING_DEBTS' && <FAB {...fabProps} />}
    </Box>
  );
};

const getFeedTypeParams = feedType => {
  const { tabs, header, variables: feedVariables } = feedTypes[feedType];
  return {
    tabs,
    header,
    feedVariables,
    cardThemeMap: arrayToObject(tabs, 'value'),
  };
};

const getTabParams = (cardThemeMap, filterTab) => {
  return {
    themeColor: cardThemeMap[filterTab]?.themeColor,
    graphOnly: cardThemeMap?.[filterTab]?.graphOnly,
    tabVariables: TABS_TO_FILTER?.[filterTab] ?? null,
  };
};

export default FinancialsFeedPage;
