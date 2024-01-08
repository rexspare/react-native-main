import React, { useState } from 'react';
import HeadedScreen from 'components/HeadedScreen';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Box from 'components/Box';
import { useTabs } from 'hooks/useTabs';
import PropertyInfo from 'components/TenantApp/PropertyInfo';
import PropertyFiles from 'components/TenantApp/PropertyFiles';
import { getActions } from 'constants/actions';
import { Divider } from '@ui-kitten/components';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const tabs = [
    { Component: PropertyInfo, text: "Building Info", flex: 1 },
    { Component: PropertyFiles, text: "Files", flex: 1 }
]
const PropertyDetails = ({ route, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { id: buildingId } = route?.params;
    const { Component, setActiveTabIndex } = useTabs(tabs)

    return (
        <HeadedScreen
            title={"Property Details"}
            headerStyle={{ title: { ...typography['body/large – Bold'] } }}
            actions={getActions(
                ['back', { fill: '#000', onPress: () => navigation.goBack() }],
                ['bell', { fill: '#fff', onPress: () => navigation.navigate('Notifications') }]
            )}
        >
            <Box width={1} borderBottomWidth={!activeIndex ? 0 : 1} borderBottomColor={colors["gray scale/10"]} pb={3} my="2" px="10" >
                <Box alignSelf="center" width={"90%"}>
                    <MultiTextSwitch
                        shape={"rounded"}
                        size="small"
                        options={tabs}
                        onSelect={(_, i) => {
                            setActiveIndex(i);
                            setActiveTabIndex(i)
                        }}
                    />
                </Box>
            </Box>
            <Component buildingId={buildingId} navigation={navigation} />
        </HeadedScreen>
    )
}

export default PropertyDetails;