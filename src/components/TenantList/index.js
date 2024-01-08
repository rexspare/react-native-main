import React, { useMemo, useRef, useContext } from 'react';
import { Layout } from '@ui-kitten/components';
import tenantsFeedQuery from 'queries/tenants/tenantsFeed.gql';
import AuthContext from 'providers/auth';
import { useSetApproveTenantApplicationApproval } from 'hooks/useSetTenantApplicationApproval';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import Dialog from 'components/Dialog';
import TenantListItem from './TenantListItem';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const TenantList = ({
  navigation,
  building,
  queryParams,
  refreshOnFocus,
  isTitle = true,
}) => {
  const listRef = React.useRef();
  const [error, setError] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const { permissions } = useContext(AuthContext);
  let leasePayload = useRef(null);

  const {
    confirmModal: approveDenyModal,
    setApplicationId: displaySetStatusModal,
    setStatusModal,
    restoreDeniedTenant,
  } = useSetApproveTenantApplicationApproval({
    applicationId: leasePayload?.current?.application?.pk,
    onSuccess: () => listRef?.current?.refresh(),
  });

  const variables = React.useMemo(
    () => ({
      ...queryParams,
      buildingId: building?.pk,
    }),
    [building, queryParams],
  );

  const leaseField = useMemo(() => getTenantLeaseField(queryParams), [
    queryParams,
  ]);

  const { dataExtractor, keyExtractor } = React.useMemo(() => {
    return {
      dataExtractor: data => data.tenants,
      keyExtractor: data => data?.id,
    };
  }, []);

  const renderTenant = React.useCallback(
    ({ item }) => {
      return (
        <TenantListItem
          tenant={item}
          leaseField={leaseField}
          restoreDeniedTenant={restoreDeniedTenant}
          displaySetStatusModal={displaySetStatusModal}
          queryParams={queryParams}
          permissions={permissions}
          onPress={leaseId =>
            permissions?.tenants.view &&
            navigation.navigate('ViewTenant', {
              id: leaseId,
              params: queryParams,
              restoreDeniedTenant: restoreDeniedTenant,
              refreshList: listRef.current?.refresh,
              permissions: permissions?.tenants.edit,
            })
          }
        />
      );
    },
    [navigation, leaseField, restoreDeniedTenant, displaySetStatusModal],
  );

  return (
    <Box as={Layout} flex={1}>
      {isTitle && (
        <Box mt={building ? 0 : 3} mx={3}>
          <Text
            style={{
              ...typography['body/large – Bold'],
              color: colors['gray scale/40'],
              textTransform: 'uppercase',
            }}>
            Tenants
          </Text>
        </Box>
      )}
      <Box flex={1}>
        <Box flex={1}>
          <InfiniteFlatList
            ref={listRef}
            query={tenantsFeedQuery}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            refreshOnFocus={refreshOnFocus}
            renderItem={renderTenant}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 4 }}
            ListEmptyComponent={
              <Text category="h6" py={3} textAlign="center" appearance="hint">
                No Tenants
              </Text>
            }
          />
        </Box>
      </Box>
      <Dialog
        visible={!!modal}
        onHide={() => setModal(null)}
        {...(modal || {})}
      />
      <Dialog
        visible={!!error}
        onHide={() => setError(null)}
        title={error?.title}
        content={error?.content}
        buttons={[
          { children: 'OK', gradient: true, shape: 'circle', hide: true },
        ]}
      />
      {approveDenyModal}
      {setStatusModal}
    </Box>
  );
};

const getTenantLeaseField = variables => {
  const {
    isApproved,
    isCurrent,
    isProspective,
    isPast,
    isArchived,
  } = variables;
  if (isApproved) return 'approvedLease';
  if (isCurrent) return 'currentLease';
  if (isProspective) return 'prospectiveLease';
  if (isPast) return 'pastLease';
  if (isArchived) return 'archivedLease';
};

export default TenantList;
