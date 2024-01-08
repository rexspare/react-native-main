import React from 'react';
import { Modal } from '@ui-kitten/components';
import Box from 'components/Box';
import { BlurView } from '@react-native-community/blur';
import { TouchableWithoutFeedback } from 'react-native';
import { styles } from './style';
import WhiteCard from 'components/Cards/WhiteCard';

const AltModal = ({
  visible,
  onHide,
  children,
  contentContainerProps,
  ...props
}) => {
  return (
    <Modal
      visible={visible}
      onBackdropPress={onHide}
      backdropStyle={styles.backdrop}
      animationType="slide"
      {...props}>
      <TouchableWithoutFeedback onPress={onHide}>
        <Box as={BlurView} blurType="light" style={styles.blur} blurAmount={3}>
          <Box
            height={'100%'}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}>
            <WhiteCard
              p={3}
              borderRadius={12}
              maxHeight={'50%'}
              maxWidth={'75%'}
              {...contentContainerProps}>
              {children}
            </WhiteCard>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AltModal;
