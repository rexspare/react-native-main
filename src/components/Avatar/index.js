import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'components/Icon'; 
import { t } from 'helpers/react.js';
import Box from 'components/Box.js';
import Text from 'components/Text/index.js';
import { style } from './styles.js';

const getInitials = function(string) {
 
  let names = string?.split(' ');
  let initials = names?.[0] == 'undefined'?'':names?.[0]?.substring(0, 1);
  if (names?.length > 1) {
    initials +=  names[names.length - 1] == 'undefined'?'':names[names.length - 1].substring(0, 1);
  }
  return initials?.toUpperCase();
};

const Avatar = ({
  image,
  imageText,
  onPress,
  styles,
  imageTextInitials = true,
  imageRenderType = FastImage,
  isAvatar = false,
  cameraIcon="camera"
}) => {
  return (
    <Box
      as={onPress && TouchableOpacity}
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      style={styles?.container}>
      <Box height={'100%'} flexDirection="row" alignItems={'center'}>
        {t(
          image,
          <Box style={styles?.imageContainer}>
            <Box
              justifyContent={'center'}
              as={Image}
              style={[style.image, !image && style.placeholder, styles?.image]}
              source={{ uri: image }}
              alignSelf={'center'}
              alignItems={'center'}>
            </Box>
          </Box>,
        )}
        {t(
          (imageText || isAvatar) && !image,
          <Box style={styles?.imageContainer}>
            <Box
              justifyContent={'center'}
              style={[style.image, styles?.image]}
              alignSelf={'center'}
              alignItems={'center'}>
              {t(isAvatar,<Box mr={2}>{Icon(cameraIcon, 'pm')({ width: 29, height: 29, left: 5 })}</Box>)}
              {t(imageText, <Text style={[style?.imageTextStyle, styles?.imageTextStyle]}>
                {imageTextInitials ? getInitials(imageText) : imageText}
              </Text>)}
            </Box>
          </Box>
        )}
      </Box>
    </Box >
  );
};

export default Avatar;
