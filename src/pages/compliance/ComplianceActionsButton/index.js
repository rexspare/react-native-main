import React, { useCallback } from 'react';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import BottomHalfContextMenu from 'components/ContextMenu/BottomHalfContextMenu';
import Button from 'components/Button';
import { TASK_PRIORITY, TASK_STATUSES } from 'constants/enums';
import { typography } from 'styles/typography';

const ComplianceActionsButton = ({ navigation, entity, prefix }) => {
  const { isOpen, open, close } = useIsOpen();

  const handleCreateTask = () => {
    navigation.navigate('EditTask', {
      initialValues: {
        title: `${prefix} #${entity?.idInSupplier}`,
        status: TASK_STATUSES.TO_DO,
        priority: TASK_PRIORITY.HIGH,
        building: entity?.building,
      },
    });
    close
  }

  const handleAddReminder = useCallback(() => {
    navigation.navigate('EditTask')
    close
  }, [])

  return (
    <Box px={20} py={20}>
      <Button
        as={Button}
        onPress={open}
        style={{ borderRadius: 12 }}
        textStyle={{
          ...typography['buttons/large'],
          textTransform: 'uppercase',
        }}
        size="large"
        theme={'bordered_clear'}>
        Actions
      </Button>
      <BottomHalfContextMenu
        visible={isOpen}
        onHide={close}
        title={'Actions'}
        displayDone={false}
        doneText=""
        menuItems={[
          { icon: 'task', label: 'Create A Task', onPress: handleCreateTask },
          { icon: 'time', label: 'Add reminder', onPress: handleAddReminder },
        ]}
      />
    </Box>
  );
};

export default ComplianceActionsButton;
