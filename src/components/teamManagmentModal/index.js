import React from 'react';
import { ScrollView } from 'react-native';
import FullPageBottomModal from 'components/FullPageBottomModal';
import { chain } from 'helpers/func';
import { typography } from 'styles/typography';

const TeamManagement = ({
  visible,
  onHide,
  setFilter,
  children,
  headerRight,
  styles = {
    headerTxt: {
      ...typography['body/large – Bold'],
      textTransform: 'uppercase',
    },
  },
  button,
  ...props
}) => {
  const onDone = chain([setFilter, onHide]);

  return (
    <FullPageBottomModal
      styles={styles}
      onHide={onDone}
      visible={visible}
      headerRight={headerRight}
      displayDone={false}
      modalHeight={props.search ? 430 : 500}
      {...props}>
      <ScrollView>{children}</ScrollView>
      {button}
    </FullPageBottomModal>
  );
};

export default TeamManagement;
