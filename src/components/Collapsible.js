import React from 'react';
import {Platform} from 'react-native';
import RNCollapsible from 'react-native-collapsible';
import Box from './Box';

export default function Collapsible({
  collapsed,
  children,
  disableAndroid = false,
  ...props
}) {
  return Platform.OS === 'ios' || !disableAndroid ? (
    <RNCollapsible {...props} collapsed={collapsed} children={children} />
  ) : (
    <Box
      {...props}
      children={children}
      height={collapsed ? 0 : props.height}
      overflow={collapsed ? 'hidden' : props.overflow}
      cursor="pointer"
    />
  );
}
