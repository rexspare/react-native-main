import React from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddTenant from 'pages/tenants/AddTenant';
import { getActions } from 'constants/actions';
import TopTab from './TopTab';
import HeadedScreen from 'components/HeadedScreen';
import { colors } from 'styles/theme';
import TenantLeaseForm from 'pages/tenants/AddTenant/AddTenantLease';

const Tab = createMaterialTopTabNavigator();
const AddTenantsTabs = ({ navigation, route }) => {
    const isNew = !route?.params?.id;
    
    return (
        <HeadedScreen title={isNew ? `Add New Tenant` : `Edit Tenant`} actions={getActions(['back', { onPress: () => navigation.goBack() }])} headerStyle={{ backgroundColor: colors['white'] }}>
            <Tab.Navigator
                pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
                tabBar={tabBarProps => isNew ? <TopTab disableAutoScrolling={true} disableOnPress={true} isPointTab {...tabBarProps} /> : null}>
                <Tab.Screen
                    name="AddTenantsTenant"
                    key="Tenant"
                    component={AddTenant}
                    initialParams={{ type: 'Tenant', ...route.params }}
                    options={{ tabBarLabel: 'Tenant', index: 1 }}
                />
                <Tab.Screen
                    name="AddTenantsUnit"
                    key="Unit"
                    component={TenantLeaseForm}
                    initialParams={{ type: 'Unit' }}
                    options={{ tabBarLabel: 'Unit', index: 2 }}
                />
            </Tab.Navigator>
        </HeadedScreen>
    );
};

export default AddTenantsTabs;
