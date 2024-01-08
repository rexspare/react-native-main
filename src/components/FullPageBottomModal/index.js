import React from 'react';
import { Dimensions } from 'react-native';
import BottomHalfModal from 'components/BottomHalfModal';
import Box from 'components/Box';

const { height } = Dimensions.get('window');
const offset = height > 800 ? 198 : 162;

const FullPageBottomModal = ({ children, isOther, modalHeight, ...props }) => {
  return (
    <BottomHalfModal {...props}>
      <Box height={modalHeight ?? height - offset}>{children}</Box>
    </BottomHalfModal>
  );
};

export default FullPageBottomModal;
