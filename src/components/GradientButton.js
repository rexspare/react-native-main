import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button, styled} from '@ui-kitten/components';
import ThemedGradient from './ThemedGradient';
import useTheme from 'hooks/useTheme';
import Box from './Box';

const styles = StyleSheet.create({
  gradient: {
    borderWidth: 0,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shadowContainer: {
    shadowColor: '#000',
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minWidth: 0,
    minHeight: 0,
  },
  buttonText: {
    textTransform: 'uppercase',
  },
});

function GradientButton({
  style,
  buttonStyle,
  disabled,
  shadow = true,
  containerStyle,
  ...props
}) {
  const theme = useTheme();
  const eventProps = {};
  Object.keys(props)
    .filter(k => k.indexOf('on') === 0)
    .forEach(k => (eventProps[k] = props[k]));
  return (
    <Box style={[shadow && styles.shadowContainer, containerStyle] }>
      <TouchableOpacity
        {...eventProps}
        disabled={disabled}
        activeOpacity={0.9}
        style={{opacity: disabled ? 0.6 : 1}}>
        <ThemedGradient
          style={[props.themedStyle, styles.gradient, style]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View pointerEvents="none">
            <Button
              {...props}
              style={[props.themedStyle, styles.button]}
              textStyle={styles.buttonText}
            />
          </View>
        </ThemedGradient>
      </TouchableOpacity>
    </Box>
  );
}

GradientButton.propTypes = Button.propTypes;
GradientButton.styledComponentName = 'Button';

export default styled(GradientButton);
