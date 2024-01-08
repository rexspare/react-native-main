import React from 'react';
import styled from 'styled-components/native';
// import {DrawerProgressContext} from 'react-navigation-drawer';
import Animated from 'react-native-reanimated';

import useTheme from 'hooks/useTheme';
import { StatusBar } from 'react-native';
import { DrawerProgressContext } from './Drawer';
import Box from 'components/Box';
import ThemedGradient from 'components/ThemedGradient';

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
  }
  throw new Error('Bad Hex');
}

const Background = styled(Animated.View)`
  flex: 1;
  /* background-color: ${({ theme }) => theme['color-primary-gradient-2']}; */
  position: relative;
`;

const Wrapper = styled(Animated.View)`
  background-color: ${({ theme }) => theme['background-basic-color-1']}
  height: 100%;
  overflow: hidden;
  flex: 1;
  /* elevation: 10;
  shadow-opacity: 0.1;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 1}; */
`;

const DrawerScreen = ({ children, ...props }) => {
  const theme = useTheme();
  const { progress } = React.useContext(DrawerProgressContext);

  const animatedStyles = React.useMemo(() => {
    const closedBackground = hexToRgbA(theme['color-primary-gradient-1']).slice(
      0,
      3,
    );

    // const height = Animated.interpolate(progress, {
    //   inputRange: [0, 1],
    //   outputRange: [100, 90],
    // });
    // const top = Animated.divide(Animated.sub(100, height), 2);

    return {
      // backgroundColor: Animated.color(
      //   ...closedBackground,
      //   Animated.interpolate(progress, {
      //     inputRange: [0, 1],
      //     outputRange: [1, 0],
      //   }),
      // ),
      borderRadius: Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 30],
      }),
      scale: Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.86],
      }),
      // height: Animated.concat(height, '%'),
      // left: Animated.interpolate(progress, {
      //   inputRange: [0, 1],
      //   outputRange: [0, 12],
      // }),
      // top: Animated.concat(top, '%'),
    };
  }, [progress, theme]);

  return (
    <Background>
      <StatusBar barStyle="dark-content" />
      <Background
        style={
          {
            // backgroundColor: animatedStyles.backgroundColor,
          }
        }>
        <Box
          flex={1}
          as={ThemedGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}>
          <Wrapper
            style={{
              transform: [
                {
                  scale: animatedStyles.scale,
                },
              ],
              borderRadius: animatedStyles.borderRadius,
            }}>
            {children}
          </Wrapper>
        </Box>
      </Background>
    </Background>
  );
};

export default DrawerScreen;

export const withDrawerScreen = Screen => {
  function WithDrawerScreen(props) {
    return (
      <DrawerScreen>
        <Screen />
      </DrawerScreen>
    );
  }
  return WithDrawerScreen;
};
