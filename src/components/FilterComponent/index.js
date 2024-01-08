import React from "react";

import Box from 'components/Box';
import Text from 'components/Text';
import { Icon } from '@ui-kitten/components';
    import { TouchableOpacity } from 'react-native';
import { styles } from "./styles"
import { useIsOpen } from "hooks/useIsOpen";

const FilterComponent = ({ Filters, setFilter }) => {
    const { isOpen, close, open } = useIsOpen()
    return (
        <>
            <Box
                as={TouchableOpacity}
                style={styles.container}
                onPress={open}
            >
                <Icon name="filter" pack="pm" style={styles.icon} />
                <Text style={styles.text}>Add Filters</Text>
            </Box>
            <Filters visible={isOpen} onHide={close} setFilter={setFilter} />
        </>
    )
}

export default FilterComponent