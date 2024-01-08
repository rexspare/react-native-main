import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const CameraInput = ({
  onSubmit,
  isOpen = true,
  close,
  options = { mediaType: 'photo' },
  isCamera = true,
  isGallery = false,
}) => {
  const selectCallback = async data => {
    try {
      return onSubmit([
        {
          name: data.assets[0]?.fileName || data.assets[0]?.origURL,
          data: await RNFetchBlob.fs.readFile(Platform.OS === 'ios' ? data.assets[0]?.uri.replace('file:', '') : data.assets[0]?.uri, 'base64'),
          ...data.assets[0],
        },
      ]);
    } catch (e) {
      return console.log(e);
    } finally {
      close();
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(options, selectCallback);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isCamera) {
      requestCameraPermission();
    }
    if (isGallery) {
      ImagePicker.launchImageLibrary(options, selectCallback);
    }
  }, [isOpen]);
  return <></>;
};
export default CameraInput;
