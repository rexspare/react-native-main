import React from 'react';
import Modal from './Modal';
import Box from './Box';
import {Layout} from '@ui-kitten/components';
import Button from 'components/Button';
import styled from 'styled-components/native';

const OptionButton = styled(Button)`
  border-top-color: ${({theme}) => theme['grey-100']};
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const OptionsModal = ({visible, onHide, options, children}) => {
  return (
    <Modal visible={!!visible} onHide={onHide} animationType="slide">
      <Box flex={1} m="3" justifyContent="flex-end" pointerEvents="box-none">
        {children}
        <Box as={Layout} borderRadius={8} overflow="hidden" opacity={0.7}>
          {options.map(({label, ...props}, i) => (
            <OptionButton
              activeOpacity={0.7}
              status="basic"
              key={label}
              shape="rect"
              size="giant"
              {...props}>
              {label}
            </OptionButton>
          ))}
        </Box>
        <Box mb="2" mt="3">
          <Button size="giant" onPress={onHide}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OptionsModal;
