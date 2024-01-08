import React from 'react';
import Text from 'components/Text';
import { TouchableOpacity } from 'react-native';
import { colors } from 'styles/theme';


const TouchableText = ({ children, textProps, style, numberOfLines, maxWidth, ellipsizeMode = 'tail', ...props }) => {
    return (
        <TouchableOpacity {...props}>
            <Text
                style={style}
                maxWidth={maxWidth}
                ellipsizeMode={ellipsizeMode}
                numberOfLines={numberOfLines}
                color={colors["primary/50"]}
                {...textProps}
            >
                {children}
            </Text>
        </TouchableOpacity>
    )
};

export default TouchableText;