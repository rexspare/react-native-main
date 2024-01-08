import React from 'react';
import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';
import {Image, StatusBar, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Box from 'components/Box';

const LoadingText = styled(Text)`
  text-align: center;
`;

const Container = styled(Layout)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const splashLogo = require('img/splash.png');

const Loading = ({navigation}) => {
  React.useEffect(() => {
    return () => RNBootSplash.hide({duration: 800});
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Box as={Image} source={splashLogo} resizeMode="contain" width={100} />
      {/* <LoadingText category="h2">Loading...</LoadingText> */}
    </Container>
  );
};

export default Loading;
