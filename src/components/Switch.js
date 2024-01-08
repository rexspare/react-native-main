import React from 'react';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import useTheme from 'hooks/useTheme';

const Switch = ({checked, onChange, containerStyle,circleSize=17,circleRadius=9, ...props}) => {
  const theme = useTheme();

  return (
    <SwitchToggle
      backgroundColorOn={theme['color-primary-transparent-300']}
      circleColorOn={theme['color-primary-500']}
      backgroundColorOff="#979797"
      circleColorOff="#DADADA"
      circleStyle={{
        width: circleSize,
        height: circleSize,
        borderRadius: circleRadius,
      }}
      containerStyle={{
        width: 39,
        height: 12,
        borderRadius: 20,
        padding: 0,
        ...containerStyle
      }}
      {...props}
      onPress={() => onChange(!checked)}
      switchOn={checked}
    />
  );
};

export default Switch;
