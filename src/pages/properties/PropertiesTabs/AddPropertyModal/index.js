import React from 'react';
import BottomHalfModal from 'components/BottomHalfModal';
import Row from 'components/Row';
import ThemedButton from 'components/Button/ThemedButton';

const AddPropertyModal = ({ isOpen, onAddPress, close }) => {
  return (
    <BottomHalfModal
      visible={isOpen}
      onHide={close}
      displayDone={false}
      title={'Add Building Or Unit'}
      styles={styles.modal}>
      <Row justifyContent={'center'} mt={40}>
        <ThemedButton
          theme={'bordered_clear'}
          onPress={() => onAddPress('AddBuilding')}
          children={'Building'}
          containerStyle={styles.btnContainer}
        />
        <ThemedButton
          theme={'bordered_clear'}
          onPress={() => onAddPress('EditUnit')}
          children={'Unit'}
          containerStyle={styles.btnContainer}
        />
      </Row>
    </BottomHalfModal>
  );
};

const styles = {
  modal: {
    headerTxt: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    content: {
      paddingBottom: 10,
      paddingTop: 40,
    },
  },
  btnContainer: {
    flex: 0.5,
    marginHorizontal: 7,
  },
};

export default AddPropertyModal;
