import React from 'react';
import { render } from '@testing-library/react-native';
import PrivacyPolicy from '../../src/pages/PrivacyPolicy';
import { ApplicationProvider } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { mapping, light as baseTheme } from '@eva-design/eva';
import { default as appMapping } from '../../src/pm-mapping';
import { default as appTheme } from '../../src/pm-theme.json';

jest.mock('react-native-gesture-handler', () => {
    const ScrollView = require('react-native').ScrollView;
    return { ScrollView };
});



describe('Privacy Policy', () => {
    const navigation = { dispatch: jest.fn(), navigate: jest.fn() };
    const theme = { ...baseTheme, ...appTheme };
    test('renders correctly', () => {
        const output = render(
            <ApplicationProvider
                mapping={mapping}
                customMapping={appMapping}
                theme={theme}>
                <SafeAreaProvider>
                    <PrivacyPolicy navigation={navigation} />
                </SafeAreaProvider>
            </ApplicationProvider>
        );
        expect(output).toMatchSnapshot();
    });
});