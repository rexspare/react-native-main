import React, { useEffect } from "react";
import Text from 'components/Text';
import { useIsOpen } from 'hooks/useIsOpen';
import TimePicker from 'components/TimePicker';
import Box from 'components/Box';
import SelectButtonInput from "components/SelectButtonInput";
import { format } from "helpers/date";
import Dialog from "components/Dialog";
import { styles } from "./styles";


const TimePickerModalField = ({ value, editable = true, setValue, copy = {}, theme, isDialogeOpen, children, ...props }) => {
    const { isOpen, open, close } = useIsOpen();
    
    useEffect(() => {
        isDialogeOpen && open();
    }, [isDialogeOpen]);

    return (
        <>
            {!children && < SelectButtonInput
                value={format(value, 'HH:mm: SS')}
                onAdd={editable && open}
                mt={1}
                styles={{ changeBtn: { textStyle: { fontSize: 10 } } }}

                {...copy}
                {...props}
            />}
            {children}
            <Dialog visible={isOpen} onHide={close} styles={{ view: { justifyContent: "flex-start", width: "90%", padding: 0, }, content: { paddingHorizontal: 18, paddingTop: 0, paddingBottom: 0 }, close: styles.close }} justifyContent={"center"} borderWidth={5} closeIcon={false} >
                <Box {...styles.valueContainer} borderBottomColor={theme['grey-100']}>
                    <Text fontSize={16} appearance="hint" transform="uppercase">
                        {copy?.modalLabel}
                    </Text>
                    <Text borderWidth={1} status="primary" fontSize={16} >
                        {format(value || new Date(), 'HH:mm: SS')}
                    </Text>
                </Box>
                <TimePicker styles={styles.timePicker} onChange={(val) => setValue(val)} value={value || new Date()} />
            </Dialog>
        </>
    )
}
export default TimePickerModalField