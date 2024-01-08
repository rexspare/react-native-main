import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
import HeadedScreen from 'components/HeadedScreen';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Box from 'components/Box';
import useFab from 'hooks/useFab';
import Events from 'pages/tasks/Events';
import TaskList from 'pages/tasks/TaskList';
import TaskFiltersModal from 'pages/tasks/TaskFiltersModal';
import FAB from 'components/FAB';
import AddTaskModal from '../AddTaskModal';
import { PERMISSION_SECTIONS, usePermissions } from 'hooks/usePermissions';
import { useTabs } from 'hooks/useTabs';
import { getActions } from 'constants/actions';
import { useIsOpen } from 'hooks/useIsOpen';
import { typography } from 'styles/typography';

const tabs = [{ TaskEventsList: TaskList }, { TaskEventsList: Events }];
const TaskListMainLayout = ({ navigation, route }) => {
  const permissions = usePermissions(PERMISSION_SECTIONS.TASKS);
  const { TaskEventsList, setActiveTabIndex, activeTabIndex } = useTabs(tabs);
  const { isOpen, close, open } = useIsOpen();
  const {
    isOpen: displayFilters,
    open: openFilters,
    close: closeFilters,
  } = useIsOpen();
  const canAdd = permissions?.create;
  const fabContext = useFab();
  const { props: fabProps } = fabContext;

  useFocusEffect(
    React.useCallback(() => {
      fabContext.setProps({
        onPress: canAdd ? open : null,
      });
      fabContext.setVisible(canAdd);
    }, [canAdd, activeTabIndex]),
  );

  const onAddPress = route => {
    close();
    navigation.navigate(route, {
      goBack: () => navigation.navigate('TaskEventsTabs'),
    });
  };

  return (
    <HeadedScreen
      headerMode="none"
      actions={getActions(
        ['back', { onPress: () => navigation.goBack() }],
        ['filterBlack', { onPress: openFilters }],
        ['export', { onPress: () => {} }],
      )}
      title={route?.params?.categoryName?.toUpperCase() ?? 'Tasks'}
      headerStyle={{
        container: {
          backgroundColor: 'transparent',
          paddingHorizontal: 16,
        },
        title: { ...typography['body/large – Bold'] },
      }}>
      <MultiTextSwitch
        shape="circle"
        size="small"
        options={[
          { text: 'Tasks', value: 'tasks', flex: 1 },
          { text: 'Calendar', value: 'calendar', flex: 1 },
        ]}
        onSelect={(_, i) => setActiveTabIndex(i)}
        style={{
          width: '91%',
          marginHorizontal: '4.5%',
        }}
      />
      <TaskEventsList navigation={navigation} route={route} />
      <FAB {...fabProps} />
      <AddTaskModal isOpen={isOpen} close={close} onAddPress={onAddPress} />
      <TaskFiltersModal visible={displayFilters} onHide={closeFilters} />
    </HeadedScreen>
  );
};

export default TaskListMainLayout;
