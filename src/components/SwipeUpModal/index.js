import React from 'react';
import Text from '../Text';
import Box from '../Box';
import BottomHalfModal from 'components/BottomHalfModal';
import { useIsOpen } from 'hooks/useIsOpen';

const { height } = Dimensions.get('window');
const offset = height > 800 ? 198 : 162;
const fullHeight = height - offset;

const SwipeUpModal = ({
  ...props
}) => {
  const {open, close, isOpen} = useIsOpen()

  return (
    <BottomHalfModal visible={true} onSwipeUp={open} onHide={close} {...props}>
      <Box height={isOpen ? fullHeight: 36}>
        <Text>something</Text>
      </Box>
    </BottomHalfModal>
  );
};

export default SwipeUpModal;
