import React, { useState } from 'react';
import { Button } from '@ui-kitten/components';
import BottomHalfModal from 'components/BottomHalfModal';
import Icon from './Icon';
import Input from './Input';
import { colors } from 'styles/theme';

const AddOtherModal = ({ children, onPress, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <BottomHalfModal
      displayDone={false}
      styles={{
        headerTxt: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
      }}
      elStyle
      {...props}>
      <Input
        labelStyle={{ color: colors['gray scale/40'], fontWeight: '500' }}
        label="Other"
        isUppercase
        onChangeText={val => setInputValue(val)}
        minHeight={48}
        icon={Icon('expandInput', 'pm')}
      />
      <Button
        style={{ borderRadius: 12, marginTop: 40 }}
        textStyle={{ fontSize: 16, textTransform: 'uppercase' }}
        onPress={() => !!inputValue && onPress(inputValue)}>
        Save
      </Button>
    </BottomHalfModal>
  );
};

export default AddOtherModal;
