import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import { ScrollView } from 'react-native';
import SafeAreaView from 'components/SafeAreaView';
import Loader from 'components/Loader';
import { t } from 'helpers/react';

const HeadedScreen = ({ actions = [], header = '', style, title, subtitle, headerStyle, divider, children, contentContainerProps, headerProps, scrollable, isLoading, showHeader = true, ...props }) => {
    return (
        <Box
            flex={1}
            as={SafeAreaView}
            forceInset={{ top: 'always' }}
            {...props}
        >
            {t(showHeader, <Header
                actions={actions}
                style={{ ...headerStyle, ...style }}
                subtitle={subtitle}
                title={title || header}
                divider={divider}
                {...headerProps}
            />)}
            <Box flex={1} as={scrollable && ScrollView} {...contentContainerProps}>
                {isLoading ? <Loader isLoading={isLoading} /> : children}
            </Box>
        </Box>
    )
}

export default HeadedScreen;