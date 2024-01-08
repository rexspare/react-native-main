import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Icon, Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Text from 'components/Text';
import { chain } from 'helpers/func';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const BarBox = styled(Animated.View)`
  position: absolute;
  left: ${({ isPointTab }) => (isPointTab ? 25 : 0)};
  top: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
`;
const BarText = styled(Text)`
  color: ${({ active, absolute, theme }) =>
    active || absolute ? colors['primary/80'] : colors['gray scale/90']};
  text-transform: uppercase;
`;

const Dot = styled(Box)`
  width: 5;
  height: 5;
  background-color: ${({ theme }) => theme['color-primary-500']};
  border-radius: 5;
  position: absolute;
  bottom: 5;
`;
const TabIndexView = styled.View`
  background-color: ${({ theme, dark }) =>
    dark ? theme['color-primary-500'] : colors['gray scale/10']};
  border-color: ${({ theme, dark }) =>
    dark ? theme['color-primary-500'] : colors['gray scale/10']};
  border-radius: 25;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  margin-right: 1.6;
`;
const PointText = styled(Text)`
  color: ${({ dark }) => (dark ? '#FFFFFF' : colors['gray scale/90'])};
`;

const TopTab = React.forwardRef(
  (
    {
      isPointTab = false,
      isUnderline = false,
      wrapperProps,
      state,
      descriptors,
      navigation,
      position,
      children,
      onPress,
      onRouteChange,
      disableOnPress = false,
      disableAutoScrolling=false
    },
    ref,
  ) => {
    const scrollViewRef = useRef(null);
    const [finishedTabIndex, setFinishedTabIndex] = React.useState(0);
    React.useImperativeHandle(
      ref,
      () => ({ position, route: state.routeNames?.[state.index] }),
      [position, state.index, state.routeNames],
    );
    useEffect(() => {
      if (finishedTabIndex < state?.index) setFinishedTabIndex(state?.index);
    }, [state]);

    const onSelect = React.useCallback(
      index => {
        const selectedTabRoute = state?.routeNames[index];
        navigation.navigate(selectedTabRoute);
      },
      [navigation, state],
    );

    useEffect(() => {
      onRouteChange && onRouteChange(state);
      if(wrapperProps && (scrollViewRef && !disableAutoScrolling)){
        state?.index > 2 && scrollViewRef?.current?.scrollToEnd({ animated: false });
        state?.index < 2 && scrollViewRef?.current?.scrollTo({x:0, y:0, animated: false });
      }
    }, [state?.index, scrollViewRef]);

    const tabSize = 100 / state.routes.length;

    const [tabSizes, setTabSizes] = React.useState(
      [...Array(state.routes.length).keys()].map(() => null),
    );

    const setTabSize = React.useCallback(i => {
      return event => {
        const width = event.nativeEvent.layout.width;
        if (width) {
          setTabSizes(sizes => [
            ...sizes.slice(0, i),
            width,
            ...sizes.slice(i + 1),
          ]);
        }
      };
    }, []);

    return (
      <Box
        style={{ borderBottomWidth: 1, borderColor: colors['gray scale/10'] }}>
        <Box
          as={Layout}
          flexDirection="row"
          alignItems="center"
          justifyContent={
            isPointTab || isUnderline ? 'center' : 'space-between'
          }
          mx="5px">
          <Box
            flexDirection="row"
            alignItems="center"
            {...wrapperProps}
            ref={scrollViewRef}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              const labelIndex = options.index ?? '';
              return (
                <Box
                  as={TouchableOpacity}
                  key={route.key}
                  px={10}
                  py={10}
                  flexDirection={isPointTab ? 'row' : 'column'}
                  justifyContent={isPointTab ? 'space-between' : 'flex-start'}
                  alignItems="center"
                  onLayout={setTabSize(index)}
                  activeOpacity={0.6}
                  onPress={chain([
                    () => !disableOnPress && onSelect(index),
                    onPress && (() => onPress(route)),
                  ])}>
                  {isPointTab && (
                    <TabIndexView
                      dark={index == finishedTabIndex}
                      style={
                        index < finishedTabIndex && [
                          { backgroundColor: colors['primary/20'] },
                        ]
                      }>
                      {index < finishedTabIndex && (
                        <Icon
                          name={'tick'}
                          pack={'pm'}
                          height={10}
                          width={10}
                        />
                      )}
                      {index >= finishedTabIndex && (
                        <PointText
                          dark={finishedTabIndex === index ? true : false}
                          style={{ ...typography['body/small – regular'] }}>
                          {labelIndex}
                        </PointText>
                      )}
                    </TabIndexView>
                  )}
                  <BarText
                    style={[
                      { ...typography['body/medium – regular'] },
                      index == finishedTabIndex && {
                        color: colors['primary/50'],
                      },
                      index < finishedTabIndex && {
                        color: colors['gray scale/90'],
                      },
                    ]}>
                    {label}
                  </BarText>
                  {index !== state.routes.length - 1 && (
                    <Box
                      style={{
                        height: 2,
                        width: 15,
                        right: -8,
                        backgroundColor: colors['gray scale/10'],
                      }}
                    />
                  )}
                </Box>
              );
            })}
            {!isPointTab && !isUnderline && (
              <Dot
                as={Animated.View}
                style={{
                  left:
                    state.routes.length > 1
                      ? Animated.interpolate(position, {
                          inputRange: [...Array(state.routes.length).keys()],
                          outputRange: [
                            ...Array(state.routes.length).keys(),
                          ].map(i =>
                            tabSizes.every(a => !!a)
                              ? tabSizes.reduce(
                                  (acc, curr, idx) =>
                                    acc +
                                    (idx === i ? curr / 2 : idx < i ? curr : 0),
                                  0,
                                )
                              : (0.5 + i) * tabSize,
                          ),
                        })
                      : tabSizes[0] / 2,
                  opacity: +tabSizes.every(a => !!a),
                }}
              />
            )}
          </Box>
          {children}
        </Box>
      </Box>
    );
  },
);

export default TopTab;
