import { Dimensions } from 'react-native';
import React from 'react';
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import { useIsOpen } from 'hooks/useIsOpen';
import Box from 'components/Box';
import FullPageBottomModal from 'components/FullPageBottomModal';
import StyledLine from 'components/StyledLine';
import { styles } from 'components/BottomHalfModal/styles';

const { width } = Dimensions.get('window');
const DragUpBottomModal = ({
  children,
  closedContent,
  openedHeader,
  closedContentProps,
  style,
  ...props
}) => {
  const { isOpen, close, open } = useIsOpen();
  return (
    <>
      <Box
        position={'absolute'}
        bottom={0}
        zIndex={7}
        backgroundColor={'#fff'}
        minHeight={90}
        borderTopRightRadius={18}
        borderTopLeftRadius={18}
        style={{
          shadowOpacity: 0.18,
          shadowRadius: 10,
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 1 },
          ...style,
        }}
        {...props}>
        <FlingGestureHandler
          direction={Directions.UP}
          onHandlerStateChange={open}>
          <Box justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <StyledLine style={styles.styledLineTop} />
            <Box {...closedContentProps} px={1} width={width}>
              {closedContent}
            </Box>
          </Box>
        </FlingGestureHandler>
      </Box>
      <FullPageBottomModal visible={isOpen} onHide={close} title={openedHeader}>
        {children}
      </FullPageBottomModal>
    </>
  );
};

export default DragUpBottomModal;
