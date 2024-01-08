import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { noop } from 'lodash';
import { useIsOpen } from 'hooks/useIsOpen';
import BottomHalfModal from 'components/BottomHalfModal';
import Box from 'components/Box';
import Text from 'components/Text';
import FileInput from 'components/Forms/Fields/FileInput';
import { t } from 'helpers/react';
import { styles } from './styles';

export const ModalOption = ({ iconProps, text, onPress, inactive }) => {
  return (
    <Box
      as={TouchableOpacity}
      onPress={!inactive ? onPress : noop}
      style={styles.touchableContainer}>
      <Icon height={18} width={18} {...iconProps} />
      <Text style={styles.text}>{text}</Text>
      {t(
        inactive,
        <Box
          width={'100%'}
          height={'100%'}
          position={'absolute'}
          backgroundColor={'#fff'}
          opacity={0.5}
        />,
      )}
    </Box>
  );
};

const AttachmentModal = ({ setValue, value, ...props }) => {
  const { isOpen, close, open } = useIsOpen();

  const handleSetValue = val =>
    !val?.[0]?.didCancel && setValue([...(value || []), ...val]);

  return (
    <BottomHalfModal {...props} displayDone={true}>
      <Box>
        <ModalOption
          onPress={open}
          text={'Choose External File'}
          iconProps={{ name: 'document_attachment', pack: 'pm' }}
        />
        <ModalOption
          text={'Choose File From App'}
          iconProps={{ name: 'fileFromFiles', pack: 'pm' }}
        />
      </Box>
      <FileInput
        displayPicker={isOpen}
        onSubmit={handleSetValue}
        close={close}
      />
    </BottomHalfModal>
  );
};

export default AttachmentModal;
