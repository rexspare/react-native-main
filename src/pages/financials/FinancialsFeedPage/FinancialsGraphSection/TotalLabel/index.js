import Box from 'components/Box';
import Text from 'components/Text';
import React from 'react';


const TotalLabel = ({ themeColor = "orange", value = 20000, label = "Expenses" }) => {
    return (
        <Box width={"40%"}>
            <Box flexDirection={"row"} alignItems={"center"} >
                <Box backgroundColor={themeColor} marginRight={1} borderRadius={72} height={10} width={10} />
                <Text color={"grey"} fontSize={16} fontWeight={"400"}>{label}</Text>
            </Box>
            <Text fontSize={22} color={themeColor}>${value}</Text>
        </Box>
    )
}

export default TotalLabel