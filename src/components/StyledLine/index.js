import React from "react";
import Box from "components/Box";
import useTheme from "hooks/useTheme";


const StyledLine = ({ isActive, style, ...props  }) => {
    const theme = useTheme();
    return <Box style={{
        borderWidth: 2,
        width: 1,
        height: "72%",
        borderColor: isActive ? theme['color-primary-500']:  "grey",
        position: 'absolute',
        right: 3,
        borderRadius: 3,
        top: '14%',
        ...style,
        ...props
    }} />
}

export default StyledLine;