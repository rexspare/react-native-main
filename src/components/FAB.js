import React from 'react';
import Box from './Box';
import { Button } from '@ui-kitten/components';
import Icon from './Icon';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const ShadowBox = styled(Box)`
  background-color: ${({ theme }) => theme['background-basic-color-1']};
  border: 1px solid #36796f;
`;

const FAB = ({ size = 60, icon = 'plus', onPress, style, disabled }) => {
  const iconSize = size * 0.55;
  return (
    <ShadowBox
      position="absolute"
      as={Animated.View}
      style={style}
      pointerEvents={disabled ? 'box-none' : null}
      bottom={15}
      right={30}
      size={size}
      borderRadius={size / 2}>
      <Button
        size="large"
        shape="circle"
        appearance="ghost"
        onPress={onPress}
        disabled={disabled}
        icon={style =>
          Icon(icon)({
            ...style,
            width: iconSize,
            height: iconSize,
            position: 'relative',
            right: 1,
          })
        }
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </ShadowBox>
  );
};

export default FAB;
