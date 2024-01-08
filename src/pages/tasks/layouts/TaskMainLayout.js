import React from 'react';
import { Image } from 'react-native';
import useSearch from 'hooks/useSearch';
import useNotifications from 'hooks/useNotifications';
import { useIsOpen } from 'hooks/useIsOpen';
import Header from 'components/Header';
import ScrollHeader from 'components/ScrollHeader';
import MultiTextSwitch from 'components/MultiTextSwitch';
import TaskFiltersModal from 'pages/tasks/TaskFiltersModal';
import TaskSearch from './../TaskSearch';
import Box from 'components/Box';

const TaskMainLayout = ({
  navigation,
  setActiveTabIndex,
  Component,
  refreshOnFocus,
  setRefreshOnFocus,
  permissions,
}) => {
  const { unreadCount } = useNotifications();
  const {
    isOpen: displayFilters,
    open: openFilters,
    close: closeFilters,
  } = useIsOpen();
  const { headerProps: searchHeaderProps } = useSearch(
    TaskSearch,
    'TaskSearch',
    'TaskEventsTabs',
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
          onPress: () => openFilters(),
        },
        {
          icon: 'bell',
          pack: 'pm',
          badge: Math.min(unreadCount ?? 0, 99),
          onPress: () => navigation.navigate('Notifications'),
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
          navigation={navigation}
          refreshOnFocus={refreshOnFocus}
          setRefreshOnFocus={setRefreshOnFocus}
          permissions={permissions}
        />
      </Box>
    );
  }, [navigation, setActiveTabIndex, Component]);

  return (
    <ScrollHeader
      navBarProps={navBarProps}
      renderContent={renderContent}
      backgroundImage={require('img/checklist-overlay.png')}
      imageContent={
        <>
          <Header
            alignSelf="center"
            alignment="center"
            transparent
            {...searchHeaderProps}
          />
          <Box mt={20} mx={2}>
            <MultiTextSwitch
              shape="circle"
              size="small"
              options={[
                { text: 'Tasks', value: 'tasks', flex: 1 },
                { text: 'Calendar', value: 'calendar', flex: 1 },
              ]}
              onSelect={(_, i) => setActiveTabIndex(i)}
            />
          </Box>
        </>
      }>
      <TaskFiltersModal visible={displayFilters} onHide={closeFilters} />
    </ScrollHeader>
  );
};

export default TaskMainLayout;
