import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {styled} from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  switchBackground: {
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    elevation: 2,
    zIndex: 1,
    position: 'absolute',
    left: -1,
    top: -1,
    width: '50%',
  },
  switchBackgroundOn: {
    left: '50%',
  },
  subSwitch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 3,
  },
});

const TextSwitch = ({
  style,
  themedStyle,
  textStyle,
  value,
  onToggle,
  offText,
  onText,
}) => {
  const [switchValue, setSwitchValue] = React.useState(value || false);
  const [width, setWidth] = React.useState(null);
  const [switchAnimatedValue] = React.useState(
    new Animated.Value(+switchValue),
  );

  React.useEffect(() => {
    if (value !== undefined && !!value !== !!switchValue) {
      setSwitchValue(!!value);
    }
  }, [value, switchValue]);

  React.useEffect(() => {
    Animated.timing(switchAnimatedValue, {
      toValue: +switchValue,
      duration: 200,
    }).start();
    /* eslint-disable-next-line */
  }, [switchValue]);

  const onLayout = React.useCallback(
    event => setWidth(event.nativeEvent.layout.width),
    [],
  );

  const onToggleProxy = React.useCallback(() => {
    if (onToggle) {
      onToggle(!switchValue);
    }
    setSwitchValue(val => !val);
  }, [onToggle, switchValue]);

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
        left: switchAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-1, 1],
        }),
        transform:
          width !== null
            ? [
                {
                  translateX: switchAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width / 2],
                  }),
                },
              ]
            : [],
      },
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        // height: textLineHeight * 0.85,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
      offSwitchText: {
        color: switchAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [switchTextColor, textColor],
        }),
      },
      onSwitchText: {
        color: switchAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [textColor, switchTextColor],
        }),
      },
    };
  }, [switchAnimatedValue, themedStyle, width]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onToggleProxy}>
      <View
        style={[styles.container, componentStyles.container, style]}
        onLayout={onLayout}>
        <Animated.View
          style={[
            styles.switchBackground,
            !!switchValue && styles.switchBackgroundOn,
            componentStyles.container,
            componentStyles.switchContainer,
          ]}
        />
        <View style={styles.subSwitch}>
          <Animated.Text
            style={[
              componentStyles.text,
              componentStyles.offSwitchText,
              textStyle,
            ]}>
            {offText}
          </Animated.Text>
        </View>
        <View style={styles.subSwitch}>
          <Animated.Text
            style={[
              componentStyles.text,
              componentStyles.onSwitchText,
              textStyle,
            ]}>
            {onText}
          </Animated.Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

TextSwitch.styledComponentName = 'TextSwitch';

export default styled(TextSwitch);
