import React from 'react'

import Box from 'components/Box'
import TouchableText from 'components/TouchableText'
import { noop } from 'lodash'
import LocationAddress from 'img/icons/location.svg'


const Location = ({ location }) => {
    return (
        <Box flexDirection={"row"} alignItems={"center"}>
            <LocationAddress mr={1} />
            <TouchableText
                onPress={noop}
                textProps={{ ml: 2 }}
                fontSize={16}>
                {location}
            </TouchableText>
        </Box>
    )
}

export default Location