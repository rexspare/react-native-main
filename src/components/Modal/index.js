import React from 'react';
import {
  Platform,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import styled from 'styled-components/native';
import { Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Box from '../Box';
import { Icon } from '@ui-kitten/components';
import { t } from 'helpers/react';
const Backdrop = styled.View`
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const dims = Dimensions.get('window');

export const X = ({ style, onPress }) => {
  return (
    <Box {...style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Icon height={18} width={18} name={'close'} />
      </TouchableWithoutFeedback>
    </Box>
  );
};

const Modal = ({
  visible,
  onHide,
  children,
  mountAlways = false,
  x,
  blurback = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(!!visible);
  const [isHidden, setIsHidden] = React.useState(false);
  const [animValue] = React.useState(new Animated.Value(+isVisible));

  const visibleFlag = props.animationType === 'slide' ? isVisible : visible;

  React.useEffect(() => {
    if (props.animationType === 'slide') {
      if (!visible && isVisible) {
        Animated.timing(animValue, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        }).start(() => {
          setIsHidden(true);
          setIsVisible(false);
        });
      }
      if (visible && !isVisible) {
        setIsVisible(true);
        setIsHidden(false);
        Animated.timing(animValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }).start();
      }
    }
  }, [animValue, isVisible, props.animationType, visible]);

  const backdropProps = React.useMemo(() => {
    return Platform.OS === 'ios'
      ? {
          as: BlurView,
          blurType: 'light',
          blurAmount: 3,
        }
      : {};
  }, []);

  return !visibleFlag && mountAlways ? (
    <Box display="none">{children}</Box>
  ) : (
    <RNModal
      visible={visibleFlag}
      animationType="fade"
      transparent
      hardwareAccelerated
      // onDismiss={onHide}
      onRequestClose={onHide}
      style={{ bottom: 10, position: 'absolute' }}
      {...props}>
      <StatusBar backgroundColor="rgba(0,0,0,0.25)" />
      {!isHidden && blurback ? (
        <Box
          as={Animated.View}
          style={{ opacity: props.animationType === 'slide' ? animValue : 1 }}
          position="absolute"
          left={0}
          top={-dims.height}
          bottom={0}
          right={0}>
          <TouchableWithoutFeedback onPress={onHide}>
            <Backdrop {...backdropProps} />
          </TouchableWithoutFeedback>
        </Box>
      ) : null}
      {t(x, <X style={props?.styles?.close} onPress={onHide} />)}
      {children}
    </RNModal>
  );
};

export default Modal;
