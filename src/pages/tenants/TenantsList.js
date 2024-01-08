import React, { useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { useIsOpen } from 'hooks/useIsOpen';
import useNotifications from 'hooks/useNotifications';
import useFab from 'hooks/useFab';
import useFilter from 'hooks/useFilter';
import AuthContext from 'providers/auth';
import Header from 'components/Header';
import Box from 'components/Box';
import ScrollHeader from 'components/ScrollHeader';
import MultiTextSwitch from 'components/MultiTextSwitch';
import FAB from 'components/FAB';
import Button from 'components/Button';
import Icon from 'components/Icon';
import TenantTabs from './TenantTabs';
import { TENANT_LIST_TABS } from '../tenants/TenantTabs/styles';

const TenantsList = ({ navigation, route }) => {
  const [feedFilter, setFeedFilter] = useState({ isCurrent: true });
  const [search, setSearch] = React.useState(null);
  const { unreadCount } = useNotifications();
  const { isOpen, open, close } = useIsOpen();
  const fabContext = useFab();
  const { permissions } = useContext(AuthContext);
  const { props: fabProps } = fabContext;
  const tabs = TENANT_LIST_TABS;
  const [{ building }, setFilter] = useFilter('building');

  const displayAddTenant =
    permissions?.tenants?.create &&
    !feedFilter?.isPast &&
    !feedFilter?.queryParams?.isArchived;

  const onSearch = React.useCallback(val => {
    setSearch(val);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: displayAddTenant
          ? () => navigation.navigate('AddTenant')
          : null,
      });
      fabContext.setVisible(displayAddTenant);
    }, [displayAddTenant, navigation]),
  );

  const navBarProps = React.useMemo(
    () => ({
      alignment: 'center',
      actions: [
        {
          icon: 'menu',
          left: true,
          onPress: () => navigation.openDrawer(),
        },
        {
          icon: 'filter',
          pack: 'pm',
          onPress: () => open(),
        },
        {
          icon: 'bell',
          pack: 'pm',
          onPress: () => navigation.navigate('Notifications'),
          badge: Math.min(unreadCount ?? 0, 99),
        },
      ],
      headerIcon: true,
      divider: true,
    }),
    [unreadCount],
  );

  const renderContent = React.useCallback(() => {
    return (
      <TenantTabs
        navigation={navigation}
        isOpen={isOpen}
        close={close}
        feedFilter={feedFilter}
        building={building}
        setFilter={setFilter}
        route={route}
      />
    );
  }, [navigation, isOpen, feedFilter, close]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/tenant-tab-bg.png')}
      contentContainerStyle={{ paddingTop: 40 }}
      innerContainerStyle={{ marginTop: 240 }}
      imageContent={
        <>
          <Header
            alignSelf="center"
            alignment="center"
            transparent
            search="Search"
            onSearch={onSearch}
            searchValue={search}
          />
          <Box mt={3} mx={2}>
            <MultiTextSwitch
              shape="circle"
              size="small"
              options={tabs}
              onSelect={({ value }) => setFeedFilter({ [value]: true })}
            />
          </Box>
        </>
      }>
      {feedFilter.isPast && (
        <Button
          onPress={() =>
            navigation.navigate('ArchivedTenants', {
              building: building,
            })
          }
          appearance="outline"
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 20,
            borderRadius: 12,
          }}
          containerStyle={{
            position: 'absolute',
            bottom: '3%',
            width: '100%',
          }}
          icon={style => Icon('archived', 'pm')({ ...style, marginLeft: 0 })}
          textStyle={{
            display: 'flex',
            alignItems: 'center',
            marginHorizontal: 0,
            fontSize: 16,
            fontWeight: '500',
          }}>
          ARCHIVED
        </Button>
      )}
      <FAB {...fabProps} />
    </ScrollHeader>
  );
};

export default TenantsList;
