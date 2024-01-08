import React from 'react';
import {Animated, Easing} from 'react-native';

const initialValue = {
  visible: false,
  props: {},
};

export const FABContext = React.createContext(initialValue);

const FABProvider = props => {
  const [visible, setVisible] = React.useState(initialValue.visible);
  const [fabProps, setProps] = React.useState(initialValue.props);
  const [opacityValue] = React.useState(
    new Animated.Value(+!!initialValue.visible),
  );

  React.useEffect(() => {
    Animated.timing(opacityValue, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      toValue: +!!visible,
    }).start();
  }, [opacityValue, visible]);

  const value = React.useMemo(
    () => ({
      props: {
        ...(fabProps ?? {}),
        style: {
          ...(fabProps?.style ?? {}),
          opacity: opacityValue,
        },
        disabled: !visible,
      },
      setVisible,
      setProps,
    }),
    [fabProps, opacityValue, visible],
  );

  return <FABContext.Provider {...props} value={value} />;
};

export default FABProvider;
