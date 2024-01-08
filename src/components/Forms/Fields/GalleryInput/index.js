import React from 'react';
import { useIsOpen } from 'hooks/useIsOpen';
import Button from 'components/Button';
import Box from 'components/Box';
import AddFileModal from 'components/Modals/AddFileModal';
import GalleryItems from './GalleryItems';
import ButtonField from '../ButtonField';
import { t } from 'helpers/react';
import styled from 'styled-components/native';

const AddButton = styled(Button)`
  padding-horizontal: 0;
  padding-vertical: 5;
  min-height: 0;
  min-width: 0;
  margin-left: 5;
`;

const GalleryInput = ({
  label,
  value = [],
  onAdd,
  onRemove,
  readOnly,
  maxCount = 5,
  disabled,
  download,
  labelTransform,
  displayMenu,
  navigation,
  closeMenu,
  inputProps,
  isImageField,
  isPlusButton,
  copy = { label: 'FILES', btn: 'ADD FILES' },
  ...props
}) => {
  const { isOpen, close, open } = useIsOpen();
  const canAdd = (value?.length ?? 0) < maxCount;

  return (
    <>
      <Box {...props}>
        {t(
          !readOnly && canAdd,

          <ButtonField
            copy={copy}
            label={label}
            onPress={open}
            isPlusButton={!!value?.length}
            styles={props?.styles}
            {...inputProps}
          />,
        )}
        <GalleryItems
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onRemove={onRemove}
          download={download}
        />
      </Box>
      <AddFileModal
        visible={isOpen}
        setValue={onAdd}
        onHide={close}
        isImageField={isImageField}
      />
    </>
  );
};

GalleryInput.styledComponentName = 'Input';
GalleryInput.ignoreForm = true;

export default GalleryInput;
