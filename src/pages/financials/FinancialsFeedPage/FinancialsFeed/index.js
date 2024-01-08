import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { useGetListProps } from 'hooks/useGetListProps';
import AuthProvider from 'providers/auth';
import { useQuery } from 'urql';
import financialsQuery from 'queries/financials/getFinancialsFeed.gql';
import {
  getManagerProfileQuery,
  getUserProfileQuery,
} from 'pages/profile/CoorperateProfile/schema';
import { renderSectionHeader as _renderSectionHeader } from 'pages/tasks/TaskList';
import { CASH_FLOW } from 'pages/financials/const';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Box from 'components/Box';
import FinancialsFeedCard from '../FinancialsFeedCard';
import FinancialsGraph from '../FinancialsGraph';
import {
  sectionExtractor,
  _getSections,
  renderSectionHeader,
} from '../../../../helpers/list';
import { styles } from '../styles';

const dataExtractor = data => data?.payments;
const FinancialsFeed = ({
  displayGraph,
  filters,
  feedType,
  filterTab,
  variables,
  permissions,
}) => {
  const dataRef = useRef();
  const listRef = useRef();
  const isFocused = useIsFocused();

  const [sections, setSections] = useState([]);
  const { user } = useContext(AuthProvider);

  const itemDateField = useMemo(
    () => (feedType === CASH_FLOW ? 'latestPayment' : 'due'),
    [feedType],
  );

  //Get profile data
  const [profileRes, fetchProfile] = useQuery({
    query:
      user?.userType == 2
        ? getUserProfileQuery(user?.userType)
        : getManagerProfileQuery(user?.userType),
    pause: !user?.userType,
    variables: { id: user?.id },
    requestPolicy: 'network-only',
  });

  const listProps = useGetListProps(
    {
      dataExtractor,
      renderItem: ({ item }) => (
        <FinancialsFeedCard
          permissions={permissions}
          isIncoming={variables.isIncoming}
          isOutgoing={variables.isOutgoing}
          feedType={feedType}
          filterTab={filterTab}
          payment={item}
        />
      ),
      variables: !!variables.isIncoming
        ? { ...variables, recipient: user.pk }
        : variables,
      dataRef,
      onResCallback: res => getSections(res?.data),
      sections,
      sectionExtractor: item =>
        sectionExtractor({ date: item[itemDateField], df: 'MMMM dd yyyy' }),
      renderSectionHeader: section =>
        renderSectionHeader(section, styles.sectionHeaderText),
    },
    [filterTab, feedType, filters, variables, sections, itemDateField],
  );

  const getSections = _data => {
    const sections = _getSections(
      _data?.payments?.edges,
      itemDateField,
      'MMMM dd yyyy',
    );
    return setSections(sections);
  };

  useEffect(() => {
    if (isFocused) listRef.current?.refresh();
  }, [filters, feedType, isFocused]);

  return (
    <Box flex={5}>
      {!displayGraph ? (
        <Box flex={1}>
          <InfiniteFlatList
            query={financialsQuery}
            key={filterTab}
            contentContainerStyle={{ paddingBottom: 70 }}
            {...listProps}
          />
        </Box>
      ) : (
        <Box>
          <FinancialsGraph
            activeTab={filterTab}
            companyName={
              user?.userType === 3
                ? profileRes?.data?.user?.managementCompany?.name
                : ''
            }
            userType={user?.userType}
            filters={filters}
          />
        </Box>
      )}
    </Box>
  );
};

export default FinancialsFeed;
