import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { styled as ukStyled } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import Box from './Box';
import Text from './Text';
import styled from 'styled-components/native';
import { typography } from 'styles/typography';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

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

export const SwitchBackground = styled(Animated.View)`
  shadow-opacity: 0.03;
  shadow-radius: 0.1;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 2;
  z-index: 1;
  position: absolute;
  top: -1;
  /* width: ${({ count }) => `${100 / count}%`}; */
  transform: ${({ count, value }) =>
    `translateX(${
      value === 0 || value === false
        ? '-1px'
        : value === count - 1
        ? '1px'
        : '0px'
    })`};
`;

export const SubSwitch = styled(Box)`
  /* flex: 1; */
  align-items: center;
  justify-content: center;
  z-index: 2;
  elevation: 3;
`;

const MultiTextSwitch = ({
  style,
  themedStyle,
  textStyle,
  value,
  onSelect,
  shape,
  options = [],
  textColor,
  ...props
}) => {
  const theme = useTheme();
  const [switchValue, setSwitchValue] = useState(value || 0);
  const [switchAnimatedValue] = React.useState(
    new Animated.Value(+switchValue),
  );
  const [activeColor, setActiveColor] = useState('');

  React.useEffect(() => {
    if (value !== undefined && value !== switchValue) {
      setSwitchValue(+value);
    }
  }, [value, switchValue]);

  React.useEffect(() => {
    Animated.timing(switchAnimatedValue, {
      toValue: +switchValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
    /* eslint-disable-next-line */
  }, [switchValue]);

  const onSelectProxy = React.useCallback(
    (i, color) => {
      setSwitchValue(i);
      if (onSelect) {
        onSelect(options[i], i);
        if (color) {
          setActiveColor(color);
        }
      }
    },
    [onSelect, options],
  );

  const componentStyles = React.useMemo(() => {
    const {
      textColor,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      switchTextColor,
      switchBackgroundColor,
      paddingVertical,
      paddingHorizontal,
      ...containerParameters
    } = themedStyle;

    return {
      container: containerParameters,
      switchContainer: {
        backgroundColor: switchBackgroundColor,
        paddingVertical,
        paddingHorizontal,
      },
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  }, [themedStyle]);

  const animatedStyles = React.useMemo(() => {
    if (options.length == 1) {
      return { width: '100%', textColor: () => '#fff' };
    }
    const optionWeight = i =>
      options
        .filter((o, i2) => i2 < i)
        .reduce((sum, o2) => sum + (o2.flex || o2.text.length + 8), 0);
    const totalWeights = optionWeight(options.length);

    return {
      textColor: index =>
        Animated.color(
          ...[0, 1, 2].map(c =>
            Animated.round(
              Animated.interpolate(switchAnimatedValue, {
                inputRange: [...Array(options.length).keys()],
                outputRange: options.map(
                  (o, i) =>
                    hexToRgbA(
                      index === i
                        ? style?.activeTextColor ??
                            theme['color-control-default']
                        : '#131F1E',
                    )[c],
                ),
              }),
            ),
          ),
        ),
      backgroundColor: Animated.color(
        ...[0, 1, 2].map(c =>
          Animated.round(
            Animated.interpolate(switchAnimatedValue, {
              inputRange: [...Array(options.length).keys()],
              outputRange: options.map(
                o =>
                  hexToRgbA(
                    '#ff0000' || o.color || '#ff0000' || theme['primary/50'],
                  )[c],
              ),
            }),
          ),
        ),
      ),
      shadowColor: options?.[switchValue]?.color || theme['primary/10'],
      left: Animated.concat(
        Animated.interpolate(switchAnimatedValue, {
          inputRange: [...Array(options.length).keys()],
          outputRange: options.map((o, i) =>
            options.length > 1
              ? (optionWeight(i) * 100) / totalWeights
              : (i * 100) / options.length,
          ),
        }),
        '%',
      ),
      width: Animated.concat(
        Animated.interpolate(switchAnimatedValue, {
          inputRange: [...Array(options.length).keys()],
          outputRange: options.map((o, i) =>
            options.length > 1
              ? ((o.flex || o.text.length + 8) * 100) / totalWeights
              : 100 / options.length,
          ),
        }),
        '%',
      ),
    };
  }, [options, switchAnimatedValue, switchValue, theme]);

  const onSwipe = (gestureName, gestureState) => {
    if (gestureState.dx > 0) {
      if (switchValue + 1 < options.length - 1) {
        setSwitchValue(switchValue + 1);
        onSelectProxy(switchValue + 1, options[switchValue + 1]?.color);
      } else if (switchValue + 1 === options.length - 1) {
        setSwitchValue(switchValue + 1);
        onSelectProxy(switchValue + 1, options[switchValue + 1]?.color);
      }
    }

    if (gestureState.dx < 0) {
      if (switchValue - 1 > 0) {
        setSwitchValue(switchValue - 1);
        onSelectProxy(switchValue - 1, options[switchValue - 1]?.color);
      } else if (switchValue - 1 === 0) {
        setSwitchValue(0);
        onSelectProxy(0, options[0]?.color);
      }
    }
  };


  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      >
      <Box
        flexDirection="row"
        position="relative"
        style={[
          componentStyles.container,
          { height: 33, borderRadius: 12 },
          style,
        ]}>
        <SwitchBackground
          count={options.length}
          value={switchValue}
          style={[
            componentStyles.container,
            componentStyles.switchContainer,
            {
              borderWidth: 0,
              backgroundColor: !!activeColor
                ? activeColor
                : theme['primary/50'],
              shadowColor: animatedStyles?.shadowColor,
              left: animatedStyles?.left,
              width: animatedStyles?.width,
              height: 33,
              borderRadius: 12,
              ...style?.switchBackground,
            },
          ]}
        />
        {options.map((option, i) => (
          <SubSwitch
            flex={option.flex || option.text.length + 8}
            as={TouchableOpacity}
            activeOpacity={1}
            onPress={() => onSelectProxy(i, option?.color)}
            key={option.key || i}>
            <Box flex={1} alignItems="stretch" justifyContent="center">
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                textAlign="center"
                as={Animated.Text}
                style={[
                  i === switchValue
                    ? componentStyles.onSwitchText
                    : componentStyles.offSwitchText,
                  textStyle,
                  {
                    ...typography.multipleSwitchText,
                    color: animatedStyles?.textColor(i),
                    fontSize: 14,
                  },
                  i === switchValue && textColor,
                ]}>
                {option.text}
              </Text>
            </Box>
          </SubSwitch>
        ))}
      </Box>
    </GestureRecognizer>
  );
};

MultiTextSwitch.styledComponentName = 'TextSwitch';

export default ukStyled(MultiTextSwitch);
