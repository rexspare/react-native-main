import React from "react";
import { typography } from "styles/typography";
import Text from "../index.js";


const Typography = ({ style, typography: _typography, ...props }) => {
    const _style = typography[_typography];
    return (
        <Text style={[_style, style]} {...props} />
    )
};


export default Typography