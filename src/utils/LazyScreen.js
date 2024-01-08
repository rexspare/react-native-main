import React, { useState } from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {InteractionManager} from 'react-native';
import Box from 'components/Box';
import {Layout, Spinner} from '@ui-kitten/components';

const LazyScreen = props => {
  const [hidden, setHidden] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setHidden(false);
      });

      return () => task.cancel();
    }, []),
  );

  return hidden ? (
    <Box
      as={Layout}
      opacity={0.6}
      position="absolute"
      zIndex={1}
      left={0}
      top={0}
      right={0}
      bottom={0}
      pt={16}
      alignItems="center"
      justifyContent="center"
      pointerEvents="box-none">
      <Box>
        <Spinner size="giant" />
      </Box>
    </Box>
  ) : (
    props.children
  );
};

export default React.memo(LazyScreen);
