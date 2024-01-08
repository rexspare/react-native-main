import React, { useCallback, useState } from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COMPLIANCE_OPTIONS, MAINTENANCE_REQUEST_STATUSES } from 'constants/enums';
import ViolationTypeMenu from "pages/compliance/Violations/ViolationTypeMenu";
import Box from "components/Box";
import { Layout } from "@ui-kitten/components";
import TopTab from "navigations/TopTab";
import SafeAreaView from "components/SafeAreaView";
import Header from "components/Header";
import ViolationCard from "pages/complaints/ViolationCard";
import getViolations from "queries/violations/getViolationsOfBuilding.gql";
import InfiniteFlatList from "components/InfiniteFlatList";
import Text from "components/Text";
const Tab = createMaterialTopTabNavigator();

const ComplaintsMenu = ({ navigation }) => {
    const [statusFilter, setStatusFilter] = useState(
        MAINTENANCE_REQUEST_STATUSES.OPEN,
    );
    const { dataExtractor, keyExtractor } = React.useMemo(() => {
        return {
            dataExtractor: data => data.allViolations,
            keyExtractor: data => data.id,
        };
    }, []);
    const renderViolationCard = useCallback(({ item: {
        issueDate,
        idInSupplier,
        building: { displayName },
        type
    } }) => {
        return <ViolationCard type={type} location={displayName} issueDate={issueDate} id={idInSupplier} />
    }, [])
    return (
        <Box flex={1} as={Layout}>
            <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }} pb={0}>
                <Header
                    actions={[
                        {
                            icon: 'menu',
                            left: true,
                            onPress: () => navigation.openDrawer(),
                        },
                        {
                            icon: 'bell',
                            pack: 'pm',
                            onPress: () => navigation.navigate('Notifications'),
                        },
                    ]}
                    alignment="center"
                />
                <Box flex={1} justifyContent={'space-between'}>
                    <Tab.Navigator
                        pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
                        tabBar={tabBarProps => <TopTab {...tabBarProps} disableAutoScrolling={true} />}>
                        <Tab.Screen
                            name="Violations"
                            component={ViolationTypeMenu}
                            initialParams={{ type: COMPLIANCE_OPTIONS.VIOLATION }}
                            options={{ tabBarLabel: 'Violations' }}
                        />
                        <Tab.Screen
                            name="Complaints"
                            component={ViolationTypeMenu}
                            initialParams={{ type: COMPLIANCE_OPTIONS.COMPLAINTS }}
                            options={{ tabBarLabel: 'Complaints' }}
                        />
                        <Tab.Screen
                            name="Permits"
                            component={ViolationTypeMenu}
                            initialParams={{ type: COMPLIANCE_OPTIONS.PERMITS }}
                            options={{ tabBarLabel: 'Permits' }}
                        />
                    </Tab.Navigator>
                </Box>
            </Box>
            <Box flex={4}>
                <InfiniteFlatList
                    added={true}
                    query={getViolations}
                    dataExtractor={dataExtractor}
                    keyExtractor={keyExtractor}
                    renderItem={renderViolationCard}
                    ListEmptyComponent={
                        <Text category="h6" py={3} textAlign="center" appearance="hint">
                            No violations
                        </Text>
                    }
                />
            </Box>

        </Box>
    );
};

export default ComplaintsMenu;
