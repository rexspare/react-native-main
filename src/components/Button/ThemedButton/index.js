import React from 'react';
import { button_styles } from "styles/button"
import Button from '../index.js';

const ThemedButton = ({ theme, style: _style, textStyle: _textStyle, ...props }) => {
    const { style, textStyle, ...additionalProps } = button_styles[theme]
    return (
        <Button
            textStyle={{ ...textStyle, ..._textStyle }}
            style={[style, _style]}
            {...additionalProps}
            {...props}
        />
    )
}

export default ThemedButton