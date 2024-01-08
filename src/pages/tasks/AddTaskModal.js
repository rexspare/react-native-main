import React from 'react';
import BottomHalfModal from 'components/BottomHalfModal';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';

const styles = {
  headerTxt: { fontWeight: 'bold', fontSize: 15, fontFamily: 'Roboto' },
  buttonStyle: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  buttonTextStyle: {
    color: colors['color-grey-90'],
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
};

export default AddTasksModal = ({ isOpen, close, onAddPress }) => {
  return (
    <BottomHalfModal
      visible={isOpen}
      onHide={close}
      title="ADD NEW"
      displayDone={false}
      styles={{
        headerTxt: styles.headerTxt,
      }}
      buttons={[
        {
          children: 'TASK',
          icon: Icon('addTasks', 'pm'),
          shape: 'rounded',
          activeOpacity: 0.7,
          onPress: () => onAddPress('EditTask'),
          style: styles.buttonStyle,
          textStyle: styles.buttonTextStyle,
        },
        {
          children: 'APPOINTMENT',
          icon: Icon('appointment', 'pm'),
          shape: 'rounded',
          activeOpacity: 0.7,
          onPress: () => onAddPress('EditEvent'),
          style: styles.buttonStyle,
          textStyle: styles.buttonTextStyle,
        },
      ]}
    />
  );
};
