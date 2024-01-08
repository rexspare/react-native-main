import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropertiesSearch from './PropertiesSearch';
import useSearch from 'hooks/useSearch';
import PropertiesTabs from './PropertiesTabs';

const Stack = createStackNavigator();

const PropertiesRoot = ({ navigation, route }) => {
    const { headerProps: searchHeaderProps, SearchScreen } = useSearch(
    PropertiesSearch,
    'PropertiesSearch',
    'PropertiesTabs',
    );

    return (
        <>
        <Stack.Navigator
            headerMode="none"
            keyboardHandlingEnabled={false}
            mode="modal"
        >
            <Stack.Screen name="PropertiesTabs">
                {props => (
                    <PropertiesTabs {...props}/>
                )}
            </Stack.Screen>
            <Stack.Screen component={SearchScreen} name="PropertiesSearch" />
        </Stack.Navigator>
    </>
    )
};

export default PropertiesRoot;
