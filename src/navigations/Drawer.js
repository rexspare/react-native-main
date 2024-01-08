import React from 'react';
import styled from 'styled-components/native';

import ThemedGradient from 'components/ThemedGradient';
import Box from 'components/Box';
import Button from 'components/Button';
import {List, Icon} from '@ui-kitten/components';
import {StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'components/SafeAreaView';
import Animated from 'react-native-reanimated';

const Background = styled(Box)`
  background-color: transparent;
  /* background-color: ${({theme}) => theme['color-primary-gradient-2']}; */
`;

const Nav = styled(List)`
  background-color: transparent;
  flex: 1;
`;

const NavButton = styled(Button)`
  align-items: flex-start;
  justify-content: flex-start;
  text-transform: uppercase;
  border-top-right-radius: 30;
  border-bottom-right-radius: 30;
  margin-right: 30;
  margin-vertical: 10;
`;

const styles = StyleSheet.create({
  navText: {
    textTransform: 'uppercase',
    fontSize: 16,
    marginVertical: 8,
    flex: 1,
  },
  navContainer: {
    // flex: 1,
  },
});

export const DrawerProgressContext = React.createContext({
  progress: null,
  setProgress: () => null,
});

const Drawer = ({navigation, routes, progress}) => {
  const {setProgress} = React.useContext(DrawerProgressContext);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  const onSelect = React.useCallback(
    item => {
      navigation.navigate(item.route);
      navigation.closeDrawer();
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}) => (
      <NavButton
        status="control"
        appearance="ghost"
        shadow={false}
        onPress={() => onSelect(item)}
        textStyle={styles.navText}>
        {item.label}
      </NavButton>
    ),
    [onSelect],
  );

  return (
    <Background flex={1}>
      <Box flex={1} as={ThemedGradient} start={{x: 0, y: 1}} end={{x: 0, y: 0}}>
        {isOpen ? <StatusBar animated barStyle="light-content" /> : null}
        <Box as={SafeAreaView} flex={1}>
          <Animated.Code>
            {() =>
              Animated.call([progress], ([progress]) => {
                setIsOpen(progress >= 0.7);
              })
            }
          </Animated.Code>
          <Box
            as={Animated.View}
            flex={1}
            style={{
              opacity: progress,
              transform: [
                {
                  translateX: Animated.interpolate(progress, {
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            }}>
            <Box flex={1} my="10%">
              <Box mb="60" alignItems="flex-start">
                <Button
                  status="control"
                  size="giant"
                  appearance="ghost"
                  icon={style => <Icon name="menu" {...style} />}
                  onPress={navigation.closeDrawer}
                />
              </Box>
              <Box flex={1}>
                <Nav
                  data={routes}
                  renderItem={renderItem}
                  contentContainerStyle={styles.navContainer}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Background>
  );
};

export default Drawer;
