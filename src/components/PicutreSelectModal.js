import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import OptionsModal from './OptionsModal';

const PicutreSelectModal = ({
  visible,
  onHide,
  onPicutreSelect,
  options = { mediaType: 'photo' },
}) => {
  const selectCallback = React.useCallback(
    response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Toast.show('Error getting file', Toast.SHORT);
      } else {
        onHide();
        onPicutreSelect(response);
      }
    },
    [onHide, onPicutreSelect],
  );

  const modalOptions = React.useMemo(() => {
    return [
      {
        label: 'Take Photo',
        onPress: () => ImagePicker.launchCamera(options, selectCallback),
      },
      {
        label: 'Choose From Gallery',
        onPress: () => ImagePicker.launchImageLibrary(options, selectCallback),
      },
    ];
  }, [options, selectCallback]);

  return (
    <OptionsModal visible={visible} onHide={onHide} options={modalOptions} />
  );
};

export default PicutreSelectModal;
