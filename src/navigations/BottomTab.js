import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import Box from 'components/Box';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';


const NavShadow = styled(BottomNavigation)`
  elevation: 5;
  shadow-opacity: 0.03;
  shadow-radius: 0.1;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;

const BottomTab = ({ state, descriptors, navigation }) => {
  const dblClickRefs = React.useRef({});
  const insets = useSafeAreaInsets();

  const onSelect = React.useCallback(
    index => {
      const now = new Date().getTime();
      const delta = now - (dblClickRefs.current?.[index] ?? 0);
      const selectedRoute = state?.routes[index];
      dblClickRefs.current[index] = now;

      if (delta < 300) {
        return navigation.navigate(
          selectedRoute?.state?.routeNames?.[0] ?? selectedRoute?.name,
        );
      }
      navigation.navigate(selectedRoute.name);
    },
    [navigation, state],
  );

  const TabProxy = React.useCallback(
    props => {
      return (
        <>
          {state.routes
            .map((route, index) => {
              const { options } = descriptors[route.key];
              if (options.hidden) {
                return null;
              }
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;

              const selected = index === state.index;

              let iconImage =
                selected && options.tabBarIconActive
                  ? options.tabBarIconActive
                  : options.tabBarIcon;
              let icon = options.icon;
              if (iconImage) {
                icon = ({ tintColor, ...style }) => (
                  <Box>
                    <Icon
                      name={iconImage ?? 'tasks'}
                      pack="pm"
                      height={24}
                      width={28}
                    />
                  </Box>
                );
              }

              return (
                <BottomNavigationTab
                  key={route.key}
                  selected={selected}
                  onSelect={() => onSelect(index)}
                  title={label.toUpperCase()}
                  titleStyle={{
                    color: selected
                      ? colors['primary/50 – brand']
                      : colors['gray scale/30'],
                    fontSize: 11
                  }}
                  style={props.style}
                  icon={icon}
                />
              );
            })
            .filter(tab => !!tab)}
        </>
      );
    },
    [descriptors, onSelect, state.index, state.routes],
  );

  return (
    <SafeAreaView>
      <NavShadow
        appearance="noIndicator"
        selectedIndex={state.index}
        paddingBottom={Platform.OS === 'ios' ? insets.bottom : 25}
      // onSelect={onSelect}
      >
        <TabProxy />
      </NavShadow>
    </SafeAreaView>
  );
};

export default BottomTab;
