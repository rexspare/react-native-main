import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import useFab from 'hooks/useFab';
import { useTabs } from 'hooks/useTabs';
import { useIsOpen } from 'hooks/useIsOpen';
import { PERMISSION_SECTIONS, usePermissions } from 'hooks/usePermissions';
import FAB from 'components/FAB';
import TaskListRoot from '../TaskListRoot';
import Events from '../Events';
import AddTaskModal from '../AddTaskModal';
import TaskMainLayout from '../layouts/TaskMainLayout';

export const TASK_LIST_ROOT = 'TaskListRoot';
export const CALENDAR = 'Calendar';

const tabs = [{ TaskEventsList: TaskListRoot }, { TaskEventsList: Events }];

const TaskEventsTabs = ({ navigation }) => {
  const [refreshOnFocus, setRefreshOnFocus] = useState(null);
  const { isOpen, close, open } = useIsOpen();

  const { TaskEventsList, setActiveTabIndex, activeTabIndex } = useTabs(tabs);

  const permissions = usePermissions(PERMISSION_SECTIONS.TASKS);
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
    <>
      <TaskMainLayout
        Component={TaskEventsList}
        navigation={navigation}
        setActiveTabIndex={setActiveTabIndex}
        activeTabIndex={activeTabIndex}
        refreshOnFocus={refreshOnFocus}
        setRefreshOnFocus={setRefreshOnFocus}
        permissions={permissions}
      />
      <FAB {...fabProps} />
      <AddTaskModal isOpen={isOpen} close={close} onAddPress={onAddPress} />
    </>
  );
};

export default TaskEventsTabs;