import Box from 'components/Box'
import React from 'react'

const Row = ({ children, ...props }) => {
    return (
        <Box width={1} flexDirection={"row"} {...props}>
            {children}
        </Box>
    )
}

export default Row