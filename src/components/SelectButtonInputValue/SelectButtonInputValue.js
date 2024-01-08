import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon } from '@ui-kitten/components';
import Box from 'components/Box.js';
import Text from 'components/Text/index.js';
import { t } from 'helpers/react.js';
import { colors } from 'styles/theme.js';
import { style } from './styles.js';

const SelectButtonInputValue = ({
  image,
  item,
  label,
  defaultImage = require('img/default.png'),
  index,
  text,
  subtext,
  styles,
  imageRenderType = FastImage,
  onPress,
  children,
  icon,
  title,
  imageProps,
  placeholderText,
  iconPack = 'pm',
  hideImage = false,
  ...props
}) => {
  return (
    <Box
      as={onPress && TouchableOpacity}
      onPress={onPress}
      flexDirection="row"
      flexWrap="wrap"
      paddingBottom="5%"
      alignItems="center"
      style={styles?.container}>
      <Box
        height={'100%'}
        flexDirection="row"
        alignItems={'center'}
        width="88%">
        {t(
          !hideImage,
          <Box style={styles?.imageContainer}>
            <Box
              justifyContent={'center'}
              as={image && !icon && imageRenderType}
              style={[
                label === 'Tenant' ? style.tenantImage : style.image,
                !image && !icon && style.placeholder,
                styles?.image,
              ]}
              source={{ uri: image }}
              alignSelf={'center'}
              alignItems={'center'}
              uri={image}
              {...imageProps}>
              {defaultImage && !icon && !image && !placeholderText && (
                <Image
                  source={defaultImage}
                  style={[
                    style.image,
                    image && icon && style.placeholder,
                    styles?.image,
                  ]}
                />
              )}
              {t(
                icon,
                <Box
                  style={{
                    backgroundColor: colors['gray scale/5'],
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}>
                  <Icon width={22} height={26} pack={'pm'} name={icon} />
                </Box>,
              )}
              {placeholderText &&
                !image &&
                t(
                  placeholderText,
                  <Text style={[styles?.placeholderTextStyle]}>
                    {placeholderText}
                  </Text>,
                )}
            </Box>
          </Box>,
        )}
        {t(
          text || subtext,
          <Box flex={1} style={[style.textBox]}>
            <Text
              style={[
                props.isUppercase ? style.textUppercase : style.text,
                styles?.text,
              ]}
              numberOfLines={1}
              maxLength={8}
              maxWidth={'90%'}>
              {text}
            </Text>
            {title && <Text style={style.titleStyles}>{title}</Text>}
            {t(
              subtext,
              <Text style={[style.text, style.subtext, styles?.subtext]}>
                {subtext}
              </Text>,
            )}
          </Box>,
        )}
      </Box>
      {t(
        props?.removeItem && item && index !== null,
        <Box
          as={TouchableOpacity}
          marginRight={10}
          onPress={() => props?.removeItem(item, index)}>
          <Icon width={20} height={20} pack={'pm'} name={'carbon-trash-can'} />
        </Box>,
      )}
      {children}
    </Box>
  );
};

export default SelectButtonInputValue;
