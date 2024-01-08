import React, { useCallback, useMemo } from 'react';
import Box from 'components/Box';
import { deleteBtnProps, dropdownBtnProps } from 'components/Button/const.js';
import { Buttons } from 'components/Dialog';
import { useIsOpen } from 'hooks/useIsOpen';
import SelectButtonInput from '../index.js';

const SelectButtonFilterInput = ({ value, setValue, renderValue, ...props }) => {
    const { isOpen, toggle } = useIsOpen(true)

    const actions = useMemo(() => ([
        { ...deleteBtnProps, onPress: () => setValue(null) },
        { ...dropdownBtnProps, onPress: toggle, style: [dropdownBtnProps.style, !isOpen && styles.closedDropdown] },
    ]), [setValue, renderValue, toggle, isOpen]);

    const handleRenderValue = useCallback((...args) => {
        if (!isOpen) return <></>
        return renderValue(...args)
    }, [isOpen, renderValue]);

    return (
        <SelectButtonInput
            value={value}
            setValue={setValue}
            renderValue={handleRenderValue}
            displayChange={false}
            titleAppender={
                (value && !!value?.length) &&
                <Box width={"50%"} flex={1} alignItems={"flex-end"}>
                    <Box flexDirection={"row"} justifyContent={"flex-end"}>
                        <Buttons buttons={actions} containerStyle={{ flexDirection: "row" }} />
                    </Box>
                </Box>
            }
            {...props}
        />
    )
}
const styles = {
    closedDropdown: {
        transform: [{ rotateX: "180deg" }]
    }
}

export default SelectButtonFilterInput