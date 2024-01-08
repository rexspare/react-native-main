import React from 'react';
import {Platform} from 'react-native';
// import {SafeAreaView as NativeSafeAreaView} from 'react-native-safe-area-context';
import NativeSafeAreaView, {useSafeArea} from 'react-native-safe-area-view';
import Box from './Box';
// import {SafeAreaView as NativeSafeAreaView} from 'react-native';
// import {getStatusBarHeight} from 'react-native-status-bar-height';

const SafeAreaView = props => {
  const insets = useSafeArea();

  return Platform.OS === 'ios' || true ? (
    <Box as={NativeSafeAreaView} {...props} />
  ) : (
    <Box
      pt={`${insets.top}px`}
      pb={`${insets.bottom}px`}
      pl={`${insets.left}px`}
      pr={`${insets.right}px`}
      {...props}
    />
  );
};

export default SafeAreaView;
