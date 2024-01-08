import React from "react";

import { chain } from 'helpers/func';
import BottomHalfModal from "components/BottomHalfModal";
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Text from 'components/Text';
import Box from 'components/Box';
import Icon from 'components/Icon';
import { t } from 'helpers/react';

const BottomHalfContextMenu = ({ onHide, menuItems = [], title = "Actions", ...props }) => {
    const microcopy = { title };
    return (
        <>
            <BottomHalfModal
                displayDone={false}
                doneText="DONE"
                displayDoneRight
                onHide={onHide}
                styles={{ headerTxt: styles.headerTxt, alignItems: 'center' }}
                {...microcopy}
                {...props}
            >
                {menuItems.map(({ onPress, label, color, icon }, i) => (
                    <Box as={TouchableOpacity} onPress={chain([onPress, onHide])} style={styles.touchableContainer} key={i}>
                        {t(icon, Icon(icon, 'pm')({ ...styles.iconStyle, fill: color }))}
                        <Text style={{ ...styles.text, color }}>{label}</Text>
                    </Box>
                )
                )}
            </BottomHalfModal>
        </>
    )
}
export default BottomHalfContextMenu