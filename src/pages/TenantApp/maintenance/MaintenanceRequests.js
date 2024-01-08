import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
import Box from 'components/Box';
import {
  MAINTENANCE_REQUEST_STATUSES,
  stringifyEnumValue,
} from 'constants/enums';
import listMaintenanceRequestsQuery from 'queries/tasks/listMaintenanceRequests.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import TaskItem from 'components/TaskItem';
import viewTenantLeasesQuery from 'queries/rentals/viewTenantLeases.gql';
import { useQuery } from 'urql';
import Text from 'components/Text';
import FAB from 'components/FAB';
import HeadedScreenWithTabs from 'components/HeadedScreenWithTabs';
import { t } from 'helpers/react';
import useFab from 'hooks/useFab';
import { standardDateFormat } from 'constants/dateFormat';
import { getActions } from 'constants/actions';

const statusColorMap = {
  [MAINTENANCE_REQUEST_STATUSES.OPEN]: 'color-primary-500',
  [MAINTENANCE_REQUEST_STATUSES.CLOSED]: 'color-danger-500',
};

const MaintenanceRequests = ({ navigation, route }) => {
  const [statusFilter, setStatusFilter] = React.useState(
    MAINTENANCE_REQUEST_STATUSES.OPEN,
  );
  const [myCurrentLease, getCurrentLease] = useQuery({
    query: viewTenantLeasesQuery,
    requestPolicy: 'cache-and-network',
  });
  const currentLease = myCurrentLease.data?.me?.currentLease;
  const listRef = React.useRef();

  const listFilter = React.useMemo(
    () => ({
      status: statusFilter,
    }),
    [statusFilter],
  );

  const listProps = React.useMemo(() => {
    return {
      keyExtractor: item => item.id,
      renderItem: ({ item }) => (
        <Box marginBottom="8px">
          <TaskItem
            id={item.id}
            title={item.task.title}
            style={{ borderWidth: 1, borderRadius: 8 }}
            themeColor={statusColorMap[statusFilter]}
            timestamp={item.task.createdAt}
            showRightBar={false}
            dateFormat={standardDateFormat}
            onPress={() =>
              navigation.navigate('ViewRequest', {
                id: item.id,
                onUpdate: listRef.current?.refresh,
              })
            }
          />
        </Box>
      ),
      dataExtractor: data => data.maintenanceRequests,
    };
  }, [navigation, statusFilter]);

  const onRefresh = React.useCallback(() => listRef.current?.refresh?.(), []);

  const fabContext = useFab();
  const { props: fabProps } = fabContext;
  const displayAddMaintainanceRequest = true;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: displayAddMaintainanceRequest
          ? () => navigation.navigate('EditRequest', { onUpdate: onRefresh })
          : null,
      });
      fabContext.setVisible(displayAddMaintainanceRequest);
    }, [navigation]),
  );

  return (
    <HeadedScreenWithTabs
      header={'Maintenance Requests'}
      onSelect={option => setStatusFilter(option.value)}
      options={Object.values(MAINTENANCE_REQUEST_STATUSES).map(value => ({
        text: stringifyEnumValue(MAINTENANCE_REQUEST_STATUSES, value),
        themeColor: statusColorMap[value],
        value,
      }))}
      actions={getActions([
        'bell',
        { onPress: () => navigation.navigate('Notifications') },
      ])}>
      {t(
        currentLease,
        <Box flex={1} position="relative" mt="2">
          <InfiniteFlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            key={statusFilter}
            refreshOnLoad
            query={listMaintenanceRequestsQuery}
            variables={listFilter}
            ref={listRef}
            {...listProps}
          />
          <FAB {...fabProps} />
        </Box>,
        <Text category="h6" my={4} textAlign="center" appearance="hint">
          No Active Lease
        </Text>,
      )}
    </HeadedScreenWithTabs>
  );
};

export default MaintenanceRequests;
