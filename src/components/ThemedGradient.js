import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import useTheme from 'hooks/useTheme';

const ThemedGradient = props => {
  const theme = useTheme();

  const colors = [
    theme?.['color-primary-gradient-1'],
    theme?.['color-primary-gradient-2'],
  ];

  return <LinearGradient colors={colors} {...props} />;
};

export default ThemedGradient;
