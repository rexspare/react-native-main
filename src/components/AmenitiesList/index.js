import Box from 'components/Box'
import TagsValue from 'components/Forms/TagsValue'
import Text from 'components/Text'
import React from 'react'
import { colors } from 'styles/theme'
import { typography } from 'styles/typography'

const AmenitiesList = ({ amenities,styles, ...props }) => {
    return (
        <Box {...props}>
            <Text color={colors['gray scale/40']} style={[typography["body/medium – medium"],{textTransform: 'uppercase'}, styles?.title]}>
                {!!amenities?.length ? "List of Amenities" : ""}
            </Text>
            <TagsValue mt={2} value={amenities} />
        </Box>
    )
}

export default AmenitiesList