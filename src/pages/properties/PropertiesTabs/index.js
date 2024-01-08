import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import { noop } from 'lodash';
import useSearch from 'hooks/useSearch';
import { useTabs } from 'hooks/useTabs';
import { useIsOpen } from 'hooks/useIsOpen';
import useFab from 'hooks/useFab';
import { PERMISSION_SECTIONS, usePermissions } from 'hooks/usePermissions';
import useNotifications from 'hooks/useNotifications';
import BuildingList from 'components/BuildingList';
import PropertiesSearch from 'pages/properties/PropertiesSearch';
import BuildingsFiltersModal from 'pages/properties/BuildingsFiltersModal';
import UnitsFiltersModal from 'pages/properties/UnitsFiltersModal';
import Header from 'components/Header';
import UnitList from 'components/UnitList';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Box from 'components/Box';
import FAB from 'components/FAB';
import ScrollHeader from 'components/ScrollHeader';
import AddPropertyModal from './AddPropertyModal/index';

const tabs = [{ Component: BuildingList }, { Component: UnitList }];

const PropertiesTabs = ({ navigation, route }) => {
  const { unreadCount } = useNotifications();
  const [refreshOnFocus, setRefreshOnFocus] = useState(null);
  const { isOpen, close, open } = useIsOpen();
  const {
    isOpen: isOpenModel,
    close: closeModel,
    open: openModel,
  } = useIsOpen();
  const [activeTab, setActiveTab] = useState(0);
  const { Component, setActiveTabIndex } = useTabs(tabs);
  const permissions = usePermissions(PERMISSION_SECTIONS.PROPERTIES);

  const { headerProps: searchHeaderProps, SearchScreen } = useSearch(
    PropertiesSearch,
    'PropertiesSearch',
    'PropertiesTabs',
  );

  const onAddPress = route => {
    closeModel();
    navigation.navigate(route, { onUpdate: setRefreshOnFocus });
  };

  const canAdd = permissions?.create;
  const fabContext = useFab();
  const { props: fabProps } = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? openModel : null,
      });
      fabContext.setVisible(canAdd);
    }, [canAdd]),
  );

  const styles = StyleSheet.create({
    switch: {
      width: '95.5%',
      marginRight: 7,
      marginTop: 15,
    },
  });

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
          onPress: open,
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
      <Box>
        <Component
          route={route}
          navigation={navigation}
          refreshOnFocus={refreshOnFocus}
          setRefreshOnFocus={setRefreshOnFocus}
          permissions={permissions}
          onRefresh={route?.params?.refresh}
        />
      </Box>
    );
  }, [
    permissions,
    route,
    navigation,
    refreshOnFocus,
    setActiveTabIndex,
    Component,
  ]);

  return (
    <>
      <ScrollHeader
        navBarProps={navBarProps}
        renderContent={renderContent}
        backgroundImage={require('img/bg-image-properties.png')}
        contentContainerStyle={{ paddingTop: 40 }}
        innerContainerStyle={{ marginTop: 240 }}
        imageContent={
          <>
            <Header
              alignSelf="center"
              alignment="center"
              transparent
              {...searchHeaderProps}
            />
            <Box mt={3} mx={2}>
              <MultiTextSwitch
                shape="circle"
                size="small"
                options={[
                  { text: 'Properties', value: 'properties', flex: 1 },
                  { text: 'Units', value: 'units', flex: 1 },
                ]}
                onSelect={(_, i) => {
                  setActiveTabIndex(i), setActiveTab(i);
                }}
              />
            </Box>
          </>
        }>
        <FAB {...fabProps} />
      </ScrollHeader>
      <FAB {...fabProps} />
      <AddPropertyModal
        isOpen={isOpenModel}
        close={closeModel}
        onAddPress={onAddPress}
      />
      {activeTab === 1 ? (
        <UnitsFiltersModal visible={isOpen} onHide={close} setFilter={noop} />
      ) : (
        <BuildingsFiltersModal
          visible={isOpen}
          onHide={close}
          setFilter={noop}
        />
      )}
    </>
  );
};

export default PropertiesTabs;
