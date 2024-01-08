import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Animated from 'react-native-reanimated';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Layout } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import Header from 'components/Header';
import SafeAreaView from 'components/SafeAreaView';
import FocusedStatusBar from 'components/FocusedStatusBar';
import ParallaxHeader from 'components/ParallaxHeader';

const dims = Dimensions.get('window');

const ScrollHeader = ({
  navBarProps,
  renderContent,
  children,
  backgroundImage,
  imageContent,
  isDrawer = true,
  ...props
}) => {
  const theme = useTheme();
  const [scrollY] = React.useState(new Animated.Value(0));
  const maxHeight = 280;

  const isDrawerOpen = isDrawer && useIsDrawerOpen();

  Animated.useCode(
    () => [
      Animated.onChange(scrollY, [
        Animated.call([scrollY], ([scrollY]) => {
          const shouldBeDark = scrollY >= maxHeight / 2;
          StatusBar.setBarStyle(
            shouldBeDark ? 'dark-content' : 'light-content',
            true,
          );
        }),
      ]),
    ],
    [maxHeight],
  );

  const renderNavBar = React.useCallback(
    () => (
      <Box
        mt={10}
        as={SafeAreaView}
        forceInset={{ top: 'always' }}
        flex={1}
        backgroundColor={theme['background-basic-color-1']}
        pointerEvents="box-none"
        divider={false}>
        <Header {...navBarProps} />
      </Box>
    ),
    [navBarProps, theme],
  );

  const renderHeaderContent = React.useCallback(() => {
    return (
      <Box
        mt={10}
        as={SafeAreaView}
        forceInset={{ top: 'always' }}
        flex={1}
        pointerEvents="box-none">
        <Header {...navBarProps} transparent status="control" divider={false} />
      </Box>
    );
  }, [navBarProps]);

  return (
    <Box as={Layout} flex={1} height={isDrawerOpen ? dims.height : null}>
      <FocusedStatusBar barStyle="light-content" animated />
      <ParallaxHeader
        headerMinHeight={100}
        headerMaxHeight={maxHeight}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        extraScrollHeight={0}
        title={renderHeaderContent()}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        animatedValue={scrollY}
        backgroundImage={backgroundImage}
        contentContainerStyle={props.contentContainerStyle}
        innerContainerStyle={props.innerContainerStyle}
      />
      <Box
        as={Animated.View}
        pointerEvents="box-none"
        position="absolute"
        left={0}
        right={0}
        pt={"26%"}
        height={maxHeight}
        style={{
          transform: [
            {
              translateY: Animated.interpolate(scrollY, {
                inputRange: [0, maxHeight],
                outputRange: [0, -maxHeight],
              }),
            },
          ],
          opacity: Animated.interpolate(scrollY, {
            inputRange: [0, maxHeight / 2, maxHeight * 0.75],
            outputRange: [1, 0.6, 0],
          }),
        }}>
        <Box
          as={Animated.View}
          width={1}
          alignSelf="center"
          my={1}
          style={{
            opacity: Animated.interpolate(scrollY, {
              inputRange: [0, maxHeight * 0.1],
              outputRange: [1, 0],
            }),
          }}>
          {imageContent}
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default ScrollHeader;
