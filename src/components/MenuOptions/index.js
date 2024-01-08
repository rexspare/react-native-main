import React, { useMemo } from 'react';


import Modal from 'components/Modal';
import { Buttons } from 'components/Dialog';
import {DialogWrapper, styles} from "./styles"
import Button from 'components/Button';

const MenuOptions = ({ options = [], visible, onHide }) => {
    const buttons = useMemo(
        () => [
            ...options.map((option, i) => ({ ...option, style: { ...styles.btnStyle, borderBottomWidth: i == options.length - 1 ? 0 : styles.btnStyle.borderBottomWidth }, textStyle: styles.textStyle }))
        ], [options])
    return (
        <Modal visible={visible} onHide={onHide}>
            <DialogWrapper>
                <Buttons buttons={buttons} containerStyle={styles.buttonsContainer} btnStyle={styles.btnStyle} />
                <Button children={"cancel"} onPress={onHide} containerStyle={styles.cancelContainer} />
            </DialogWrapper>
        </Modal>
    )
}


export default MenuOptions;