import React from "react"
import Text from "components/Text"
import Box from "components/Box"

const BorderedText = ({ text, styles,bgc, bc,fs, fw = "600", bw = 1, br = 7, c, caps, ...props }) => {
    return (
        <Box
            px="2"
            py="1"
            borderRadius={br}
            borderWidth={bw}
            borderColor={bc}
            backgroundColor={bgc}
            {...styles?.box}
            {...props}
        >
            <Text color={c} fontWeight={fw} fontSize={fs} style={{ textTransform: caps && "uppercase", ...styles?.text }}>
                {text}
            </Text>
        </Box>
    )
};

export default BorderedText