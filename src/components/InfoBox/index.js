import React from 'react'
import Text from "components/Text";
import Box from 'components/Box';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';
import styles from './styles'

const InfoBox = ({icon = {name:'wrench', pack:'pm'}, heading, text, ...props}) => {
    return (
        <Box style={styles.container}>
            {Icon(
                icon?.name,
                icon?.pack,
            )({ width: 28, height: 28, fill: colors['gray scale/20'] })}
            <Box px={18} mt={21}>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.text}>{text}</Text>
            </Box>
        </Box>
    );
}

export default InfoBox;