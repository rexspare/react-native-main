import React from "react";

import Text from "components/Text";
import Box from "components/Box";

const NoDataPlaceHolder = () => {
    return (
        <Box width={"100%"} height={"72%"} justifyContent={"center"} alignItems={"center"}>
            <Text fontWeight="bold"> No data.</Text>
        </Box>
    )
};

export default NoDataPlaceHolder;