import React, { useState, } from 'react';
import { Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import HeadedScreen from 'components/HeadedScreen';
import ProfileHeadCard from '../ProfileHeadCard';
import MultiTextSwitch from '../MultiTextSwitch';
import Box from '../Box';
import { useLoader } from 'hooks/useLoader';
import { noop } from "lodash";
import { IS_SMALLER } from 'styles/responsive';
import { colors } from 'styles/theme';
import { styles } from "./styles";

const maxHeight = Math.max(0, Dimensions.get('window').height * (IS_SMALLER ? 0.54 : 0.72));
const defaultFlexSize = IS_SMALLER ? 2.5 : 4
const ProfilePage = ({ fetching, navigation, actions, userType, tabs, steps, user, flexSize = defaultFlexSize, extraHeaderContent, permissions, isTenant, isContactManager, setActiveTabIndex = noop, ...props }) => {
    const theme = useTheme();
    const [feedIndex, setFeedIndex] = useState(0);
    const StepComponent = steps[feedIndex];
    const { loader } = useLoader({ isLoading: fetching });

    const renderHeader = React.useCallback(
        () => (
            <ProfileHeadCard userName={user?.fullName} userType={userType} picture={user?.picture} title={user?.title}>
                <Box style={{ ...styles.headContainer }}>
                    {extraHeaderContent && extraHeaderContent()}
                    {!isContactManager && <Box style={{ marginBottom: IS_SMALLER ? 10 : 15, }} mt={IS_SMALLER ? 2 : 3} px={18} >
                        <MultiTextSwitch
                            value={feedIndex}
                            shape="circle"
                            size="small"
                            options={tabs}
                            onSelect={(_, i) => {
                                setFeedIndex(i);
                                setActiveTabIndex(i)
                            }}
                            themedStyle={{ borderColor: 'red' }}
                        />
                    </Box>}
                </Box>
            </ProfileHeadCard>
        ),
        [theme, fetching, tabs, user, feedIndex],
    );

    const renderContent = React.useCallback(
        () => (
            <StepComponent navigation={navigation} data={user} isTenant={isTenant} isContactManager={isContactManager} {...props} onSwitchToTab={(i) => { setFeedIndex(i) }} />
        ),
        [feedIndex, theme, fetching]
    );
    return (
        <HeadedScreen backgroundColor={colors["gray scale/5"]} actions={actions} headerProps={{ transparent: true }}>
            <Box flex={1} alignContent={"space-between"} style={styles.container} as={Layout}>
                {loader}
                {renderHeader()}
                <Box flex={flexSize} height={maxHeight} mt={3} >
                    {renderContent()}
                </Box>
            </Box>
        </HeadedScreen>
    )
};

export default ProfilePage;