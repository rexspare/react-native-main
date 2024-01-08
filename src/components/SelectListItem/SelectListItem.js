import React from "react"
import Box from "components/Box";
import Text from "components/Text";
import { styles } from './styles'
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from "react-native";
import { colors } from "styles/theme"
import { t } from "helpers/react";
import { typography } from "styles/typography";

const SelectListItem = ({ isSelected, onPress, icon, text }) => {
    return (
        <Box as={TouchableOpacity} onPress={onPress} style={styles.mainContainer}>
            <Box style={styles.textIconContainer}>
                {icon}
                <Text
                    color={colors[isSelected ? 'primary/50' : "gray scale/90"]}
                    style={typography["body/medium – regular"]}
                >
                    {text}
                </Text>
            </Box>
            <Box style={styles.checkboxContainer}>
                <Box
                    style={styles.checkbox}
                    borderColor={isSelected ? colors['primary/50'] : colors['gray scale/30']}
                >
                    {t(isSelected, <Icon width={15} height={15} pack={'pm'} name={"checkIcon"} fill={isSelected ? "red" : (0, 0, 0)} />)}
                </Box>
            </Box>
        </Box>
    )
}

export default SelectListItem