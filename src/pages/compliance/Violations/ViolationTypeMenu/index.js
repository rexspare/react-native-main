import React from 'react';
import MultiTextSwitch from "components/MultiTextSwitch";
import {stringifyEnumValue, VIOLATION_TYPES} from "constants/enums";
import Box from "components/Box";

const ViolationTypeMenu = ({}) => {
    return (
        <Box px="10">
            <MultiTextSwitch
                shape="circle"
                size="small"
                onSelect={option => null}
                options={Object.values(VIOLATION_TYPES).map(value => ({
                    text: stringifyEnumValue(VIOLATION_TYPES, value),
                    themeColor: 'color-primary-500',
                    value,
                }))}
            />
        </Box>
    );
};

export default ViolationTypeMenu;
