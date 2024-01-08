import React from 'react';
import { ScrollView } from 'react-native';
import FullPageBottomModal from 'components/FullPageBottomModal';
import { chain } from 'helpers/func';
import { typography } from 'styles/typography';

const FiltersModal = ({
  visible,
  onHide,
  setFilter,
  children,
  headerRight,
  absoluteStyles,
  styles = {
    headerTxt: {
      ...typography['body/large – Bold'],
      textTransform: 'uppercase',
    },
  },
  button,
  modalHeight,
  ...props
}) => {
  const onDone = chain([setFilter, onHide]);
  return (
    <FullPageBottomModal
      styles={styles}
      absoluteStyles={absoluteStyles}
      title={'Filters'}
      onHide={onDone}
      visible={visible}
      headerRight={headerRight}
      modalHeight={modalHeight}
      {...props}>
      <ScrollView>{children}</ScrollView>
      {button}
    </FullPageBottomModal>
  );
};

export default FiltersModal;
