import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as baseTheme } from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'config/toast-config';

import AsyncStorage from '@react-native-community/async-storage';

import RootNavigator from 'navigations';
import StorageProvider from 'providers/storage';
import ThemeProvider from 'providers/theme';
import AuthProvider from 'providers/auth';

import RefreshStateProvider from 'providers/refresh';

import NotificationsProvider from 'providers/notifications';

import { default as appTheme } from './pm-theme.json';
import { default as appMapping } from './pm-mapping';
import PmIconsPack from 'components/PmIconPackage';
import { StatusBar } from 'react-native';
import FABProvider from 'providers/fab.js';
import GraphQLProvider from 'providers/graphql.js';
import FilterContext from 'providers/filter';

console.disableYellowBox = true;

delete mapping.components.Input.appearances.default.variantGroups.size.small
  .borderRadius;
delete mapping.components.Input.appearances.default.variantGroups.size.medium
  .borderRadius;
delete mapping.components.Input.appearances.default.variantGroups.size.large
  .borderRadius;

const theme = { ...baseTheme, ...appTheme };

if (!__DEV__) {
  const noop = () => { };
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}
else {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))

}
console.log(require('react-native-config').default);

const App = () => (
  <>
    <IconRegistry icons={[EvaIconsPack, PmIconsPack]} />
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="light-content"
    />
    <GraphQLProvider>
      <ApplicationProvider
        mapping={mapping}
        customMapping={appMapping}
        theme={theme}>
        <SafeAreaProvider>
          <StorageProvider.Provider value={AsyncStorage}>
            <AuthProvider.Provider>
                <RefreshStateProvider.Provider>
                  <NotificationsProvider.Provider>
                    <ThemeProvider>
                      <FilterContext.Provider>
                        <FABProvider>
                          <RootNavigator />
                          <Toast config={toastConfig} />
                        </FABProvider>
                      </FilterContext.Provider>
                    </ThemeProvider>
                  </NotificationsProvider.Provider>
                </RefreshStateProvider.Provider>
            </AuthProvider.Provider>
          </StorageProvider.Provider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </GraphQLProvider>
  </>
);

export default App;
