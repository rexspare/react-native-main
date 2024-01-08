import React from "react";
import Text from "components/Text";
import Box from "components/Box.js";
import Input from "components/Input.js";
import { typography } from "styles/typography.js";
import { styles } from './styles.js'
import { colors } from "styles/theme.js";

const TextInputField = ({ text, value, onChange, isEditable, isRequired,  disabled, ...props }) => {
    return (
        <Box style={styles.mainContainer}>
            <Box flexDirection="row" justifyContent="space-between">
                <Text style={styles.label}>
                    {text} <Text style={styles.asteriks}>{isRequired ? '*' : null}</Text>
                </Text>
                <Text
                    style={{
                        ...typography['body/x-small – regular'],
                        color: colors['gray scale/40'],
                    }}>
                    Prefilled
                </Text>
            </Box>
            <Input
                mt={1}
                mx={0}
                editable={isEditable}
                style={styles.inputField}
                value={value}
                onChangeText={onChange}
                disabled={disabled}
                {...props}
            />
        </Box>
    )
}

export default TextInputField