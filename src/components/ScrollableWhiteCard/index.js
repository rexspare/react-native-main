import React from 'react';
import Box from 'components/Box';
import WhiteCard from 'components/Cards/WhiteCard';
import { ScrollView } from 'react-native';

const ScrollableWhiteCard = ({ children, ...props }) => {
    return (
        <WhiteCard borderTopRightRadius={12} borderTopLeftRadius={12} {...props} >
            <Box as={ScrollView} mt={2} flex={1} >
                {children}
            </Box>
        </WhiteCard>
    )

}

export default ScrollableWhiteCard