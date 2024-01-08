import React, { useMemo, useContext, useState } from 'react';
import { useQuery } from 'urql';
import ProfilePage from 'components/ProfilePage';
import { getActions } from 'constants/actions';
import { tabs, steps } from './schema';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import Text from 'components/Text';
import BorderedText from 'components/BorderedText';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import { LEASE_STATUS } from 'constants/enums';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { IS_SMALLER } from 'styles/responsive';
import AuthProvider from 'providers/auth';
import Dialog from 'components/Dialog';
import { useIsOpen } from 'hooks/useIsOpen';
import ProfileFiltersModal from 'pages/tenants/ProfileFilterModal';

const ViewTenant = ({ navigation, route, isSelf }) => {
  const { isOpen, open, close } = useIsOpen();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {
    isOpen: displayFilters,
    open: openFilters,
    close: closeFilters,
  } = useIsOpen();
  const { tenantLease } = useContext(AuthProvider);
  const theme = useTheme();
  const actions = useMemo(
    () =>
      getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        ((activeTabIndex == 2 || activeTabIndex == 3) && isSelf) && ['filterBlack', { onPress: openFilters }],
        isSelf && [
          'setting',
          {
            onPress: () => navigation.navigate('Settings'),
            disable: true,
            height: 21,
            width: 21,
            marginTop: 3,
          },
        ],
        route.params?.permissions && [
          'editIcon',
          {
            onPress: () =>
              isSelf
                ? open()
                : navigation.navigate('AddTenant', {
                  id: route?.params?.id,
                  onUpdate: onRefresh,
                }),
            disable: true,
            height: 21,
            width: 21,
            marginTop: 3,
          },
        ],
      ),
    [navigation, activeTabIndex],
  );

  const leaseId = isSelf ? tenantLease?.id : route?.params?.id;

  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: leaseId,
      tenantTab: true,
      unitTab: false,
      documentsTab: false,
      activityTab: false,
    },
    pause: !leaseId,
  });

  const onRefresh = React.useCallback(() => {
    executeQuery({ requestPolicy: 'network-only' });
  }, [executeQuery]);

  const lease = useMemo(() => leaseRes.data?.lease, [leaseRes?.data]);

  const dividerRow = (
    <Box height={1} backgroundColor={colors['gray scale/10']} flex={1}></Box>
  );

  const TenantTagsComponent = React.useMemo(() => {
    const { title, bgc, color, leaseStatus, statusBgc } = getTagProps(
      route?.params?.params?.isArchived ? { status: 2 } : leaseRes.data?.lease,
    );

    return (
      <>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          px={18}
          mt={1}>
          {dividerRow}
          <Box flexDirection="row" alignItems="center" px={2}>
            <BorderedText
              text={title}
              bgc={bgc}
              c={color}
              mt={0}
              mx={1}
              bw={0}
              py={0}
              br={8}
              styles={{ text: { ...typography['body/small – medium'], fontSize: 15, fontFamily: 'Roboto', marginVertical: 2, marginHorizontal: 4 } }}
            />
            {t(
              !!leaseStatus,
              <BorderedText
                mx={1}
                mt={0}
                bw={0}
                py={0}
                br={8}
                bgc={statusBgc}
                c={'#fff'}
                styles={{ text: { ...typography['body/small – medium'], fontSize: 15, fontFamily: 'Roboto', marginVertical: 2, marginHorizontal: 4 } }}
                text={leaseStatus}
              />,
            )}
          </Box>
          {dividerRow}
        </Box>
      </>
    );
  }, [leaseRes.data, theme]);

  const headerChildren = () => {
    return (
      <Box alignItems="center">
        <Text
          color={colors['gray scale/40']}
          style={typography['body/small – medium']}>
          {leaseRes.data?.lease?.tenant?.receivedReviews.edgeCount
            ? `${leaseRes.data?.lease?.tenant?.averageScore || 'n/a'}% (${leaseRes.data?.lease?.tenant?.receivedReviews.edgeCount
            } reviews)`
            : '0 Reviews'}
        </Text>
        <Box
          pointerEvents="none"
          mt="3"
          justifyContent={'center'}
          flexDirection={'row'}>
          {TenantTagsComponent}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <ProfilePage
        user={leaseRes?.data?.lease?.tenant}
        leaseId={leaseId}
        fetching={leaseRes?.fetching}
        navigation={navigation}
        actions={actions}
        tabs={tabs}
        steps={steps}
        route={route}
        flexSize={IS_SMALLER ? 2 : 2.5}
        extraHeaderContent={!isSelf && headerChildren}
        refetchData={onRefresh}
        isSelf={isSelf}
        setActiveTabIndex={setActiveTabIndex}
      />
      <ProfileFiltersModal visible={displayFilters} onHide={closeFilters} />
      <Dialog visible={!!isOpen} onHide={close} title="Notice" closeIcon={null}>
        Please contact manager or landlord to edit profile details.
      </Dialog>
    </>
  );
};

const getTagProps = lease => {
  let title = 'Tenant';
  let bgc;
  let color = '#fff';
  let statusBgc = colors['gray scale/40'];
  let leaseStatus;
  switch (lease?.status) {
    case LEASE_STATUS.CURRENT:
      title = 'Current';
      bgc = colors['primary/80'];
      break;
    case LEASE_STATUS.PAST:
      title = 'Past';
      bgc = colors['gray scale/40'];
      color = '#fff';
      break;
    case LEASE_STATUS.ARCHIVED:
      title = 'Archived';
      bgc = colors['gray scale/20'];
      color = '#000';
      break;
    case LEASE_STATUS.APPROVED:
      title = 'Approved';
      if (lease.leaseSigned) {
        bgc = colors['primary/80'];
        leaseStatus = 'Lease Signed';
      } else if (lease.leaseSent) {
        bgc = colors['primary/80'];
        leaseStatus = 'Lease Sent';
      } else {
        bgc = colors['primary/80'];
        statusBgc = colors['gray scale/40'];
        leaseStatus = 'Lease Needed';
      }
      break;
    case LEASE_STATUS.PROSPECTIVE:
      title = 'Prospective';
      bgc = colors['primary/brand'];
      break;
  }
  return { title, bgc, color, leaseStatus, statusBgc };
};

export default ViewTenant;
