import React from 'react';
import { useIsOpen } from 'hooks/useIsOpen';
import FileInput from 'components/Forms/Fields/FileInput';
import BottomHalfModal from '../../BottomHalfModal';
import { ModalOption } from '../../AttachmentModal';
import PhotoField from '../../Forms/Fields/PhotoField';
import { chain } from 'helpers/func';
import { t } from 'helpers/react';

const AddFileModal = ({
  visible,
  onHide,
  setValue,
  isImageField,
  title = 'Add Photo',
}) => {
  const {
    isOpen: displayDocumentPicker,
    open: openDocumentPicker,
    close: closeDocumentPicker,
  } = useIsOpen();
  const handleSetValue = chain([val => setValue(val), onHide]);

  return (
    <>
      <BottomHalfModal
        visible={visible}
        onHide={onHide}
        displayDone={false}
        title={title}>
        <PhotoField
          setValue={handleSetValue}
          isCamera={true}
          isGallery={false}
          Component={ModalOption}
          text={'Take Photo'}
          iconProps={{ name: 'camera', pack: 'pm' }}
        />
        {t(
          isImageField,
          <PhotoField
            setValue={handleSetValue}
            isGallery={true}
            isCamera={false}
            Component={ModalOption}
            text={'Choose From Library'}
            iconProps={{ name: 'document_attachment', pack: 'pm' }}
          />,
          <ModalOption
            setValue={handleSetValue}
            isGallery={true}
            isCamera={false}
            text={'Choose From Library'}
            iconProps={{ name: 'document_attachment', pack: 'pm' }}
            onPress={openDocumentPicker}
          />,
        )}

        <ModalOption
          text={`Choose From "My Documents"`}
          iconProps={{ name: 'fileFromDocuments', pack: 'pm' }}
        />
        <ModalOption
          text={`Choose From "My Files"`}
          iconProps={{ name: 'fileFromFiles', pack: 'pm' }}
        />
      </BottomHalfModal>
      <FileInput
        displayPicker={displayDocumentPicker}
        onSubmit={handleSetValue}
        close={closeDocumentPicker}
      />
    </>
  );
};

export default AddFileModal;
